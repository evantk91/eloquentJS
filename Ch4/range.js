const range = function(start, end, step = start < end ? 1 : -1) {
   let result = [];

   if(step > 0) {
      for(let i = start; i <= end; i += step) result.push(i);        
   } else {
      for(let i = start; i >= end; i += step) result.push(i);         
   }

   return result;
}

const sum = function(arr) {
   let total = 0;
   for(let value of arr) {
      total += value;    
   }
   return total;
}

console.log(range(5, 2, -1));