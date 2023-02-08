const weather = new Weather("ahvaz");


// setTimeout(()=>{
//     weather.changeLocation('shiraz')
//     console.log('shiraz')
// } , 5000)

const allEventListeners = ()=>{
    document.addEventListener("DOMContentLoaded", getWeather());
}


const getWeather = () => {
  weather
    .getWeather()
    .then((result) => {
      console.log(result);
      const ui = new UI();
      ui.paint(result)
    })
    .catch((error) => {
      console.log("something went wrong!", error);
    });
};


allEventListeners();