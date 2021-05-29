// function takes an array and a predicate function
// returns true when the given function returns true for every element in the array

const every = function(array, test) {
   for(let element of array) {
      if(!test(element)) return false;    
   }
   return true;   
    
// for(let i = 0; i < array.length; i++) {
//    if(!test(array[i])) {
//       return false;    
//    }
// }       
// return true;
}

console.log(every([], n => n < 10));