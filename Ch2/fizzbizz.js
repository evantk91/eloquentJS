/* write a program that uses prints all numbers from 1 to 100 with two exceptions
   for numbers divisible by 3, print "Fizz" instead
   for numbers divisible by 5 and not 3, print "Buzz" instead
   for numbers divisible by 3 and 5, print "FizzBuzz" instead  */

const fizzBuzz = function() {
   for(let i = 1; i <= 100; i++) {
       if(i % 3 === 0 && i % 5 !== 0) {
          console.log("Fizz");    
       } else if(i % 3 !== 0 && i % 5 === 0) {
          console.log("Buzz");    
       } else if(i % 3 === 0 && i % 5 === 0) {
          console.log("FizzBuzz");    
       } else {
          console.log(i);    
       }
   }
}

fizzBuzz();