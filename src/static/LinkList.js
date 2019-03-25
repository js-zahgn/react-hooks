class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
let length = new WeakMap();
const head = new WeakMap();
export default class LinkList {
  constructor() {
    length.set(this, 0);
    head.set(this, null);
  }
  append(element) {
    let node = new Node(element),
      current;
    if (this.header() === null) {
      head.set(this, node)
    } else {
      current = this.header();
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.setL(1);
  }

  removeAt(position) {
    let l = this.size();
    if (position > -1 && position < l) {
      let current = this.header(),
        previous,
        index = 0;
      if (position === 0) {
        head.set(this, current.next)
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      this.setL(-1);
      return current.element;
    } else {
      return null;
    }
  }

  insert(position, element) {
    if (position > -1 && position <= this.size()) {
      let node = new Node(element),
        current = this.header(),
        previous,
        index = 0;
      if (position === 0) {
        node.next = current;
        head.set(this, node);
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      this.setL(1);
      return true;
    } else {
      return false;
    }
  }

  remove(element) {
    const index = this.indexOf(element);
    this.removeAt(index);
  }

  indexOf(element) {
    let current = this.header(),
      index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  getItem(index) {
    let current = this.header(),
      _index = 0;
    while (_index++ < index) {
      current = current.next
    }
    return current;
  }

  isEmpty() {
    return this.size() === 0;
  }

  toString() {
    let current = this.header(),
      string = '';
    while (current) {
      string += JSON.stringify(current.element) + (current.next ? ', ' : '');
      current = current.next;
    }
    return string;
  }

  print() {
    console.log(this.toString());
  }

  size() {
    return length.get(this);
  }
  setL(n) {
    let l = this.size();
    l += n;
    length.set(this, l);
  }
  header() {
    return head.get(this);
  }
}
