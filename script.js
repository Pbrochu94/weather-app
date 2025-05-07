console.log("Hello");

let values = {
  daysOfWeekArr: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  currentDateInDigit: new Date().toLocaleDateString().replaceAll("/", "-"),
  daysIndexTracker: undefined,
  currentDay: new Date().toDateString().split(" ")[0],
  citySearched: "montreal",
  imageBank: {
    sunny: {
      background: "img/sunny-background.jpg",
      icon: "img/sunny-card-icon.png",
    },
    cloudy: {
      background: "img/cloudy-background.jpg",
      icon: "img/cloudy-card-icon.png",
    },
    rainy: {
      background: "img/rainy-background.jpg",
      icon: "img/rainy-card-icon.png",
    },
    thunder: {
      background: "img/thunder-background.jpg",
      icon: "img/thunder-card-icon.png",
    },
  },
};

let selectors = {
  button: document.querySelector("button"),
  searchBar: document.querySelector(".search-bar"),
  weatherWrap: document.querySelector(".weather-display"),
};

let functions = {
  startingIndexOf5Days: function () {
    //initialise the index of the first day of the 5 days sequence
    values.daysIndexTracker =
      (values.daysOfWeekArr.indexOf(values.currentDay) - //make sure it doesnt go out of bound of the array and loop around
        2 +
        values.daysOfWeekArr.length) %
      values.daysOfWeekArr.length;
  },
  updateDayTracker: function (currentDayIndex, arr) {
    values.daysIndexTracker = (currentDayIndex + 1) % arr.length;
  },
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
  changeCards: function () {
    //update the 5 days card with correct infos
    functions.startingIndexOf5Days();
    selectors.weatherWrap
      .querySelectorAll(".day-card")
      .forEach((currentDayPoint) => {
        domManipulations.changeDay(currentDayPoint);
        domManipulations.changeIcon(currentDayPoint);
        domManipulations.changeWeatherFelt(currentDayPoint);
        domManipulations.changeProb(currentDayPoint);
        functions.updateDayTracker(
          values.daysIndexTracker,
          values.daysOfWeekArr,
        );
      });
  },
  weatherDisplay: async function () {
    let array = await functions.get5Days();
    console.log(array);
  },
  changeDay: function (cardPointer) {
    cardPointer.querySelector(".day-field").textContent =
      values.daysOfWeekArr[values.daysIndexTracker];
  },
  changeIcon: function (cardPointer) {},
  changeWeatherFelt: function (cardPointer) {},
  changeProb: function (cardPointer) {},
};

/*Testing area */

domManipulations.changeCards();
