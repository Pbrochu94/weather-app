console.log("Hello");

let values = {
  daysOfWeekArr: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "thursday",
    "friday",
    "Saturday",
    "Sunday",
  ],
  currentDateInDigit: new Date().toLocaleDateString().replaceAll("/", "-"),
  currentDay: new Date().toDateString().split(" ")[0],
  citySearched: "montreal",
};

let selectors = {
  button: document.querySelector("button"),
  searchBar: document.querySelector(".search-bar"),
};

let functions = {
  getCity: function () {
    let name = selectors.searchBar.value;
    values.citySearched = functions.isCityValid(name);
    console.log(values.citySearched);
    domManipulations.weatherDisplay();
  },
  isCityValid: function (cityName) {
    return cityName.toLowerCase();
  },
  get5Days: async function () {
    let request = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${values.citySearched}/2025-05-04/2025-05-08?unitGroup=metric&key=MJEGRF56UJXUSESDCMU4QTNLR`,
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

console.log(new Date().toLocaleDateString());
