// write a class that represents a vector in two-dimensional space.
// It takes x and y parameters, which should save to properties of the same name.

class Vec {
   constructor(x, y) {
      this.x = x;
      this.y = y;    
   }

   plus(other) {
      return new Vec(this.x + other.x, this.y + other.y);
   }

   minus(vector) {
      return new Vec(this.x - other.x, this.y - other.y);
   }

   get length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);    
   }
}

const vec1 = new Vec(1, 2);
const vec2 = new Vec(3, 4);
console.log(vec2.length);