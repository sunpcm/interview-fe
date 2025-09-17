interface ILinkListNode {
  value: number;
  next?: ILinkListNode | null;
}

export function createLinkList(arr: number[]): ILinkListNode | null {
  const arrLength = arr.length;
  if (arrLength === 0) {
    return null;
  }
  let curNode: ILinkListNode = {
    value: arr[arrLength - 1],
    next: null,
  };

  if (arrLength === 1) return curNode;

  for (let i = arrLength - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode,
    };
  }
  return curNode;
}

export function revertLinkList(
  linkList: ILinkListNode | null
): ILinkListNode | null {
  let preNode: ILinkListNode | null = null;
  let curNode: ILinkListNode | null = linkList;
  let nextTempNode: ILinkListNode | null = null;
  if (curNode === null || curNode.next === null) return linkList;

  while (curNode) {
    nextTempNode = curNode?.next || null;
    curNode.next = preNode;
    preNode = curNode;
    curNode = nextTempNode;
  }
  return preNode;
}
