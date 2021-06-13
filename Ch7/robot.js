//the village of Meadowfield consists of 11 places with 14 road between them
const roads = [
   "Alice's House-Bob's House", "Alice's House-Cabin",
   "Alice's House-Post Office", "Bob's House-Town Hall",
   "Darla's House-Ernie's House", "Darla's House-Town Hall",
   "Ernie's House-Grete's House", "Grete's House-Farm",
   "Grete's House-Shop", "Marketplace-Farm",
   "Marketplace-Post Office", "Marketplace-Shop",
   "Marketplace-Town Hall", "Shop-Town Hall"
];

//buildGraph takes a collection of edges and creates a map object
//that, for each node, stores an array of connected nodes
//it uses the split method to go from the road strings, which have the form "Start-End"
//to two-element arrays containing the start and end as separate strings

function buildGraph(edges) {
   let graph = Object.create(null);
   function addEdge(from, to) {
      // console.log(from);
      // console.log(to);
      if(graph[from] == null) {
         graph[from] = [to];
      } else {
         graph[from].push(to); 
      }   
   }    
   for(let [from, to] of edges.map(r => r.split("-"))) {
      addEdge(from, to);
      addEdge(to, from);    
   }
   return graph;
}

const roadGraph = buildGraph(roads);

// lets condense the village's state down to the minimal set of values that define it
// There is the robot's current location and the collection of undelivered parcels, each of
// which has a current location and a destination address.

class VillageState {
   constructor(place, parcels) {
      this.place = place;
      this.parcels = parcels;
   }

   move(destination) {
      // checks whether there is a road going from the current place to the destination
      if(!roadGraph[this.place].includes(destination)) {
         // if not, returns the old state
         return this;
      } else {
         // for each parcel, 
         // if parcel is not located at robot's current location, leave parcel unchanged
         // otherwise, move parcel to new destination
         let parcels = this.parcels.map(p => {
            if(p.place != this.place) return p;
            return {place: destination, address: p.address};
         // remove delivered parcels       
         }).filter(p => p.place != p.address);
         // creates a new state with the destination as the robot's new place and the parcel list updated
         // original state remains unchanged
         return new VillageState(destination, parcels);
      }  
   }
}

//function creates a new state with a specified number of parcels
VillageState.random = function(parcelCount = 5) {
   let parcels = [];
   for(let i = 0; i  < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
         place = randomPick(Object.keys(roadGraph));   
      } while (place == address);
      parcels.push({place, address})
   }
   return new VillageState("Post Office", parcels);
}

// let first = new VillageState(
//    "Post Office",
//    [
//       {place: "Post Office", address: "Alice's House"},
//       {place: "Alice's House", address: "Marketplace"},
//       {place: "Post Office", address: "Darla's House"}
//    ]
// );
// let next = first.move("Alice's House");

// robot looks at the VillageState and decides which direction it wants to move
// runRobot is passed a state object, a function determining the robot's movement, 
// and a memory object to record the robot's moves  

function runRobot(state, robot, memory) {
   //count turns
   for(let turn = 0; ; turn++) {
      //if all parcels are delivered
      if(state.parcels.length == 0) {
         console.log(`Done in ${turn} turns`);
         break;
      }
      //robot's action is determined by robot function
      let action = robot(state, memory);
      //update state and memory
      state = state.move(action.direction);
      memory = action.memory;
      console.log(`Moved to ${action.direction}`);
   }
}

// the robot could just walk in a random direction for each turn
function randomPick(array) {
   let choice = Math.floor(Math.random() * array.length);
   return array[choice];
}

function randomRobot(state) {
   return {direction: randomPick(roadGraph[state.place])};
}

// An easy improvement is to have the robot find a route that passes through all places in the village
// the robot could then run that route twice, at which point it is guaranteed to be done


function routeRobot(state, memory) {

   const mailRoute = [
      "Alice's House", "Cabin", "Alice's House", "Bob's House",
      "Town Hall", "Daria's House", "Ernie's House",
      "Grete's House", "Shop", "Grete's House", "Farm",
      "Marketplace", "Post Office"   
   ];

   if(memory.length == 0) {
      memory = mailRoute;   
   }
   return {direction: memory[0], memory: memory.slice(1)};   
}

// pathfinding:
// -it has to be able to deliberately move toward a given parcel or toward a location where a parcel has to be delivered
// - typical search problem
// - we can tell whether a given solution is a valid solution, but we can't compute the solution directly
// - we have to keep creating potential solutions until we find one that works
// - we are most interested in the shortest route
//    - a good approach is to "grow" routes from the starting point, exploring every reachable place that hasn't been visited yet, until a route reaches the goal

function findRoute(graph, from, to) {
   // work list is an array of places that should be explored next, along with the path that got us there
   let work = [{at: from, route: []}];
   // search then operates by taking the next item in the list and exploring that
   // which means all roads going from that place are looked at
   for(let i = 0; i < work.length; i++) {
      let {at, route} = work[i];
      for(let place of graph[at]) {
         //If one of them is the goal, a finished route can be returned
         if(place == to) return route.concat(place);
         //if we haven't looked at this place before, a new item is added to the list
         //if we have looked at it before, we've found either a longer route to that place or one precisely as long as the existing
         if(!work.some(w => w.at == place)) {
            work.push({at: place, route: route.concat(place)});
         }
      }   
   }
}

// Our route finding code does not handle the situation where there are no more work items on the work list
// because we know that our graph is connected, meaning that every location can be reached from all other locations

// robot uses its memory value as a list of directions to move in

function goalOrientedRobot({place, parcels}, route) {
   // whenever route list is empty
   if(route.length == 0) {
      // robot takes the first undelivered parcel
      let parcel = parcels[0];
      // if the parcel has not been picked up, plots route to parcel
      // otherwise, plots route to location to be delivered to
      if(parcel.place != place) {
         route = findRoute(roadGraph, place, parcel.place);
      } else {
         route = findRoute(roadGraph, place, parcel.address);
      }
   }
   //returns direction the robot is to move and an updated route in the memory
   return {direction: route[0], memory: route.slice(1)};
}

//runRobot(VillageState.random(), goalOrientedRobot, []);

// function that takes two robots and their shared memory
// It should generate 100 tasks and let each of the robots solve each of these tasks
// When done, it should output the average number of steps each robot took per task

function countSteps(state, robot, memory) {
   for(let steps = 0; ; steps++) {
      if(state.parcels.length == 0) return steps;
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
   }
}

function compareRobots(robot1, memory1, robot2, memory2) {
   let total1 = 0; let total2 = 0;
   for(let i = 0; i < 100; i++) {
      let state = VillageState.random();
      total1 += countSteps(state, robot1, memory1);
      total2 += countSteps(state, robot2, memory2);
   }
   console.log(`Average turns for robot 1: ${total1 / 100}`);
   console.log(`Average turns for robot 2: ${total2 / 100}`);
}

// compareRobots(randomRobot, [], goalOrientedRobot, []);

// Can you write a robot that finishes the delivery task faster than goalOrientedRobot?
// If you observe that robot's behavior, what obviously stupid things does it do? 
// How could those be improved?

function findShortestRoute(place, parcels) {
   let shortestRoute;
   for(let i = 0; i < parcels.length; i++) {
      let parcel = parcels[i];
      if(parcel.place != place) {
         route = findRoute(roadGraph, place, parcel.place);
      } else {
         route = findRoute(roadGraph, place, parcel.address);
      }

      if(i === 0) {
         shortestRoute = route;
      } else {
         if(route.length < shortestRoute) {
            shortestRoute = route;
         }
      }
   }
   return shortestRoute;
}

function yourRobot({place, parcels}, route) {
   // whenever route list is empty
   if(route.length == 0) {
      route = findShortestRoute(place, parcels);
   }

   //returns direction the robot is to move and an updated route in the memory
   return {direction: route[0], memory: route.slice(1)};
}

function lazyRobot({place, parcels}, route) {
   if(route.length == 0) {
      // describe a route for every parcel
      let routes = parcels.map(parcel => {
         //if parcel is not picked up, calculate the route to pick up
         if (parcel.place != place) {
            return {route: findRoute(roadGraph, place, parcel.place),
                    pickUp: true};
         // else calculate the route to drop off           
         } else {
            return {route: findRoute(roadGraph, place, parcel.address),
                    pickUp: false};
         }  
      });

      // this determines the precedence a route gets when choosing.
      // Route length counts negatively, routes that pick up a package
      // get a small bonus.
      function score({route, pickUp}) {
         return (pickUp ? 0.5 : 0) - route.length;
      }
      route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
   }
   return {direction: route[0], memory: route.slice(1)};
}

// runRobot(VillageState.random(), lazyRobot, []);

// write a new class PGroup, similar to the Group class, which stores a set of values.

// Its add method, however, should return a new PGroup instance with the given member added
// and leave the old one unchanged. Similarly, delete creates a new instance without a given member

// The constructor shouldn't be part of the class's interface.
// Instead, there is an empty instance, PGroup.empty, that can be used as a starting value.

class PGroup {
   constructor(members) {
      this.members = members;    
   }

   has(value) {
      return this.members.includes(value);    
   }

   add(value) {
      if(this.has(value)) return this;   
      return new PGroup(this.members.concat([value]));
   }

   delete(value) {
      if(!this.has(value)) return this;  
      return new PGroup(this.members.filter(v => v !== value));
   }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(ab.has("b"));
// // → true
console.log(a.has("b"));
// // → false
console.log(b);
// // → false