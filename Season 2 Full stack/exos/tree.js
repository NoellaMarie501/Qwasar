function isUnivalTree(root) {
    if (!root) {
      return true;
    }
    if (root.left && root.left.val !== root.val) {
      return false;
    }
    if (root.right && root.right.val !== root.val) {
      return false;
    }
    return !isUnivalTree(root.left) && isUnivalTree(root.right);
  }
  
  const arr = [1, 1, 1, 1, 1, null, 1];

  console.log(isUnivalTree(arr)); // Output: false
  