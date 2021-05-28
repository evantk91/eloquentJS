// write a function that takes two values and returns true only if they are the same value
// or are objects with the dame properties, where the values of the properties are equal

const deepEqual = function(a, b) {

   //if values strictly equal 
   if(a === b) return true;

   //if values are not objects or null
   if(a == null || typeof a != "object" || b == null || typeof b != "object") return false;

   let keysA = Object.keys(a);
   let keysB = Object.keys(b);
   
   //if objects dont have the same number keys
   if(keysA.length != keysB.length) return false;

   for(let key of keysA) {
      //if key is not a key in B or the values are not deep equal 
      if(!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;    
   }

   return true;
}

console.log(deepEqual(1, 2));