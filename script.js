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
    place = document.querySelector(".searchBox").value;

    response = await fetch(`http://api.weatherapi.com/v1/current.json?key=3ec38af15e3c4d18a2b144806242204&q=${place}&aqi=yes`);
    response = await response.json();
    console.log(response);

    setData(response, place);
}

function setData(currentData, place){
    //set the location
    let location = place[0].toUpperCase() + place.slice(1); //capitalize the first letter of the location string
    document.querySelector(".location").textContent = location;

    //set the region
    let region = currentData.location['region'];
    document.querySelector(".region").textContent = "Region: " + region;

    //set the country
    let country = currentData.location['country'];
    document.querySelector(".country").textContent = "Country: " + country;

    //set the current Date
    let date = currentData.location['localtime'];
    document.querySelector(".date").textContent = date;

    //set the temperature
    let temp = currentData.current['temp_c'];
    document.querySelector(".temperature").textContent = temp + "°C";

    //set the current weather condition
    let condition = currentData.current.condition['text'];
    document.querySelector(".condition").textContent = condition;

    //set the humidity
    let humidity = currentData.current['humidity'];
    document.querySelector(".h_value").textContent = humidity + '%';

    //set the wind speed
    let wind_speed = currentData.current['gust_kph'];
    document.querySelector(".w_value").textContent = wind_speed + ' Kmph';

    //set the Air Quality
    let aqi = currentData.current.air_quality['us-epa-index'];
    aqi = aqiHash[`${aqi}`];
    document.querySelector(".air_quality").textContent = "Air Quality: \n" + aqi;

    //change the icon
    changeIcon(currentData);

    //set the air pollutant data
    setPollutantData(currentData);
}

function changeIcon(currentData){
    let icon = currentData.current.condition['icon'];
    document.querySelector(".con_image").src = icon;
}

function setPollutantData(currentData){
    let pollutantList = {
        co: null,
        no2: null,
        so2: null,
        o3: null,
        pm2_5: null,
        pm10: null
    }

    let pollutantData = currentData.current['air_quality'];

    //map the values
    for(key in pollutantData){
        if(pollutantList.hasOwnProperty(key) && pollutantData.hasOwnProperty(key)){
            pollutantList[key] = pollutantData[key];
        }
    }

    console.log(pollutantList);
    for(item in pollutantList){
        document.querySelector(`#${item}`).textContent = `${item}`.toUpperCase() + ": "  + pollutantList[item];
    }
}
