import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = '?fields=name,flags,capital,population,languages';

export async function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}${searchParams}`)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        return;
      } else return response.json();
    })

    .then(response => {
        if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }
      return response;
    });
  // .catch(error => {
  //   console.log(error);
  // });
}
