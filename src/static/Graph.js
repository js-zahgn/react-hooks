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