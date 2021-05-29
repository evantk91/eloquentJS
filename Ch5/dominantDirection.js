// function that computes the dominant writing direction in a string of text
// each script has a direction property
// dominant direction is the direction of a majority of the characters that have a script associated with them

const SCRIPTS = require("./05_project_files/code/scripts.js");
const { countBy, characterScript } = require("./05_project_files/code/chapter/05_higher_order.js");

function dominantDirection(text) {
   let counted = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
   }).filter(({name}) => name != "none")

   if(counted.length == 0) return "ltr";
    
   return counted.reduce((a, b) => a.count < b.count ? b : a).name
}

console.log(dominantDirection("Hey, مساء الخير"));