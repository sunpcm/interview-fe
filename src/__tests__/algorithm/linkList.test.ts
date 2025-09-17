// a.test.ts
import { createLinkList, revertLinkList } from '@/algorithm/linkList.ts';

describe('Linked List Utils', () => {
  describe('createLinkList', () => {
    it('should create a linked list from a normal array', () => {
      const arr = [1, 2, 3];
      const list = createLinkList(arr);

      expect(list?.value).toBe(1);
      expect(list?.next?.value).toBe(2);
      expect(list?.next?.next?.value).toBe(3);
      expect(list?.next?.next?.next).toBeNull();
    });

    it('should create a single-node list for a single-element array', () => {
      const arr = [42];
      const list = createLinkList(arr);

      expect(list?.value).toBe(42);
      expect(list?.next).toBeNull();
    });

    it('should return null for an empty array', () => {
      const arr: number[] = [];
      const list = createLinkList(arr);

      expect(list).toBeNull();
    });
  });

  describe('revertLinkList', () => {
    it('should correctly revert a multi-node linked list', () => {
      const list = createLinkList([1, 2, 3]);
      const revertedList = revertLinkList(list!);

      expect(revertedList?.value).toBe(3);
      expect(revertedList?.next?.value).toBe(2);
      expect(revertedList?.next?.next?.value).toBe(1);
      expect(revertedList?.next?.next?.next).toBeNull();
    });

    it('should return the same node when reverting a single-node list', () => {
      const list = createLinkList([100]);
      const revertedList = revertLinkList(list!);

      expect(revertedList?.value).toBe(100);
      expect(revertedList?.next).toBeNull();
    });

    it('should return null when reverting a null list', () => {
      const revertedList = revertLinkList(null);
      expect(revertedList).toBeNull();
    });
  });
});
