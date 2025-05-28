let values = {
  daysOfWeekArr: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  eachDayInfo: [
    { day: "Mon", status: "cloudy", temp: 19, felt: 15, prob: 20 },
    { day: "Tue", status: "thunder", temp: 22, felt: 17, prob: 10 },
    { day: "Wed", status: "rainy", temp: 12, felt: 10, prob: 80 },
    { day: "Tue", status: "rainy", temp: 14, felt: 18, prob: 100 },
    { day: "Fri", status: "sunny", temp: 23, felt: 20, prob: 10 },
    { day: "Sat", status: "sunny", temp: 19, felt: 15, prob: 20 },
    { day: "Sun", status: "cloudy", temp: 19, felt: 17, prob: 40 },
  ],
  currentDateInDigit: new Date().toLocaleDateString().replaceAll("/", "-"),
  currentDay: new Date().toDateString().split(" ")[0],
  daysIndexTracker: 0,
  twoDaysBeforeTodayDigit: new Date().getUTCDate() - 2,
  twoDaysAfterTodayDigit: new Date().getUTCDate() + 2,
  currentMonthDigit: new Date().getUTCMonth() + 1,
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
    "partially cloudy": {
      background: "img/partially-cloudy-background.jpg",
      icon: "img/cloudy-card-icon.png",
    },
    rain: {
      background: "img/rain-background.jpg",
      icon: "img/rain-card-icon.png",
    },
    thunder: {
      background: "img/thunder-background.jpg",
      icon: "img/thunder-card-icon.png",
    },
  },
  fetchedObject: {},
};

let selectors = {
  button: document.querySelector("button"),
  searchBar: document.querySelector(".search-bar"),
  weatherWrap: document.querySelector(".weather-display"),
};

let functions = {
  updateDayTracker: function (currentDayIndex, arr) {
    values.daysIndexTracker = (currentDayIndex + 1) % arr.length;
  },
  getCity: function () {
    let name = selectors.searchBar.value;
    if (selectors.searchBar.value !== "") {
      values.citySearched = functions.isCityValid(name);
    }
  },
  isCityValid: function (cityName) {
    return cityName.toLowerCase();
  },
  get5Days: async function () {
    let request = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${values.citySearched}/2025-${values.currentMonthDigit}-${values.twoDaysBeforeTodayDigit}/2025-${values.currentMonthDigit}-${values.twoDaysAfterTodayDigit}?unitGroup=metric&key=MJEGRF56UJXUSESDCMU4QTNLR`,
    );
    let jsonRequest = await request.json();
    return jsonRequest;
  },
};

let domManipulations = {
  refreshCards: async function () {
    (values.daysIndexTracker = values.daysOfWeekArr.indexOf(values.currentDay)), //initiate good index
      //update the 5 days card with correct infos
      functions.getCity();
    //domManipulations.changeWallpaper();
    values.fetchedObject = await functions.get5Days();
    selectors.weatherWrap
      .querySelectorAll(".day-card")
      .forEach((currentDayPoint) => {
        domManipulations.changeDay(currentDayPoint);
        domManipulations.changeIcon(currentDayPoint);
        domManipulations.changeStatus(currentDayPoint);
        domManipulations.changeTemp(currentDayPoint);
        domManipulations.changeWeatherFelt(currentDayPoint);
        domManipulations.changeProb(currentDayPoint);
        functions.updateDayTracker(
          values.daysIndexTracker,
          values.daysOfWeekArr,
        );
      });
    domManipulations.changeWallpaper();
  },
  changeDay: function (cardPointer) {
    cardPointer.querySelector(".day-field").textContent =
      values.daysOfWeekArr[values.daysIndexTracker - 2];
  },
  changeIcon: function (cardPointer) {
    let imageLink =
      values.fetchedObject["days"][
        values.daysIndexTracker - 2
      ].conditions.split(",");
    cardPointer
      .querySelector(".card-icon")
      .setAttribute("src", `img/${imageLink[0]}-card-icon.png`);
  },
  changeStatus: function (cardPointer) {
    cardPointer.querySelector(".weather-status-field").textContent =
      values.fetchedObject["days"][values.daysIndexTracker - 2].conditions;
  },
  changeTemp: function (cardPointer) {
    let value = values.fetchedObject["days"][values.daysIndexTracker];
    cardPointer.querySelector(".temp-field").textContent =
      values.fetchedObject["days"][values.daysIndexTracker - 2]["temp"];
  },
  changeWeatherFelt: function (cardPointer) {
    cardPointer.querySelector(".temp-felt").textContent =
      values.fetchedObject["days"][values.daysIndexTracker - 2].feelslike +
      "°C";
  },
  changeProb: function (cardPointer) {
    cardPointer.querySelector(".prob-text").textContent =
      values.eachDayInfo[values.daysIndexTracker - 2].prob + "%";
  },
  changeWallpaper: function () {
    let condition = document
      .querySelector(".mid")
      .querySelector(".weather-status-field").textContent;
    document.querySelector(".main-wrapper").style.background =
      `url(/${condition}-wallpaper.jpg)`;
    let currentDayWeather = document
      .querySelector(".mid")
      .querySelector(".weather-status-field").textContent;
    document
      .querySelector(".main-wrapper")
      .setAttribute(
        "style",
        `background:url(img/${currentDayWeather}-background.jpg)`,
      );
  },
};

let listeners = {
  button: (function () {
    selectors.button.addEventListener("click", domManipulations.refreshCards);
  })(),
};

/*Testing area */

domManipulations.refreshCards();
