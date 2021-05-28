// write a function that builds up a list structure when given an array as an argument
const arrayToList = function(arr) {

   let tmp = {
      value: arr[arr.length - 1],
      rest: null 
   };

   let list = {}; 

   for(let i = arr.length - 2; i >= 0; i--) {
      list = {
         value: arr[i], 
         rest: tmp
      }
      tmp = list;
   }

   return list;
}

// write a function that produces an array from a list
const listToArray = function(list) {
   let node = list;
   let array = [];
   while(node) {
      array.push(node.value);
      node = node.rest;    
   }
   return array; 
}

// write a helper function which takes an element and a list and 
// creates a new list that adds the element to the front of the input list
const prepend = function(element, list) {
   return newList = {
      value: element,
      rest: list    
   } 
}

// write a helper function which takes a list and a number
// returns the element at the given position in the list or undefined when there is no such element
const nth = function(list, num) {
    let element;
    let count = 0;

    while(list) {
       element = list.value;
       if(element === null) return undefined; 
       if(count === num) {
          return element;    
       }
       list = list.rest;
       count++; 
    }
}

console.log(nth(arrayToList([10, 20, 30]), 3));