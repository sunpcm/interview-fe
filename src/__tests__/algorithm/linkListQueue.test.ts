import { LinkListQueue } from '@/algorithm/linkListQueue.ts';

describe('Queue based on Linked List', () => {
  let q: LinkListQueue;

  // 在每个测试用例运行前，都创建一个新的、干净的 Queue 实例
  beforeEach(() => {
    q = new LinkListQueue();
  });

  it('should create an empty queue initially', () => {
    // 验证初始长度是否为 0
    expect(q.length).toBe(0);
    // 验证对空队列执行出队操作是否返回 null
    expect(q.dequeue()).toBeNull();
  });

  it('should enqueue elements correctly and update the length', () => {
    q.enqueue(10);
    expect(q.length).toBe(1);

    q.enqueue(20);
    expect(q.length).toBe(2);
  });

  it('should dequeue elements in First-In-First-Out (FIFO) order', () => {
    q.enqueue(100);
    q.enqueue(200);
    q.enqueue(300);

    expect(q.length).toBe(3);

    // 第一个入队的元素应该第一个出队
    expect(q.dequeue()).toBe(100);
    expect(q.length).toBe(2);

    expect(q.dequeue()).toBe(200);
    expect(q.length).toBe(1);

    expect(q.dequeue()).toBe(300);
    expect(q.length).toBe(0);
  });

  it('should return null when dequeuing from an already empty queue', () => {
    // 初始就是空队列
    expect(q.dequeue()).toBeNull();
    // 长度不应变为负数
    expect(q.length).toBe(0);
  });

  it('should handle enqueuing new elements after the queue has been emptied', () => {
    // 这个测试用例专门验证我们之前讨论的 tail 指针重置的 bug 是否已修复
    q.enqueue(10);
    q.enqueue(20);

    // 清空队列
    q.dequeue(); // 10 出队
    q.dequeue(); // 20 出队

    // 此时队列应该完全为空
    expect(q.length).toBe(0);
    expect(q.dequeue()).toBeNull();

    // 在空队列的基础上，重新入队
    q.enqueue(30);

    expect(q.length).toBe(1);

    q.enqueue(40);
    expect(q.length).toBe(2);

    // 验证出队顺序是否依然正确
    expect(q.dequeue()).toBe(30);
    expect(q.dequeue()).toBe(40);
    expect(q.length).toBe(0);
  });

  it('should maintain correctness under a large number of operations', () => {
    const count = 10000;
    for (let i = 0; i < count; i++) {
      q.enqueue(i);
    }

    expect(q.length).toBe(count);

    // 验证前几个出队的元素
    expect(q.dequeue()).toBe(0);
    expect(q.dequeue()).toBe(1);

    // 消耗掉剩下的元素
    for (let i = 2; i < count; i++) {
      q.dequeue();
    }

    expect(q.length).toBe(0);
    expect(q.dequeue()).toBeNull();
  });
});
