// function "flattens" array of arrays into an array that has all the elements of the original array

const flatten = function(array) {
   return array.reduce((result, element) => {
      return result.concat(element)    
   }, [])
}

console.log(flatten([[1, 2, 3], [4, 5], [6]]));