'use strict';

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', undefined, 1000);

const flight = 'UA857';
const person = {
  name: 'Jonas Smith',
  passport: 1235646,
};
const checkIn = function (flightNum, passenger) {
  // bad practice, should not change input parameters
  flightNum = 'UA777';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 1235646) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};
// checkIn(flight, person);
// console.log(flight, person);
// passing a primitive is the same as copying
// passing an object is passing value (reference value), any change to the object will be reflected
// Javascript does not have pass by reference

const newPassport = function (passenger) {
  passenger.passport = Math.trunc(Math.random() * 1000000);
};

// newPassport(person);
// checkIn(flight, person);
// console.log(person);

// Callback functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(fn(str));
  console.log(`Transformed by: ${fn.name}`);
};

transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

const greet = greeting => name => console.log(`${greeting} ${name}`);
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'John Smith');
lufthansa.book(635, 'Steven Park');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does not work because the this keyword of book function is now undefined
// book(23, 'Sarah Williams');

// Call method
book.call(eurowings, 23, 'Sara Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// Apply method, second argument needs to be an
// Apply method is not used after ES6 because you can use call with ...
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
book.call(swiss, ...flightData);
console.log(swiss);

// Bind method, does not call the function immediately
// returns a function
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

// Bind can preset certain arguments
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Sheldon Cooper');
bookEW23('Martha Cooper');

// Use bind with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

const addTax2 = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTax2(0.23);
console.log(addVAT2(100));

// Coding challenge 1
const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
  registerNewAnswer() {
    const input = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    typeof input === 'number' &&
      input <= this.answers.length &&
      this.answers[input]++;
    this.displayResults();
    this.displayResults('string');
  },
};
const display = poll.displayResults;
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// const data1 = [5, 2, 3];
// const data2 = [1, 5, 3, 9, 6, 1];
display.call({ answers: [5, 2, 3] }, 'string');

// IIFE
(function () {
  console.log('This will never run again');
})();
(() => console.log('This will also never run again'))();

// Closures
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(passengerCount);
  };
};
const booker = secureBooking();
const booker2 = secureBooking();
booker();
booker();
booker2();
console.dir(booker);

// Closure example 1
// let f;
// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// const h = function () {
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();
// f();
// console.dir(f);
// // Reassigning h function
// h();
// f();
// console.dir(f);

// Closure example 2
const boardPassengers = function (num, wait) {
  const perGroup = num / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${num} passsengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start barding in ${wait} seconds`);
};

const perGroup = 1000;
// function has priority of its closure
boardPassengers(180, 3);

// Coding challenge 2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
