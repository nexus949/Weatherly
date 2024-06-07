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

        response = await fetch(`https://api.weatherapi.com/v1/current.json?key=API_KEY=${place}&aqi=yes`);
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

    // Hide dropdown menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target) && !searchBox.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Function to handle keyboard navigation
    let selectedIndex = -1;
    let navigatingDropdown = false;

    searchBox.addEventListener('keydown', (event) => {
        const items = dropdown.querySelectorAll('.dropdown-item');
        if (items.length > 0) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                selectedIndex = (selectedIndex + 1) % items.length;
                navigatingDropdown = true;
                updateSelection(items);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                navigatingDropdown = true;
                updateSelection(items);
            } else if (event.key === 'Enter') {
                event.preventDefault();
                if (dropdown.style.display === 'block' && selectedIndex >= 0) {
                    items[selectedIndex].click();
                } else {
                    getResponse();
                }
            }
        } else if (event.key === 'Enter') {
            getResponse();
        }
    });

    function updateSelection(items) {
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }
});

// Function to get weather information and update the UI
async function getResponse() {
    const searchBox = document.querySelector('.searchBox');
    const query = searchBox.value.trim();
    if (query.length === 0) return;

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5989b0093caf487a8c970518240606&q=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Update the UI with weather data
        document.querySelector('.location').textContent = data.location.name;
        document.querySelector('.region_n_country').textContent = `${data.location.region}, ${data.location.country}`;
        document.querySelector('.time_n_date span').textContent = data.location.localtime;
        document.querySelector('.icon').src = `//cdn.weatherapi.com/weather/64x64/day/${data.current.condition.icon.split('/').pop()}`;
        document.querySelector('.temperature').textContent = `${data.current.temp_c}°`;
        document.querySelector('.sub_condition').textContent = data.current.condition.text;
        document.getElementById('h_value').textContent = `${data.current.humidity}%`;
        document.getElementById('w_value').textContent = `${data.current.wind_kph}Kmph`;
        document.getElementById('air_quality').textContent = getAirQuality(data.current.air_quality);
        document.getElementById('feelsLike_value').textContent = `${data.current.feelslike_c}°`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to get a readable air quality value
function getAirQuality(airQuality) {
    if (!airQuality) return 'None';
    if (airQuality.pm2_5 <= 12) return 'Good';
    if (airQuality.pm2_5 <= 35.4) return 'Moderate';
    if (airQuality.pm2_5 <= 55.4) return 'Unhealthy for Sensitive Groups';
    if (airQuality.pm2_5 <= 150.4) return 'Unhealthy';
    if (airQuality.pm2_5 <= 250.4) return 'Very Unhealthy';
    return 'Hazardous';
}
