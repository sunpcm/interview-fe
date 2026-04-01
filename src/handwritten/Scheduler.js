export class Scheduler {
  /**
   * @param {number} limit 最大并发数
   * @param {number} maxRetries 最大重试次数
   * @param {number} retryDelay 重试延迟时间（毫秒）
   */
  constructor(limit = 3, maxRetries = 3, retryDelay = 1000) {
    this.limit = limit;
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;

    this.activeCount = 0;
    this.queue = [];
    this.isPaused = false;
  }

  // 内部核心逻辑
  _runNext() {
    // 检查是否暂停、是否达到并发上限、队列是否为空
    if (
      this.isPaused ||
      this.activeCount >= this.limit ||
      this.queue.length === 0
    ) {
      return;
    }

    this.activeCount++;
    const currentTask = this.queue.shift();
    const { taskFn, resolve, reject, retryCount } = currentTask;

    Promise.resolve()
      .then(() => taskFn())
      .then(res => {
        resolve(res); // 任务成功，兑现 Promise
        this.activeCount--;
        this._runNext(); // 触发下一个
      })
      .catch(err => {
        // 判断是否符合重试条件
        if (retryCount < this.maxRetries && !this.isPaused) {
          console.warn(
            `[任务失败] ${this.retryDelay}ms 后准备第 ${retryCount + 1} 次重试...`
          );
          currentTask.retryCount++;

          // 延迟重试，给服务器喘息时间
          setTimeout(() => {
            this.queue.unshift(currentTask); // 插回队首，优先处理
            this.activeCount--; // 释放当前并发位
            this._runNext(); // 重新启动调度
          }, this.retryDelay);
        } else {
          // 超过重试次数或已暂停，直接拒绝
          reject(err);
          this.activeCount--;
          this._runNext();
        }
      });
  }

  // 添加单个任务
  addTask(taskFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ taskFn, resolve, reject, retryCount: 0 });
      this._runNext();
    });
  }

  // 批量添加任务（核心优化点）
  addBatch(taskFns) {
    // 使用 Promise.allSettled，即使有任务彻底失败，也不会影响其他任务返回结果
    return Promise.allSettled(taskFns.map(fn => this.addTask(fn)));
  }

  // 暂停执行（保留队列中未执行的任务）
  pause() {
    this.isPaused = true;
    console.log('Scheduler paused.');
  }

  // 恢复执行
  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;
    console.log('Scheduler resumed.');
    // 唤醒因并发限制或暂停而等待的任务
    for (let i = 0; i < this.limit - this.activeCount; i++) {
      this._runNext();
    }
  }

  // 彻底取消（清空队列并报错）
  cancelAll() {
    this.isPaused = true;
    const canceledCount = this.queue.length;
    while (this.queue.length > 0) {
      this.queue
        .shift()
        .reject(new Error('Task canceled: Scheduler destroyed.'));
    }
    console.warn(
      `Scheduler canceled. ${canceledCount} pending tasks rejected.`
    );
  }
}
