const weather = new Weather("ahvaz");
const ui = new UI();

const allEventListeners = () => {
  document.addEventListener("DOMContentLoaded", getWeather());
  document
    .getElementById("w-change-btn")
    .addEventListener("click", newLocationRequest);
};

const getWeather = () => {
  weather
    .getWeather()
    .then((result) => {
      console.log(result);
      ui.paint(result);
    })
    .catch((error) => {
      console.log("something went wrong!", error);
    });
};

const newLocationRequest = () => {
  const city = document.getElementById("city").value;
  weather.changeLocation(city);
  getWeather();
  //To close the modal
  $("#locModal").modal("hide");
};

allEventListeners();
