class Node {
  constructor(value) {
    this.id = `Tile-${value}`;
    this.value = value;
    this.width = 2 * value;
    this.next = null;
  }
}

class Stack {
  constructor(maxLength) {
    this.top = null;
    this.bottom = null;
    this.maxLength = maxLength;
    this.length = 0;
  }

  // add a new value to tower
  push(value) {
    const newNode = new Node(value);
    if (!this.top) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.length++;
    return this;
  }

  // return top tower value 
  peek() {
    return this.top
  }

  // remove top tower value
  pop() {
    if (this.length > 0) {
      let topNode = this.top;
      this.top = topNode.next;
      this.length--;
      return topNode;
    }
  }
  // returns an array with all the values in a tower
  traverse() {
    let list = [];
    let currentNode = this.top;
    while (currentNode) {
      list.push(currentNode);
      currentNode = currentNode.next;
    }
    return list;
  }
}

export default Stack;