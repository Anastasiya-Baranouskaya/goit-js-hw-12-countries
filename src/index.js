import fetchCountries from './js/fetchCountries';
import countriesCard from './templlates/countriesCard.hbs';
import countriesList from './templlates/countriesList.hbs';

import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('.js-input'),
  countryCardMarkup: document.querySelector('.countries-card'),
  listMarkup: document.querySelector('.countries-list'),
};

refs.input.addEventListener('input', debounce(searchCountry, 500));

function searchCountry() {
  clearInput();

  const searchQuery = refs.input.value.trim();

  fetchCountries(searchQuery)
    .then(country => {
      if (country.length > 10) {
        error({
          text: 'Too many matches! Please, type a more specific query!',
        });
      } else if (country.length === 1) {
        renderCard(country);
      } else if (country.length <= 11) {
        renderList(country);
      }
    })
    .catch(fetchError);
}
function renderCard(country) {
  const markup = countriesCard(country);

  refs.countryCardMarkup.innerHTML = markup;
}
function renderList(country) {
  const listMarkup = countriesList(country);

  refs.listMarkup.insertAdjacentHTML('beforeend', listMarkup);
}

function clearInput() {
  refs.listMarkup.innerHTML = '';
  refs.countryCardMarkup.innerHTML = '';
}
function fetchError(Error) {
  Error;
}
