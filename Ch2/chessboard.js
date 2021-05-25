/* Write a program that creates a string that represents an 8 X 8 grid,
   using new line characters to separate lines. At each position of the grid
   there is either a space of a "#" character. The characters should form
   a chessboard.
   
   Passing the string to console.log should show something like this:
   
    # # # #
   # # # #
    # # # #
   # # # #
    # # # #
   # # # #
    # # # #
   # # # #  
*/

const printChessboard = function(size) {
   let str = "";
   for(let i = 0; i < size; i++) {
      if(i % 2 === 0) {
         str += createEvenRow(size);
      } else {
         str += createOddRow(size); 
      }    
   }    
   return str;
}

const createEvenRow = function(size) {
   let str = "";
   for(let i = 0; i < size; i++) {
      (i % 2 === 0) ? str += " " : str += "#"    
   }
   str += "\n";     
   return str;    
}

const createOddRow = function(size) {
   let str = "";
   for(let i = 0; i < size; i++) {
      (i % 2 === 0) ? str += "#" : str += " "    
   }
   str += "\n"; 
   return str;    
 }

console.log(printChessboard(4));