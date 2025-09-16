import { ArrayQueue } from '@/algorithm/arrayQueue.ts';

describe('数组实现队列', () => {
  it('正常情况', () => {
    const queue = new ArrayQueue();
    queue.enQueue(1);
    queue.enQueue(2);
    queue.enQueue(3);
    const res = queue.deQueue();
    expect(res).toBe(1);
    queue.enQueue(4);
    expect(queue.length).toBe(3);
  });
  it('多次出队', () => {
    const queue = new ArrayQueue();
    queue.enQueue(1);
    const res1 = queue.deQueue();
    expect(res1).toBe(1);
    const res = queue.deQueue();
    expect(res).toBe(null);
  });
});
