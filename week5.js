// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let weatherButton = document.querySelector(`.get-weather`)
    // When the "get weather" button is clicked:
    weatherButton.addEventListener (`click`, async function (event){
    
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
      let locationElement = document.querySelector(`#location`)
  
      // - Get a reference to the element containing the user-entered number of days
      let daysElement=document.querySelector(`#days`)
      
      // - Get the user-entered location from the element's value
      let location = locationElement.value
  
      // - Get the user-entered location from the element's value
      let days = daysElement.value
  
  
      // - Check to see if the user entered anything; if so:
      if (location.length >0 & days>0) {    
  
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=2633bc922dd24a03b33162739210305&q=${location}&days=${days}`
  
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        // - Write the json-formatted data to the JavaScript console
        console.log(json)
  
        // - Store the interpreted location, current weather conditions, the forecast as three separate variables
        let locationResult = json.location
        let currentWeather = json.current
        let forecastWeather = json.forecast.forecastday
  
        // - Continue the recipe yourself!
        let current = document.querySelector(`.current`)
        current.innerHTML = `
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${locationResult.name}, ${locationResult.region}</div>
          <div class="font-bold">
            <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="inline-block">
            <span class="temperature">${currentWeather.temp_f}</span>° 
            and
            <span class="conditions">${currentWeather.condition.text}</span>
          </div>
        </div>
        `
        let forecast=document.querySelector('.forecast')
          forecast.insertAdjacentHTML(`beforeend`,  ` <div class="text-center space-y-8">
            <div class="font-bold text-3xl">${days} Day Forecast</div>`)
        for (let i = 0; i < days; i++) { 
          let forecast=document.querySelector('.forecast')
          forecast.insertAdjacentHTML(`beforeend`,  ` 
            <div class="text-center">
              <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="mx-auto">
              <h1 class="text-2xl text-bold text-gray-500">${forecastWeather[i].date}</h1>
              <h2 class="text-xl">High ${forecastWeather[i].day.maxtemp_f} – Low ${forecastWeather[i].day.mintemp_f}</h2>
              <p class="text-gray-500">${forecastWeather[i].day.condition.text}</h1>
            </div>`)
          }

        
      }
    })
  
  })