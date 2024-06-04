let place = "";
let response = "";

const aqiHash = {
    1: "Good",
    2: "Moderate",
    3: "Unhealthy (Sensitive)",
    4: "Unhealthy",
    5: "Very Unhealthy",
    6: "Hazardous"
}

async function getResponse(){
    try{
        place = document.querySelector(".searchBox").value;

        response = await fetch(`http://api.weatherapi.com/v1/current.json?key=api_key=${place}&aqi=yes`);
        if(!response.ok){
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return
        }

        response = await response.json();
    }
    catch(error){
        console.log(error);
        return;
    }

    //set the data only and only if there is no error
    setData(response, place);
}

function setData(currentData, place){
    //set the location
    let location = place[0].toUpperCase() + place.slice(1); //capitalize the first letter of the location string
    document.querySelector(".location").textContent = location;

    //set the region and country
    let region = currentData.location['region'];
    let country = currentData.location['country'];

    document.querySelector(".region_n_country").textContent = region + ', ' + country;

    //set the current Date
    let date = currentData.location['localtime'];
    document.querySelector(".time_n_date").textContent = date;

    //set the temperature
    let temp = currentData.current['temp_c'];
    document.querySelector(".temperature").textContent = temp + "°C";

    //change the icon
    changeIcon(currentData);

    //set the current weather condition
    let condition = currentData.current.condition['text'];
    document.querySelector(".condition").textContent = condition;

    //set the humidity
    let humidity = currentData.current['humidity'];
    document.querySelector("#h_value").textContent = humidity + '%';

    //set the wind speed
    let wind_speed = currentData.current['gust_kph'];
    document.querySelector("#w_value").textContent = wind_speed + ' Kmph';

    //set the Air Quality
    let aqi = currentData.current.air_quality['us-epa-index'];
    aqi = aqiHash[`${aqi}`];
    document.querySelector("#air_quality").textContent = aqi;

    //set feelsLike Data
    let feelsLike = currentData.current.feelslike_c;
    document.querySelector('#feelsLike_value').textContent = feelsLike + '°C';
}

function changeIcon(currentData){
    let icon = currentData.current.condition['icon'];
    document.querySelector(".icon").src = icon;
}