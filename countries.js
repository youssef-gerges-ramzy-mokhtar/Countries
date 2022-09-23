"use strict"

// Promisifying the GeoLocation API
function getPosition() {
   return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(position => {
         resolve(position)
      }, err => {
         reject(err)
      })
   })
}


// Here we will use the coordinates of the user, and reverse geocode the coordinates
async function reverseGeoCoding(lat, lng) {
   const options = {
      method: 'GET',
      headers: {
         'X-RapidAPI-Key': '0a9a71a8demsheb2c61d3db12355p1ef81fjsn692789a24803',
         'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
      }
   }

   const resGeo = await fetch(`https://geocodeapi.p.rapidapi.com/GetTimezone?latitude=${lat}&longitude=${lng}`, options)
   const dataGeo = await resGeo.json()

   return dataGeo
}


// Here we get the coordinates of the user, and then use this coordinates to obtain the country using the reverseGeoCoding() function
export async function userLocation() {
   const location = {
      data: null,
      error: true
   }

   try {
      const pos = await getPosition()
      const { latitude: lat, longitude: lng } = pos.coords
   
      // Getting the Country by reverse GeoCoding here we will use the latitude and longitude of the user location to obtain the current country representing this location
      const dataGeo = await reverseGeoCoding(lat, lng)
   
      location.data = dataGeo
      location.error = false
      return location
   } catch(err) {
      return location
   }
}


export async function getCountryData(country) {
   const countryData = {
      data: null,
      error: true
   }

   try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
      if (!res.ok) {
         throw new Error("Invalid Country")
      }

      const data = await res.json()
      countryData.data = data[0]
      countryData.error = false
      return countryData
   } catch(err) {
      return countryData
   }
}
