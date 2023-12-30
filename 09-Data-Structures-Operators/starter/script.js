'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();
for (const flight of flights.split('+')) {
  const [status, from, to, hour] = flight.split(';');
  const output = `${
    status.startsWith('_Delayed') ? '🔴' : ''
  } ${status.replaceAll('_', ' ')} from ${getCode(from)} to ${getCode(
    to
  )} (${hour.replace(':', 'h')})`.padStart(36);
  console.log(output);
}

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },
};

// restaurant.orderDelivery({
//   time: '20:30',
//   address: 'Via del sole, 21',
//   mainIndex: 2,
//   starterIndex: 0,
// });

// restaurant.orderDelivery({
//   address: 'Via del sole, 21',
//   starterIndex: 1,
// });

// // Array destructuring
// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // Switching variables
// [secondary, main] = [main, secondary];
// console.log(main, secondary);
// console.log(restaurant.categories);

// // Receive 2 return values from a function
// const [starter, entree] = restaurant.order(2, 0);
// console.log(starter, entree);

// // Nested destructuring
// const nested = [2, 4, [5, 6]];
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Set default values when unpacking arrays
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

// // Object destructuring {} = obj
// const { name: restaurantName, openingHours, categories } = restaurant;
// console.log(restaurantName, openingHours, categories);

// // Default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// // Need parenthesis
// ({ a, b } = obj);
// console.log(a, b);

// // Nested objects
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// // The spread operator
// const arr = [7, 8, 9];
// const newArr = [1, 2, ...arr];
// console.log(newArr);
// console.log(...newArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // Iterables: arrays, strings, maps, sets, NOT objects
// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);
// console.log(...str);

// // const ingredients = [
// //   prompt("Let's make pasta! Ingredient 1?"),
// //   prompt('Ingredient 2?'),
// //   prompt('Ingredient 3?'),
// // ];
// // console.log(ingredients);
// // restaurant.orderPasta(...ingredients);

// // Objects
// const newRestaurant = { ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// restaurantCopy.starterMenu.push('new item');
// console.log(restaurant);
// console.log(restaurantCopy);

// // REST, on the LEFT side of =
// const [num1, num2, ...others] = [1, 2, 3, 4, 5];
// console.log(num1, num2, others);

// const [firstItem, , thirdItem, ...rest] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(firstItem, thirdItem, rest);

// // Functions
// const add = function (...numbers) {
//   let sum = 0;
//   numbers.forEach(item => {
//     sum += item;
//   });
//   return sum;
// };
// console.log(add(2, 3));
// console.log(add(5, 3, 7, 2));
// console.log(add(8, 2, 5, 3, 2, 1, 4));

// // Use ANY data type, return ANY data type, short-circuiting
// console.log(0 && 'John');
// console.log('Hello' && 23 && null && 'john');

// // Nullish: null and undefined (not 0 or '')
// restaurant.numGuests = 0;
// console.log(restaurant.numGuests ?? 10);

// const rest1 = {
//   name: 'Capri',
//   numGuests: 0,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// console.log(rest1);
// console.log(rest2);

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
// // 1. Create one plyaer array for each team (variables 'players1' and 'players2')
// const [players1, players2] = game.players;

// // 2. First player is goalkeeper, others field players. For team 1, create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with the remaining
// const [gk, ...fieldPlayers] = players1;

// // 3. allPlayers containing all players on both teams
// const [...allPlayers] = [...players1, ...players2];

// // 4. Team 1 used 3 substituted players
// const [...playersFinal] = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(playersFinal);

// // 5. game.odds object
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

// // 6. Write a function ('printGoals') that receives an arbitrary number of players (NOT an array) and prints each of them to the console, along with the number of goals who were scored (number of player names passed in)
// const printGoals = function (...players) {
//   console.log(players);
//   console.log(`${players.length} goals were scored.`);
// };
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

// // 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else or the ternary operator
// team1 < team2 && console.log('Team1 is more likely to win');
// team1 > team2 && console.log('Team2 is more likely to win');

// // For of loop
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const [index, item] of menu.entries()) {
//   console.log(index, item);
// }

// // Optional chaining ?.
// console.log(restaurant.openingHours?.fri?.open);

// const days = ['mon', 'tue', 'wed', 'thr', 'fri', 'sat', 'sun'];
// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day}, we open at ${open}`);
// }

// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// // Arrays
// const users = [];
// console.log(users[0]?.name ?? 'User array empty');

// // loop over object
// for (const key of Object.keys(restaurant)) {
//   console.log(key);
// }

// const values = Object.values(restaurant);
// console.log(values);

// const entries = Object.entries(restaurant);
// console.log(entries);

// 1. Loop of the game.scored array and print each player name to the console, along with the goal number
for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}

// 2. Use a loop to calculate the average odd and log it to the console
let averageOdd = 0;
let count = 0;
for (const odd of Object.values(game.odds)) {
  averageOdd += odd;
  count++;
}
averageOdd /= count;
console.log(averageOdd);

// 3. Print the 3 odds to the console, but in a nice formatted way:
// Odd of victory Bayern Munich: 1.33
for (const [team, odd] of Object.entries(game.odds)) {
  if (team === 'x') {
    console.log(`Odd of draw: ${odd}`);
  } else {
    console.log(`Odd of victory ${game[team]}: ${odd}`);
  }
}

const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

// Set
const orderSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta']);
console.log(orderSet, orderSet.size);
console.log(orderSet.has('Pizza'));
orderSet.delete('Pizza');
console.log(orderSet);

const letters = console.log(new Set('jonasschmedtmann').size);

// Map
const mapExample = new Map();
mapExample.set('name', 'Classico Italiano');
mapExample.set(1, 'Firenze, Italy');
console.log(mapExample.set(2, 'Lisbon, Portugal'));
mapExample
  .set('category', 'organic')
  .set('open', 11)
  .set('close', 23)
  .set(true, 'we are open')
  .set(false, 'we are closed');

const time = 8;
console.log(
  mapExample.get(
    time > mapExample.get('open') && time < mapExample.get('close')
  )
);

mapExample.set([1, 2], 'Test');
console.log(mapExample);

mapExample.set(document.querySelector('h1'), 'Heading');
console.log(mapExample);

const question = new Map([
  // [key, value] pair
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);

console.log(question);

// Convert object to map
const hoursMap = new Map(Object.entries(restaurant.openingHours));
console.log(hoursMap);

// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') {
//     console.log(`Answer ${key}: ${value}`);
//   }
// }
// const answer = Number(prompt('Your answer'));
// console.log(answer);
// console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
console.log(question.entries());
console.log(question.keys());
console.log(question.values());

// Challenge #3
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1. Unique events that happened
let events = [...new Set(gameEvents.values())];
console.log(events);

// 2. Remove event at 64 from the game events log
gameEvents.delete(64);

// 3. Print
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
const duration = [...gameEvents.keys()].pop();
console.log(duration);

// 4. Loop over the events
for (const [time, event] of gameEvents.entries()) {
  const half = time <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${time}: ${event}`);
}

// String
const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane.length);
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(-2));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  return seat.slice(-1) === 'B' || seat.slice(-1) === 'E';
};
console.log(checkMiddleSeat('11B'));
console.log(checkMiddleSeat('23C'));
console.log(checkMiddleSeat('3E'));

// Boxing, box the primitive string to String object so we can use methods
console.log('jonas');
console.log(new String('jonas'));
console.log(typeof new String('jonas'));

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Comparing emails
const loginEmail = '   Hello@JOnas.Io \n';
let correctedEmail = loginEmail.toLowerCase().trim();
console.log(correctedEmail);

// Replacing
const priceGB = '288,97$';
const priceUS = priceGB.replace(',', '.');
console.log(priceGB, priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23.';
console.log(
  announcement,
  announcement.replace('door', 'gate'),
  announcement.replaceAll('door', 'gate')
);

// regex /regex/
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
console.log(plane.includes('A320'));
console.log(plane.startsWith('A3'));
console.log(plane.endsWith('3'));

// Practice
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// Split and Join
console.log('a+very+nice+string'.split('+'));
const [firstName, lastName] = 'Yirui Liang'.split(' ');
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+'));
console.log(message.padEnd(25, '+'));

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(324629577663));

// Repeat
const message2 = 'Bad weather... All Departures Delayed...';
console.log(message2.repeat(2));

// Coding challenge 4
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
document.querySelector('button').addEventListener('click', () => {
  const text = document.querySelector('textarea').value;
  const words = text.trim().split('\n');
  for (const [index, word] of words.entries()) {
    let [first, second] = word.trim().toLowerCase().split('_');
    second = second.replace(second[0], second[0].toUpperCase());
    console.log(
      [first, second].join('').padEnd(20, ' ') + '✅'.repeat(index + 1)
    );
  }
});
