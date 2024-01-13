// Importing module
// import { addToCart, totalPrice as price, qt } from './shoppingCard.js';

// addToCart('bread', 5);
// console.log(price, qt);

console.log('Importing module');
// Create a name space
// import * as ShoppingCart from './shoppingCard.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// AVOID!
// import add, { totalPrice as price, qt } from './shoppingCard.js';
// add('pizza', 2);

import add, { cart } from './shoppingCard.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);
console.log(cart);

// Top-level await, only works in modules
// Disadvantage, it blocks the whole script now
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('something');

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);
//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = await getLastPost();
// console.log(lastPost);

// Moduel pattern, using IIFE
// Closure to encapsulate private data, only return public
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('pizza', 2);
// console.log(ShoppingCart2);

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
console.log(stateClone);
state.user.loggedIn = false;
console.log(state);

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log(cart.find(el => el.quantity >= 1));

Promise.resolve('TEXT').then(msg => console.log(msg));

// import 'core-js/stable';
import 'core-js/stable/array/find';

// Polifilling async functions
import 'regenerator-runtime';
