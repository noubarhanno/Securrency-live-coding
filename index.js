// Write a function movieSelector that accepts an array of objects containing
// movie information (id, title, and score). Chain together invocations of map,
// filter AND reduce to return an array containing only movies with a score greater than
// The titles should be all uppercase strings.

const movieSelector = (moviesArr) => {
  // Code goes here
  return movies.filter((movie) => movie.score > 5).map((movie) => movie.title);
};

const movies = [
  { id: 1, title: "Pan's Labyrinth", score: 9 },
  { id: 37, title: "Manos: The Hands of Fate", score: 2 },
  { title: "Air Bud", score: 5 },
  { title: "Hackers", score: 7 },
];

// /*** Uncomment these to check your work! ***/
console.log(movieSelector(movies)); // should log [ "PAN'S LABYRINTH", "HACKERS" ]

// Closure

// Write a function delay that accepts a callback as the first parameter and the wait
// in milliseconds before allowing the callback to be invoked as the second parameter.
// Any additional arguments after wait are provided to func when it is invoked.
function delay(func, wait, ...args) {
  // Code goes here
  setTimeout(() => func(...args), wait);
}

// /*** Uncomment these to check your work! ***/
delay(
  (bleh) => {
    console.log("hello " + bleh);
  },
  1000,
  "haha"
);

/*** Expected output with delay ***/
//hello haha

// Currying
const curriedThreeNums = (num1) => {
  // Code goes here
  return (num2, num3) => {
    return (num4) => {
      return num3 * num2 + (num4 - num1);
    };
  };
};

// /*** Uncomment these to check your work! ***/
console.log(curriedThreeNums(3)(2, -1)(2)); // should log -3
console.log(curriedThreeNums(3)(2, 1)(2)); // should log 3
console.log(curriedThreeNums(3)(9, -2)(3)); // should log -18

// Generators
//   Write a function that will console.log "Blockchain",
//   every three seconds depending on if the word passed into the function is 'Securrency'.
//   Do not use any type of loop constructor and only make the call to createConversation once.
function* createConversation(string) {
  // added limit
  var index = 0;
  setTimeout(() => {
    while (string === "Securrency" && index < 10) {
      index++;
      console.log("Blockchain");
    }
  }, 3000);
  yield "Blockchain";
}

// /*** Uncomment these to check your work! ***/
console.log(createConversation("Securrency").next());

/*** Expected output ***/
// { value: 'Blockchain', done: false }
// Blockchain
// Blockchain
// Blockchain
// Blockchain

// Promises
// We have a API that gets data from a database, it takes an index parameter and
// returns a promise, your challenge is to use Promise.all
// to make 3 API calls and return all the data when the calls are complete

const fakePeople = [
  { name: "Alice", hasPets: false, id: 125 },
  { name: "Bob", hasPets: true, id: 76 },
  { name: "Jane", hasPets: true, id: 99 },
];

const fakeAPICall = (i) => {
  const returnTime = Math.floor(Math.random() * 1000);
  return new Promise((resolve, reject) => {
    if (i >= 0 && i < fakePeople.length) {
      setTimeout(() => resolve(fakePeople[i]), returnTime);
    } else {
      reject({ message: "index out of range" });
    }
  });
};

function getAllData() {
  var PromiseArr = []; //array of promises
  for (let element = 0; element < fakePeople.length; element++) {
    PromiseArr.push(fakeAPICall(element));
  }
  // Code goes here
  return Promise.all(PromiseArr.map((value) => value.then((res) => res.id)));
}

// /*** Uncomment these to check your work! ***/
getAllData().then((values) => console.log(values));

/*** Expected output ***/
// ID: 125
// ID: 76
// ID: 99

// Callbacks and Higher Order Functions

// Create a function makeHistory that accepts a number (which will serve as a limit),
// and returns a function (that will accept a string). The returned function will
// save a history of the most recent "limit" number of strings passed into
// the returned function (one per invocation only).
// Every time a string is passed into the function, the function should return
// that same string with the word 'done' after it (separated by a space). However,
// if the string 'undo' is passed into the function, then the function should delete
// the last action saved in the history, and return that deleted string with the word 'undone'
// after (separated by a space). If 'undo' is passed into the function and the function's history
// is empty, then the function should return the string 'nothing to undo'.

const makeHistory = (limit) => {
  var history = [];
  return function (string) {
    let lastString;
    if (string === "undo") {
      if (history.length === 0) {
        return "nothing to undo";
      }
      lastString = history[0];
      history.shift();
      return lastString + " undone";
    }
    if (history.length >= limit) {
      history.pop();
    }
    history.unshift(string);
    return string + " done";
  };
};

// /*** Uncomment these to check your work! ***/
const myActions = makeHistory(2);
console.log(myActions("jump")); // should log: 'jump done'
console.log(myActions("undo")); // should log: 'jump undone'
console.log(myActions("walk")); // should log: 'walk done'
console.log(myActions("code")); // should log: 'code done'
console.log(myActions("pose")); // should log: 'pose done'
console.log(myActions("undo")); // should log: 'pose undone'
console.log(myActions("undo")); // should log: 'code undone'
console.log(myActions("undo")); // should log: 'nothing to undo'

// Implement your version of Array.prototype methods forEach, map in vanilla JavaScript

// ForEach

Array.prototype.myEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

var forEachArray = ["Abu Dhabi", "Dubai", "Ajman", "Al Ain"];

// /*** Uncomment these to check your work! ***/
forEachArray.myEach(function (word) {
  console.log(word);
});

/*** Expected output ***/
// Abu Dhabi
// Dubai
// Ajman
// Al Ain

// Map

Array.prototype.myMap = function (callback) {
  let newArray = [];
  for (let i = 0; i < this.length; i++) {
    let newMappedItem = callback(this[i], i, this);
    newArray.push(newMappedItem);
  }
  return newArray;
};

var forMapNumbers = [1.6, 2.8, 5.4];

// /*** Uncomment these to check your work! ***/
var squareRoot = forMapNumbers.myMap(function (num) {
  return Math.round(num);
});
console.log(squareRoot); // should log: [2, 3, 5]
