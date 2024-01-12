'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
    </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)}</p>
//     <p class="country__row"><span>🗣️</span>${
//       Object.values(data.languages)[0]
//     }</p>
//     <p class="country__row"><span>💰</span>${
//       Object.values(data.currencies)[0].name
//     }</p>
//     </div>
//     </article>
//     `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

// const getCountryAndNeighbor = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbor country (2)
//     const [neighbor] = data.borders;
//     if (!neighbor) return;
//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbor('portugal');
// getCountryAndNeighbor('usa');

// Callback hell
// setTimeout(() => {
//   console.log('step 1');
//   setTimeout(() => {
//     console.log('step 2');
//     setTimeout(() => {
//       console.log('step 3');
//     }, 3000);
//   }, 2000);
// }, 1000);

// Fetch API
// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         // If manually throw, the promise will be immediately rejected
//         // the error will propogate down to the catch block
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];
//       if (!neighbor) return;

//       // Country 2
//       // Always return the new promise and handle it outside
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(`${err}`);
//       renderError(`Somthing went wrong ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) {
        throw new Error('No neighbor found');
      }

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err =>
      renderError(`Something went wrong 🔥 🔥 ${err.message}. Try again!`)
    );
  // .finally(() => (countriesContainer.style.opacity = 1));
};

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

///////////////////////////////////////////////
// Coding Challenge #1
/*
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude (lng)
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
*/

// const whereAmI = function (latitude, longitude) {
//   return fetch(
//     `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=391687800145184844363x34337`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Problem with geocoding ${response.statusText}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       const { city, country } = data;
//       console.log(`You are in ${city}, ${country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${country}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Errow(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.log(`${err.message}. Try Again!`));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
//   .then(country => {
//     getCountryData(country);
//   })
//   .catch(err => console.log(err.message));

// Event loop
// console.log('Test start');
// setTimeout(() => console.log('0 sec time'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved Promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

// Building a Simple Promose

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lotter draw is happening 🔮');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

// promisify, convert callbacks to promises
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject('abc').catch(x => console.error(x));

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude, longitude } = pos.coords;

//       return fetch(
//         `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=391687800145184844363x34337`
//       );
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Problem with geocoding ${response.statusText}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       const { city, country } = data;
//       console.log(`You are in ${city}, ${country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${country}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.log(`${err.message}. Try Again!`));
// };

// btn.addEventListener('click', whereAmI);

//////////////////////////////////////////
// Coding Challenge #2
// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise((resolve, reject) => {
//     const imgEl = document.createElement('img');
//     imgEl.src = imgPath;
//     imgEl.addEventListener('load', () => {
//       imgContainer.append(imgEl);
//       resolve(imgEl);
//     });
//     imgEl.addEventListener('error', () => {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// Async/Await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  //   fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
  //     console.log(res)
  //   );
  try {
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=391687800145184844363x34337`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (error) {
    console.log(error.message);

    // Reject promise returned from async function
    throw error;
  }
};

// console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.log(err.message))
//   .finally(() => console.log('3: Finished getting location'));

// Using IIFE for async await
// (async function () {
//   console.log('1: Will get location');
//   try {
//     const location = await whereAmI();
//     console.log(`2: ${location}`);
//   } catch (error) {
//     console.log(error.message);
//   }
//   console.log('3: Finished getting location');
// })();

// Promises in parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (error) {
    console.error(error);
  }
};

// get3Countries('portugal', 'canada', 'tanzania');

// Promise.race, returns as soon as one promise is settled (resolve or reject)
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, seconds * 1000);
  });
};

// Promise.race([
//   getJSON('https://restcountries.com/v3.1/name/tanzania'),
//   timeout(0.01),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.log(err));

// Promise.allSettled, never short circuit
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Success'),
// ]).then(res => console.log(res));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// Promise.any [ES2021], returns the first fullfilled promise, ignore rejected promise
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

//////////////////////////////////////////
// Coding Challenge #3
const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const imgEl = document.createElement('img');
    imgEl.src = imgPath;
    imgEl.addEventListener('load', () => {
      imgContainer.append(imgEl);
      resolve(imgEl);
    });
    imgEl.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = await Promise.all(
      imgArr.map(async imgPath => await createImage(imgPath))
    );
    imgs.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    console.error(error);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
