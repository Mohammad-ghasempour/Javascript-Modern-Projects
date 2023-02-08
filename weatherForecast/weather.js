class Weather {
    constructor(city){
        this.apiKey = "5fd1870b3e664839aa7164000230702"
        this.city = city;
         }

         //fetch weather form Api
         async getWeather(){
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}&aqi=no`);
            const responseData = await response.json()
           // console.log(responseData.current)
            return responseData.current;
         }
         
         //change weather location
         changeLocation(city){
            this.city = city;
         }
}

//request structure: http://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=YOUR_CITY&aqi=no
//sample request:    http://api.weatherapi.com/v1/current.json?key=5fd1870b3e664839aa7164000230702&q=tehran&aqi=no
