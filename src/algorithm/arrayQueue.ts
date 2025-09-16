export class ArrayQueue {
  private inArray: number[] = [];
  private outArray: number[] = [];

  enQueue(n: number) {
    this.inArray.push(n);
  }
  deQueue() {
    const res = null;
    if (this.outArray.length === 0) {
      this.outArray = this.inArray.reverse();
      this.inArray = [];
      const res = this.outArray.pop() || null;
      return res;
    }
    return res;
  }
  get length() {
    return this.inArray.length + this.outArray.length;
  }
}
