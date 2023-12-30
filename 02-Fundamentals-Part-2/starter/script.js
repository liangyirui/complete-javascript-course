// 'use strict';

// // function expression
// const calcAge = function (birthYear) {
//     return 2023 - birthYear;
// }
// const age = calcAge(1991);
// console.log(age);

// // arrow function
// const calcAge2 = birthYear => 2023 - birthYear;
// const age2 = calcAge2(1991);
// console.log(age2);

// // high order functions
// const cutPieces = function (fruit) {
//     return fruit * 4;
// }
// const fruitProcessor = function (apples, oranges) {
//     const applePieces = cutPieces(apples);
//     const orangePieces = cutPieces(oranges);

//     const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
//     return juice;
// }

// console.log(fruitProcessor(2, 3));

// // Arrays
// const arr = ['Michael', 'Steven', 'Peter'];
// console.log(arr);

// const calcAge = function (year) {
//     return 2037 - year;
// }
// // add elements
// const years = [1990, 1967, 2002, 2010, 2018];
// years.push(2023);
// years.unshift(1987);
// console.log(years);

// // remove elements
// years.pop();
// years.shift();

// // indexOf, returns -1 if not in the array
// console.log(years.indexOf(2024));

// // ES6 methods
// console.log(years.includes(2002));

// objects
const myInfo = {
    firstName: 'Yirui',
    lastName: 'Liang',
    birthYear: 1987,
    job: 'engineer',
    friends: ['Micheal', 'Peter', 'Steven'],
    hasDriverLicense: true,
    calcAge: function () {
        this.age = 2037 - this.birthYear;
        return this.age;
    },
    getSummary: function () {
        this.summary = `${this.firstName} is a ${this.calcAge()}-year-old ${this.job}`;
        return this.summary;
    }
}
console.log(myInfo.calcAge());
console.log(myInfo.getSummary());
types = []
types[0] = 'number';
types[2] = 'string';
console.log(types);