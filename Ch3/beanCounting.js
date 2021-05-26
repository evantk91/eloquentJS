// write a function that takes a stirng and a character
// returns a number indicating how many times the character is counted

const countChar = function(string, char) {
   let count = 0; 
   for(let i = 0; i < string.length; i++) {
      if(string[i] === char) {
         count++;       
      }
   }
   return count;    
}

console.log(countChar("kakkerlak", "k"));