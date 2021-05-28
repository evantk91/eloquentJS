const range = function(start, end, step = 1) {
   let result = [];
   if(step > 0) {
      if(start < end) {
         for(let i = start; i <= end; i += step) {
            result.push(i);       
         }    
         return result; 
      } else {
         return "start is greater than end for a positive step value"     
      }   
   } else {
      if(start > end) {
         for(let i = start; i >= end; i += step) {
           result.push(i);       
         }    
         return result; 
      } else {
         return "start is less than end for a negative step value"     
      }    
   }

}

const sum = function(arr) {
   let result = 0;
   for(let i = 0; i < arr.length; i++) {
      result += arr[i];    
   }
   return result;
}

console.log(range(5, 2, -1));