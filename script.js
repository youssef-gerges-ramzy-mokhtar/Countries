"use strict"
import { userLocation, getCountryData } from "./countries.js"
import { render_country, render_error } from "./dom_manipulation.js"

// HTML Elements //
const whereAmIBtn = document.querySelector('#where-am-i')
const findCountryBtn = document.querySelector("#find-country")
const userInput = document.querySelector("#country-search")


// whereAmI() displays useful info about the country that the user is currently in
async function whereAmI() {
   const location = await userLocation()
   if (location.error) {
      render_error("Something Went Wrong! Please Try again or reload the Page 😞")
      return
   }
   
   const country_data = await getCountryData(location.data.Country)
   render_country(country_data.data)
}


// findCountry() uses the getCountryData() function to display useful info about the country that the user is searching for
async function findCountry() {
   if (userInput.value == "") {
      render_error("Please input a country name")
      return;
   }
   
   const country_data = await getCountryData(userInput.value)
   userInput.value = ""

   if (!country_data.error) render_country(country_data.data)
   else render_error("Invalid Country Name! Give it another shoot 😊")
}


// Event Listeners //
whereAmIBtn.addEventListener("click", whereAmI)
findCountryBtn.addEventListener("click", findCountry)