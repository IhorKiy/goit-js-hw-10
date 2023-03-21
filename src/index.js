import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const ref = {
  input: document.querySelector('#search-box'),
  nameCountry: document.querySelector('.country-list'),
  infoCountry: document.querySelector('.country-info'),
};

ref.input.addEventListener(
  'input', debounce(render, DEBOUNCE_DELAY)
);

function render(input) {
  const inpt = input.target.value.trim();

  if (inpt === '') {
    ref.nameCountry.innerHTML = '';
    ref.infoCountry.innerHTML = '';
    return;
  }
  fetchCountries(inpt).then(countries => {
    if (countries &&countries.length > 1) {
      let markup = '';
      markup = countries.map(
        ({ name: { official }, flags: { svg } }) =>
          `<li > <img width ="50" height = "30" src='${svg}' alt='${official}'><p class="name">${official}</p></li>`
      );
      ref.nameCountry.innerHTML = markup;
      ref.infoCountry.innerHTML = '';
    } else {
      let markup1 = '';
      const { name, flags, capital, population, languages } = countries[0];
      const languagesArray = Object.values(languages).join(', ');

      markup1 = `<img width ="80" height = "50" src='${flags.svg}' alt='${name.official}'><p>${name.official}</p><p>${capital}</p><p>${population}</p><p>${languagesArray}</p>`;
      ref.nameCountry.innerHTML = '';
      ref.infoCountry.innerHTML = markup1;
    }
  }).catch(error => {
    console.log(error)
  })
} 
