const arraySparse = [1, 3, /* empty */, 7];
let numCallbackRuns = 0;

arraySparse.forEach((element) => {
  console.log({ element });
  numCallbackRuns++;
});

console.log({ numCallbackRuns });
console.log(element );

// { element: 1 }
// { element: 3 }
// { element: 7 }
// { numCallbackRuns: 3 }
