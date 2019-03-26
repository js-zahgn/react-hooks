//定义节点
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null
  }
}
//创建二叉搜索树(BST)）
class AVLTree {
  constructor() {
    this.root = null
  }

  getNodeHeight(node) {
    if (node === null) return 0;
    else {
      const leftHeight = this.getNodeHeight(node.left);
      const rightHeight = this.getNodeHeight(node.right);
      // 返回左子树、右子树中最大高度
      return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1
    }
  }

  //自动平衡
  balance(node) {
    if (node === null) {
      return node;
    }

    const _getNodeHeight = (node) => {
      if (node === null) return 0;
      else {
        const leftHeight = _getNodeHeight(node.left);
        const rightHeight = _getNodeHeight(node.right);
        // 返回左子树、右子树中最大高度
        return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1
      }
    };

    // 左单旋
    const _rotateLeft = (avlNode) => {
      let node = avlNode.right; // 保存右子节点  D节点
      avlNode.right = node.left; // node的左子节点链接到avlNode成为其右子节点
      node.left = avlNode; // avlNode链接到node成为其左子节点
      return node;
    }
    // 右单旋
    const _rotateRight = (avlNode) => {
      let node = avlNode.left;
      avlNode.left = node.right;
      node.right = avlNode;
      return node;
    }
    // 左-右双旋 -----------图示例 ./images/rotateLeftRight.png
    const _rotateLeftRight = (avlNode) => {
      avlNode.left = _rotateLeft(avlNode.left); // 对左子节点做左单旋
      return _rotateRight(avlNode); // 右单旋
    }
    // 右-左双旋
    const _rotateRightLeft = (avlNode) => {
      avlNode.right = _rotateRight(avlNode.right);
      return _rotateLeft(avlNode);
    }
    // 左子树高度比右子树高度大1以上
    if (_getNodeHeight(node.left) - _getNodeHeight(node.right) > 1) {
      if (_getNodeHeight(node.left.left) >= _getNodeHeight(node.left.right)) {
        // 左子树的左子树高度大于等于左子树的右子树高度
        // 直接进行右旋转
        node = _rotateRight(node);
      } else {
        node = _rotateLeftRight(node);
      }
    } else if (_getNodeHeight(node.right) - _getNodeHeight(node.left) > 1) {

      if (_getNodeHeight(node.right.right) >= _getNodeHeight(node.right.left)) {
        node = _rotateLeft(node);
      } else {
        node = _rotateRightLeft(node);
      }
    }
    return node;
  }


  //插入节点
  insert(key) {
    const _insertNode = (node, newNode) => {
      if (node === null) {
        node = newNode;
        return node;
      } else if (newNode.key < node.key) {
        // 插入左子树
        if (node.left === null) {
          node.left = newNode;
          return node;
        } else {
          node.left = _insertNode(node.left, newNode);
          // 更新整棵树
          node = this.balance(node);
        }
      } else if (newNode.key > node.key) {
        if (node.right === null) {
          node.right = newNode;
          return node;
        } else {
          node.right = _insertNode(node.right, newNode);
          node = this.balance(node);
        }
      }
      return node;
    };
    const newNode = new Node(key);
    this.root = _insertNode(this.root, newNode);
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
      if (key < node.key) {
        node.left = removeNode(node.left, key);
        node = this.balance(node);
        return node;
      } else if (key > node.key) {
        node.right = removeNode(node.right, key);
        node = this.balance(node);
        return node;
      } else {
        if (node.left === null && node.right === null) return null;
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        if (node.left !== null && node.right !== null) {
          let _node = this.getMin(node.right);
          node.key = _node.key;
          node.right = removeNode(node.right, key);
          node = this.balance(node);
          return node;
        }
      }
    };
    return removeNode(this.root, key)
  }
}
//创建BST
const tree = new AVLTree();
tree.insert(11);
tree.insert(7);
tree.insert(9);
tree.insert(18);
tree.insert(20);
tree.insert(19);
tree.insert(16);
tree.insert(15);
tree.insert(17);
tree.insert(6);
tree.insert(14);
console.group('*******************tree*****************')
console.log(tree);
console.log(tree.getNodeHeight(tree.root))
console.log('root->' + tree.root.key);
//中序遍历BST
console.log(tree.inOrder());
//前序遍历BST
console.log(tree.preOrder());
//后序遍历BST
console.log(tree.postOrder());
//搜索最小值
console.log(tree.getMin());
// 搜索最大值
console.log(tree.getMax());
//查找特定值
console.log(tree.find(6));
console.log(tree.find(20));
//删除节点，返回新的二叉树，不改变原来的二叉树
console.log(tree.remove(11));
const a = tree.remove(11);
console.log(a.root);
console.log(tree);
console.groupEnd('*******************tree*****************')