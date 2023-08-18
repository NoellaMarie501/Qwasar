function my_fibonacci(n) {
    if (n < 0) {
      return -1;
    } else if (n === 0) {
      return 0;
    } else if (n === 1 || n === 2) {
      return 1;
    } else {
      return my_fibonacci(n - 1) + my_fibonacci(n - 2);
    }
  }

  console.log(my_fibonacci(10)); // Output: 5
console.log(my_fibonacci(2)); // Output: 1
console.log(my_fibonacci(3)); // Output: 2
console.log(my_fibonacci(4)); // Output: 3
console.log(my_fibonacci(-1)); // Output: -1