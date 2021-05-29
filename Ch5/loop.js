// write a higher order funtion that takes a value, a test function, an update function and a body function
// each iteration first runs the test function on the current loop value and stops if it returns false
// second, it calls the body function with the current value
// finally, it calls the update function to create a new value and starts from the beginning

const loop = function(start, test, update, body) {
   for(let value = start; test(value); value = update(value)) {
      body(value)
   }
// let value = start
// while(test(value)) {
//    body(value)
//    value = update(value);    
// }
}

loop(3, n => n > 0, n => n - 1, console.log);