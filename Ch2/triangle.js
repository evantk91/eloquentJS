/* write a loop that makes seven calls to console.log to output the following:

   #
   ##
   ###
   ####
   #####
   ######
   ####### 
*/

const printTriangle = function() {
   let string = "#"
   console.log(string);
   while(string.length < 7) {
      string += "#"; 
      console.log(string); 
   }
}

printTriangle();