console.log("Hello");

let userValues = {
  citySearched: "montreal",
};

let selectors = {
  button: document.querySelector("button"),
  searchBar: document.querySelector(".search-bar"),
};

let functions = {
  getCity: function () {
    let name = selectors.searchBar.value;
    userValues.citySearched = functions.isCityValid(name);
    console.log(userValues.citySearched);
    domManipulations.weatherDisplay();
  },
  isCityValid: function (cityName) {
    return cityName.toLowerCase();
  },
  get5Days: async function () {
    let request = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userValues.citySearched}/2025-05-03/2025-05-07?unitGroup=metric&key=MJEGRF56UJXUSESDCMU4QTNLR`,
    );
    let jsonRequest = await request.json();
    console.log(jsonRequest);
    return jsonRequest.days;
  },
};

let listeners = {
  button: (function () {
    selectors.button.addEventListener("click", functions.getCity);
  })(),
};

let domManipulations = {
  weatherDisplay: async function () {
    let array = await functions.get5Days();
    console.log(array);
  },
};

domManipulations.weatherDisplay();
