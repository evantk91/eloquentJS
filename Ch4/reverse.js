const reverseArray = function(arr) {
   let result = [];
   for(let i = 0; i < arr.length; i++) {
      result.unshift(arr[i]);    
   }
   return result;
}

const reverseArrayInPlace = function(arr) {
   for(let i = 0; i < Math.floor(arr.length / 2); i++) {
       let tmp = arr[i];
       arr[i] = arr[arr.length - 1 - i];
       arr[arr.length - 1 - i] = tmp;
   } 
}

let array = [5, 4, 3, 2, 1];
reverseArrayInPlace(array);
console.log(array);