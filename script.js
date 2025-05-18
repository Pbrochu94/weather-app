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
  daysIndexTracker: undefined,
  currentDay: new Date().toDateString().split(" ")[0],
  twoDaysBeforeTodayDigit: new Date().getUTCDate(),
  twoDaysAfterTodayDigit: new Date().getUTCDate() + 4,
  currentMonthDigit: new Date().getUTCMonth(),
  citySearched: "montreal",
  imageBank: {
    sunny: {
      background: "img/sunny-background.jpg",
      icon: "img/sunny-card-icon.png",
    },
    cloud: {
      background: "img/cloud-background.jpg",
      icon: "img/cloud-card-icon.png",
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

      values.eachDayInfo[i].felt = fetchedInfoArr[i].feelslike;
      console.log(values.eachDayInfo[i].felt, fetchedInfoArr[i].feelslike);
      values.eachDayInfo[i].status = fetchedInfoArr[i].conditions.toLowerCase();
      values.eachDayInfo[i].prob = fetchedInfoArr[i].precipprob;
    }
  },
};

let domManipulations = {
  refreshCards: async function () {
    //update the 5 days card with correct infos
    functions.getCity();
    let fetchedValues = await functions.get5Days();
    functions.changeEachDaysValues(fetchedValues);
    functions.startingIndexOf5Days();
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
  },
  changeDay: function (cardPointer) {
    console.log(cardPointer, values.daysOfWeekArr[values.daysIndexTracker]);
    cardPointer.querySelector(".day-field").textContent =
      values.daysOfWeekArr[values.daysIndexTracker];
  },
  changeIcon: function (cardPointer) {
    let imageLink =
      values.eachDayInfo[values.daysIndexTracker].status.split(",");
    console.log(imageLink);
    cardPointer
      .querySelector(".card-icon")
      .setAttribute("src", `img/${imageLink[0]}-card-icon.png`);
  },
  changeStatus: function (cardPointer) {
    cardPointer.querySelector(".weather-status-field").textContent =
      values.eachDayInfo[values.daysIndexTracker].status;
  },
  changeTemp: function (cardPointer) {
    cardPointer.querySelector(".temp-field").textContent =
      values.eachDayInfo[values.daysIndexTracker].temp + "°C";
  },
  changeWeatherFelt: function (cardPointer) {
    cardPointer.querySelector(".temp-felt").textContent =
      values.eachDayInfo[values.daysIndexTracker].felt + "°C";
  },
  changeProb: function (cardPointer) {
    cardPointer.querySelector(".prob-text").textContent =
      values.eachDayInfo[values.daysIndexTracker].prob + "%";
  },
};

let listeners = {
  button: function () {
    selectors.button.addEventListener("click", domManipulations.refreshCards);
  },
};

/*Testing area */

domManipulations.refreshCards();
