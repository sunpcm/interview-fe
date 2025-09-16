import { StackQueue } from '@/algorithm/stackQueue.ts';

describe('栈实现队列', () => {
  it('正常情况', () => {
    const queue = new StackQueue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    const res = queue.dequeue();
    expect(res).toBe(1);
    queue.enqueue(4);
    expect(queue.length).toBe(3);
  });
  it('多次出队', () => {
    const queue = new StackQueue();
    queue.enqueue(1);
    const res1 = queue.dequeue();
    expect(res1).toBe(1);
    const res = queue.dequeue();
    expect(res).toBe(null);
  });
});
