class Node {
  constructor(element) {
    this.element = element;
    this.prev = null;
    this.next = null;
  }
}

const length = new WeakMap();
const head = new WeakMap();
const tail = new WeakMap();

class DbLinkList {
  constructor() {
    length.set(this, 0);
    head.set(this, null);
    tail.set(this, null);
  }
  append(element) {
    let node = new Node(element),
      current;
    if (!head.get(this)) {
      head.set(this, node);
    } else {
      current = head.get(this);
      while (current.next) {
        current = current.next;
      }
      current.next = node;
      node.prev = current;
      tail.set(this, node);
    }
    let l = length.get(this);
    l++;
    length.set(this, l);
  }

  insert(pos, element) {
    let node = new Node(element),
      current = head.get(this),
      previous,
      index = 0;
    if (pos >= 0 && pos <= length.get(this)) {
      if (pos === 0) {
        if (!this.header()) {
          head.set(this, node);
          tail.set(this, node);
        } else {
          node.next = current;
          current.prev = node;
          head.set(this, node);
        }
      } else if (pos === this.size()) {
        current = tail.get(this);
        current.next = node;
        node.prev = current;
        tail.set(this, node);
      } else {
        // if (pos > this.size() / 2) {

        // } else {
          while (index++ < pos) {
            previous = current;
            current = current.next;
          }
        // }
        node.next = current;
        previous.next = node;

        current.prev = node;
        node.prev = previous;
      }
      let l = this.size();
      l++;
      length.set(this, l);
      return true;
    } else {
      return false;
    }
  }

  removeAt(pos) {
    let len = this.size();
    if (pos > -1 && pos < len) {
      let current = this.header(),
        previous,
        index = 0;
      if (pos === 0) {
        head.set(this, current.next);
        if (len === 1) {
          tail.set(this, null);
        } else {
          head.prev = null;
        }
      } else if (pos === len - 1) {
        current = this.tailer();
        tail.set(this, current.prev);
        tail.next = null;
      } else {
        while (index++ < pos) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next.prev = previous;
      }
      len--;
      length.set(this, len);
      return current.element;
    } else {
      return null;
    }
  }

  remove(element) {
    const _index = this.indexOf(element);
    this.removeAt(_index);
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

  size() {
    return length.get(this);
  }
  header() {
    return head.get(this);
  }
  tailer() {
    return tail.get(this);
  }
  toString() {
    let current = head.get(this),
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

}

export default DbLinkList