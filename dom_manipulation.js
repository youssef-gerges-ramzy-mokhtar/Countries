"use strict"

const countriesContainer = document.querySelector('.countries')

// Just takes the data and uses this data to place it in the HTML page
export function render_country(data) {
   const countryCardHtml = `
   <article class="country">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
         <h3 class="country__name">${data.name.common ? data.name.common : data.name}</h3>
         <h4 class="country__region">${data.region}</h4>
         <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} Million people</p>
         <p class="country__row"><span>🗣️</span>${Object.entries(data.languages)[0][1]}</p>
         <p class="country__row"><span>💰</span>${Object.entries(data.currencies)[0][1].name}</p>
      </div>
   </article>`

   countriesContainer.innerHTML = ""
   countriesContainer.insertAdjacentHTML("beforeend", countryCardHtml)
   countriesContainer.style.opacity = 1
}

export function render_error(msg) {
   countriesContainer.innerHTML = ""
   countriesContainer.insertAdjacentText("beforeend", msg)
   countriesContainer.style.opacity = 1
}