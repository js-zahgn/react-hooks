//定义节点
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null
  }
}
//创建二叉搜索树(BST)）
class BinarySearchTree {
  constructor() {
    this.root = null
  }

  getTreeHeight(node) {
    if (node === null) return 0;
    else {
      const leftHeight = this.getTreeHeight(node.left);
      const rightHeight = this.getTreeHeight(node.right);
      // 返回左子树、右子树中最大高度
      return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1
    }
  }

  //自动平衡
  balance(node) {
    if (node === null) {
      return node;
    }
    // 左单旋
    const _rotateLeft = (avlNode) => {
      const node = avlNode.right; // 保存右子节点
      avlNode.right = node.left; // node的左子节点链接到avlNode成为其右子节点
      node.left = avlNode; // avlNode链接到node成为其左子节点
      return node;
    }
    // const _rotateLeftRight = (node)=>  
  }

  //插入节点
  insert(key) {
    const newNode = new Node(key);
    const insertNode = (node, newNode) => {
      if (newNode.key < node.key) {
        if (node.left === null) {
          node.left = newNode
        } else {
          insertNode(node.left, newNode)
        }
      } else {
        if (node.right === null) {
          node.right = newNode
        } else {
          insertNode(node.right, newNode)
        }
      }
    };
    if (!this.root) {
      this.root = newNode
    } else {
      insertNode(this.root, newNode)
    }
  }
  //中序遍历
  inOrder() {
    let backs = [];
    const inOrderNode = (node, callback) => {
      if (node !== null) {
        inOrderNode(node.left, callback);
        backs.push(callback(node.key));
        inOrderNode(node.right, callback)
      }
    };
    inOrderNode(this.root, callback);

    function callback(v) {
      return v
    }
    return backs
  }
  //前序遍历
  preOrder() {
    let backs = [];
    const preOrderNode = (node, callback) => {
      if (node !== null) {
        backs.push(callback(node.key));
        preOrderNode(node.left, callback);
        preOrderNode(node.right, callback)
      }
    };
    preOrderNode(this.root, callback);

    function callback(v) {
      return v
    }
    return backs
  }
  //后序遍历
  postOrder() {
    let backs = [];
    const postOrderNode = (node, callback) => {
      if (node !== null) {
        postOrderNode(node.left, callback);
        postOrderNode(node.right, callback);
        backs.push(callback(node.key))
      }
    };
    postOrderNode(this.root, callback);

    function callback(v) {
      return v
    }
    return backs
  }
  //查找最小值
  getMin(node) {
    const minNode = node => {
      return node ? (node.left ? minNode(node.left) : node) : null
    };
    return minNode(node || this.root)
  }
  //查找最大值
  getMax(node) {
    const minNode = node => {
      return node ? (node.right ? minNode(node.right) : node) : null
    };
    return minNode(node || this.root)
  }
  //查找特定值
  find(key) {
    const findNode = (node, key) => {
      if (node === null) return false;
      if (node.key === key) return node;
      return findNode((key < node.key) ? node.left : node.right, key)
    };
    return findNode(this.root, key)

  }
  //删除节点
  remove(key) {
    const removeNode = (node, key) => {
      if (node === null) return null;
      if (node.key === key) {
        if (node.left === null && node.right === null) return null;
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        if (node.left !== null && node.right !== null) {
          let _node = this.getMin(node.right);
          node.key = _node.key;
          node.right = removeNode(node.right, key);
          return node
        }
      } else if (key < node.key) {
        node.left = removeNode(node.left, key);
        return node
      } else {
        node.right = removeNode(node.right, key);
        return node
      }
    };
    return removeNode(this.root, key)
  }
}
//创建BST
const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
console.log(tree);
console.log(tree.root);
//获取高度
console.log('树的高度->' + tree.getTreeHeight(tree.root));
//中序遍历BST
console.log(tree.inOrder());
//前序遍历BST
console.log(tree.preOrder());
//后序遍历BST
console.log(tree.postOrder());
//搜索最小值
console.log(tree.getMin());
//搜索最大值
console.log(tree.getMax());
//查找特定值
console.log(tree.find(2));
console.log(tree.find(3));
console.log(tree.find(20));
//删除节点，返回新的二叉树，不改变原来的二叉树
console.log(tree.remove(11));
const a = tree.remove(11);
console.log(a.root);
console.log(tree);