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
    event.preventDefault();
    userValues.citySearched = selectors.searchBar.value;
    console.log(userValues.citySearched);
  },
};

let listeners = {
  button: (function () {
    selectors.button.addEventListener("click", functions.getCity);
  })(),
};
