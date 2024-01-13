// Exporting module
console.log('Exporting module');

// Blocking the entire module, but also other modules that imports it
// important
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log('Finish fetching users');

// variables are scoped to the module, invisible to other modules unless exported
const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

// named exports
const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as qt };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
