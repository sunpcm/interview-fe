interface ILinkListNode {
  value: number;
  next?: ILinkListNode | null;
}

export class LinkListQueue {
  private header: ILinkListNode | null = null;
  private tail: ILinkListNode | null = null;
  private len = 0;
  enqueue(n: number) {
    const newNode = {
      value: n,
      next: null,
    };
    if (this.header === null) {
      this.header = newNode;
    }

    const tailNode = this.tail;
    if (tailNode) {
      tailNode.next = newNode;
    }

    this.tail = newNode;

    this.len++;
  }
  dequeue() {
    const headNode = this.header;
    if (headNode) {
      this.header = headNode.next || null;
    } else {
      return null;
    }
    if (this.header === null) {
      this.tail = null;
    }
    this.len--;
    return headNode.value;
  }
  get length() {
    return this.len;
  }
}
