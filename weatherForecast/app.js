const weather = new Weather('tehran');


// setTimeout(()=>{
//     weather.changeLocation('shiraz')
//     console.log('shiraz')
// } , 5000)

weather.getWeather()
.then((result)=>{
    console.group(result)
})
.catch((error)=>{
    console.log('something went wrong!' , error);
})

