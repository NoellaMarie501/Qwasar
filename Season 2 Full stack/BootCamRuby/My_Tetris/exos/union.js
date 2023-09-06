function my_union(param_1, param_2) {
    const arr = [...param_1, ...param_2];
   const result = [];
   for (let i = 0; i < arr.length; i++) {
     if (!result.includes(arr[i])) {
       result.push(arr[i]);
     }
   }
   return result.join('');
};
  
const str1 = 'zpadinton';
const str2 = 'paqefwtdjetyiytjneytjoeyjnejeyj';
const result = my_union(str1, str2);
console.log(result); // 'helowrd'
