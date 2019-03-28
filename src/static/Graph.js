class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(ele) {
    this.items.push(ele);
  }
  dequeue() {
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length < 1;
  }
  clear() {
    this.items = [];
  }
  size() {
    return this.items.length;
  }
}

class Graph {
  constructor() {
    this.vertices = [];
    this.adjList = {};
  }
  addVertex(v) {
    this.vertices.push(v);
    this.adjList[v] = [];
  }
  addEdge(v, w) {
    this.adjList[v].push(w);
    this.adjList[w].push(v);
  }

  // 初始化途中各顶点的颜色
  _initColor() {
    const color = [];
    this.vertices.map(e => color[e] = 'white');
    return color;
  }

  // 广度优先搜索，入参v为顶点，从此顶点开始搜索整图
  bfs(v, cb) {
    const color = this._initColor(),
      queue = new Queue();
  }

  print() {
    return this.vertices.reduce((res, cur) => res += `${cur} -> ${this.adjList[cur].join(' ')} \n`, '');
  }
}

const graph = new Graph();

const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

data.map(e => graph.addVertex(e));

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.group('*************Graph*************');
console.log(graph.print());
console.groupEnd('*************Graph*************');