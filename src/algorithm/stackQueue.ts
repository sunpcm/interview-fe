export class StackQueue {
  private inStack: number[] = [];
  private outStack: number[] = [];

  //入队
  enqueue(n: number) {
    this.inStack.push(n);
  }

  // 出队
  dequeue(): number | null {
    let res = null;
    if (this.outStack.length === 0) {
      this.outStack = this.inStack.reverse();
      this.inStack = [];
      res = this.outStack.pop() || null;
    }
    return res;
  }

  //查看队长度
  get length() {
    return this.inStack.length + this.outStack.length;
  }
}
//
// const queue = new StackQueue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.dequeue();
// queue.enqueue(4);
// console.log('[queue]', queue);
