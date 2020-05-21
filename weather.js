const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");


const weather = {};

weather.temperature = {
    unit : "Celsius"
}

const KELVIN = 273;
let key = "7e70df50a03c697149f435eb16b50531";
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition( setPosition, showerror );
    }else{
        notificationElement.style.display = "block";
        notificationElement.innerHTML = "<p> browser doesn't support</p>"
    }
    function setPosition(position)
    {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getweather(latitude, longitude);
    }
    
    function showerror(error) {
        notificationElement.style.display = "block";
        notificationElement.innerHTML='<p> $(error.message)</p>';
    }
    function getweather(latitude, longitude){

        var api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
        //var api = 'https://api.openweathermap.org/data/2.5/weather?lat=11.341036&lon=80.270721&appid=4e1d6d5f1c32989b70db47c00a6f016b';
        

        //console.log(api);
    //}
        fetch(api)
        .then(function(response){
            let data = response.json();
            console.log('Data ---> ', data)
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            console.log('temperature.value ---> ', weather.temperature.value);
            weather.decription = data.weather[0].description;
            console.log('decription ---> ', weather.decription);
            weather.iconId = data.weather[0].icon;
            console.log('iconId  ---> ', weather.iconId);
            weather.city = data.name;
            console.log('city ---> ',weather.city);
            weather.country = data.sys.country;
            console.log('country ', weather.country);
        })
        .then(function(){
            displayWeather();
        });
    }
        
    function displayWeather(){
        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        descElement.innerHTML =  `${weather.decription}`;
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    }

    function convert(temperature){
        return (temperature * 9/5) + 32;
 }
 
 tempElement.addEventListener("click", function(){
 
     if(weather.temperature.value === undefined) return ;
     if(weather.temperature.unit === "celsius"){
         let f = convert(weather.temperature.value);
 
         f= Math.floor(f);
 
         tempElement.innerHTML = `${f}° <span>F</span>`;
 
         weather.temperature.unit = "f";
     }else {
         tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
         weather.temperature.unit = "celsius";
    }
 });
 