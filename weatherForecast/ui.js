class UI{
    constructor(){
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.windSpeed = document.getElementById('w-wind-speen');
        this.pressure = document.getElementById('w-pressure');
    }
    paint(weather){
        this.location.textContent = weather.location.name;
        this.desc.textContent= weather.current.condition.text;
        this.string.textContent= weather.current.temp_c;
        this.icon.setAttribute('src' , weather.current.condition.icon);
        this.humidity.textContent = `Relative Humidity: ${weather.current.humidity}`;
        this.feelsLike.textContent= `Feels Like: ${weather.current.feelslike_c}`;
        this.windSpeed.textContent = `Wind Speed: ${weather.current.wind_kph}`;
        this.pressure.textContent = `Pressure in inches: ${weather.current.pressure_in}`;





    }
}