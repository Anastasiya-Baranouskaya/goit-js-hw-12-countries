export default fetchCountries;

function fetchCountries(name) {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;flag;languages`,
  ).then(response => response.json());
  // .then(data => console.log(data))
  // .catch(err => console.log(err));
}
