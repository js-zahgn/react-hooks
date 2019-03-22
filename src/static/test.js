import LinkList from './LinkList';

import DbLinkList from './DbLinkList';
import './Tree'

console.log('after tree~~~~~~~~~~~~~~~~~~~')
const list = new LinkList();
const arr = new Array(10).fill().map((_, index) => ({
  name: 'item->' + index
}));
arr.forEach(e => list.append(e));
list.insert(7, {
  name: 'item->N'
});
console.log(list)
list.print()

const dbList = new DbLinkList();
arr.forEach(e => dbList.append(e));
dbList.insert(8, {
  name: 'item->N888'
});
console.log(dbList)
dbList.print()

function HashTable() {
  var table = [];
  // var loseloseHashCode = function (key) {
  //   const hash = key.split('').reduce((res, cur, index) => {
  //     return res += key.charCodeAt(index);
  //   }, 0);
  //   return hash % 37;
  // }
  var djb2HashCode = function (key) {
    var hash = 5381;
    for (var i = 0; i < key.length; i++) {
      hash = hash * 3 + key.charCodeAt(i);
    }
    return hash % 1013;
  }
  this.put = function (key, value) {
    var position = djb2HashCode(key)
    console.log(position + '->' + key);
    table[position] = value;
  }
  // function ValuePair(key, value) {
  //   this.key = key;
  //   this.value = value;
  //   this.toString = function () {
  //     console.log(`[${key}->${value}]`);
  //   }
  // }
  // 线性探查
  // this.put = function (key, value) {
  //   var pos = loseloseHashCode(key);
  //   if (table[pos] === undefined) {
  //     table[pos] = new ValuePair(key, value);
  //   } else {
  //     var index = ++pos;
  //     while (table[index] !== undefined) {
  //       index++;
  //     }
  //     table[index] = new ValuePair(key, value);
  //   }
  // }
  this.remove = function (key) {
    // table[loseloseHashCode(key)] = undefined;
    delete table[djb2HashCode(key)]
  }
  this.get = function (key) {
    return table[djb2HashCode(key)]
  }
  this.print = function () {
    console.log(table);
  }
}
var tab = new HashTable();
tab.put('老张', '30');
tab.put('老李', '28');
tab.put('bbb', '18');
tab.put('老李', '2213');
// tab.remove('老李');
console.log(tab.get('老李'))
tab.print();