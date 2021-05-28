// write a function that builds up a list structure when given an array as an argument
const arrayToList = function(arr) {
   let list = null; 

   for(let i = arr.length - 1; i >= 0; i--) {
      list = {value: arr[i], rest: list};
   }

   return list;
}

// write a function that produces an array from a list
const listToArray = function(list) {
   let array = [];
   for(let node = list; node; node = node.rest) {
      array.push(node.value);  
   }
   return array; 
}

// write a helper function which takes an element and a list and 
// creates a new list that adds the element to the front of the input list
const prepend = function(value, list) {
   return newList = {value, rest: list} 
}

// write a helper function which takes a list and a number
// returns the element at the given position in the list or undefined when there is no such element
const nth = function(list, num) {
   if(!list) return undefined;
   else if(num == 0) return list.value;
   else return nth(list.rest, num - 1); 
}

console.log(nth(arrayToList([10, 20, 30]), 5));