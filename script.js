let place = "";
let response = "";
let locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", 
"San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", 
"Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", 
"Seattle", "Denver", "Washington", "Boston", "El Paso", "Nashville", 
"Detroit", "Oklahoma City", "Portland", "Las Vegas", "Memphis", "Louisville", 
"Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", 
"Mesa", "Kansas City", "Atlanta", "Long Beach", "Omaha", "Raleigh", "Miami", 
"Virginia Beach", "Oakland", "Minneapolis", "Tulsa", "Arlington", "Tampa", 
"New Orleans", "Wichita", "Cleveland", "Bakersfield", "Aurora", "Anaheim", 
"Honolulu", "Santa Ana", "Riverside", "Corpus Christi", "Lexington", "Henderson", 
"Stockton", "Saint Paul", "Cincinnati", "St. Louis", "Pittsburgh", "Greensboro", 
"Lincoln", "Anchorage", "Plano", "Orlando", "Irvine", "Newark", "Toledo", 
"Durham", "Chula Vista", "Fort Wayne", "Jersey City", "St. Petersburg", 
"Laredo", "Madison", "Chandler", "Buffalo", "Lubbock", "Scottsdale", 
"Reno", "Glendale", "Gilbert", "Winston–Salem", "North Las Vegas", 
"Norfolk", "Chesapeake", "Garland", "Irving", "Hialeah", "Fremont", 
"Boise", "Richmond", "Spokane", "Baton Rouge", "Tacoma", "San Bernardino", 
"Modesto", "Fontana", "Des Moines", "Moreno Valley", "Santa Clarita", 
"Fayetteville", "Birmingham", "Oxnard", "Rochester", "Port St. Lucie", 
"Grand Rapids", "Huntsville", "Salt Lake City", "Frisco", "Yonkers", 
"Amarillo", "Glendale", "Huntington Beach", "McKinney", "Montgomery", 
"Augusta", "Aurora", "Akron", "Little Rock", "Tempe", "Columbus", 
"Overland Park", "Grand Prairie", "Tallahassee", "Cape Coral", "Mobile", 
"Knoxville", "Shreveport", "Worcester", "Ontario", "Vancouver", 
"Sioux Falls", "Chattanooga", "Brownsville", "Fort Lauderdale", "Providence", 
"Newport News", "Rancho Cucamonga", "Santa Rosa", "Peoria", "Oceanside", 
"Elk Grove", "Salem", "Pembroke Pines", "Eugene", "Garden Grove", "Cary", 
"Fort Collins", "Corona", "Springfield", "Jackson", "Alexandria", "Hayward", 
"Clarksville", "Lakewood", "Lancaster", "Salinas", "Palmdale", "Hollywood", 
"Springfield", "Macon", "Kansas City", "Sunnyvale", "Pomona", "Killeen", 
"Escondido", "Pasadena", "Naperville", "Bellevue", "Joliet", "Murfreesboro", 
"Midland", "Rockford", "Paterson", "Savannah", "Bridgeport", "Torrance", 
"McAllen", "Syracuse", "Surprise", "Denton", "Roseville", "Thornton", 
"Miramar", "Pasadena", "Mesquite", "Olathe", "Dayton", "Carrollton", 
"Waco", "Orange", "Fullerton", "Charleston", "West Valley City", 
"Visalia", "Hampton", "Gainesville", "Warren", "Coral Springs", "Cedar Rapids", 
"Round Rock", "Sterling Heights", "Kent", "Columbia", "Santa Clara", "New Haven", 
"Stamford", "Concord", "Elizabeth", "Athens", "Thousand Oaks", "Lafayette", 
"Simi Valley", "Topeka", "Norman", "Fargo", "Wilmington", "Abilene", 
"Odessa", "Columbia", "Pearland", "Victorville", "Hartford", "Vallejo", 
"Allentown", "Berkeley", "Richardson", "Arvada", "Ann Arbor", "Rochester", 
"Cambridge", "Sugar Land", "Lansing", "Evansville", "College Station", 
"Fairfield", "Clearwater", "Beaumont", "Independence", "Provo", 
"West Jordan", "Murfreesboro", "Palm Bay", "El Monte", "Carlsbad", 
"North Charleston", "Temecula", "Clovis", "Springfield", "Meridian", 
"Westminster", "Costa Mesa", "High Point", "Manchester", "Pueblo", 
"Lakeland", "Pompano Beach", "West Palm Beach", "Antioch", "Everett", 
"Downey", "Lowell", "Centennial", "Elgin", "Richmond", "Peoria", 
"Broken Arrow", "Miami Gardens", "Billings", "Jurupa Valley", "Sandy Springs", 
"Gresham", "Lewisville", "Hillsboro", "Ventura", "Greeley", "Inglewood", 
"Waterbury", "League City", "Santa Maria", "Tyler", "Davie", "Lakewood", 
"Daly City", "Boulder", "Allen", "West Covina", "Sparks", "Wichita Falls", 
"Green Bay", "San Mateo", "Norwalk", "Rialto", "Las Cruces", "Chico", 
"El Cajon", "Burbank", "South Bend", "Renton", "Vista", "Davenport", 
"Edinburg", "Tuscaloosa", "Carmel", "Spokane Valley", "San Angelo", 
"Vacaville", "Clinton", "Bend", "Woodbridge", "San Marcos", "Plymouth", 
"Dearborn", "Livonia", "Allen", "Bloomington", "Tracy", "Edinburg", 
"Plymouth", "Layton", "Longmont", "Hesperia", "Cheyenne", "Albany", 
"Brockton", "Lorain", "Kennewick", "Baytown", "Apple Valley", "Redwood City", 
"Manteca", "Upland", "Haverhill", "Mount Pleasant", "Buckeye", 
"Pittsburgh", "Suffolk", "Palo Alto", "Pawtucket", "Lynchburg", "Lawrence", 
"Yuma", "Elkhart", "Warwick", "Largo", "Tustin", "Palm Coast", "Muncie", 
"Alhambra", "St. George", "Reading", "Schaumburg", "Bristol", 
"Westland", "Rapid City", "Conroe", "Temecula", "Missouri City", "Gulfport", 
"New Bedford", "Perris", "Rock Hill", "Flower Mound", "San Leandro", 
"Coon Rapids", "Kendall", "Greenville", "Norwalk", "Peabody", 
"Buena Park", "Blaine", "Lakeville", "Greenwood", "Valdosta", 
"Newark", "Quincy", "Southfield", "Colton", "Springfield", "Hawthorne", 
"Dubuque", "Lodi", "Fishers", "Hammond", "Gary", "Concord", 
"St. Clair Shores", "Columbia", "Marietta", "Santa Monica", "Redlands", 
"Eden Prairie", "Sammamish", "Dearborn Heights", "Westminster", 
"Bayonne", "Pittsburg", "Portsmouth", "Rome", "Rancho Cordova", 
"Palm Springs", "Lynchburg", "Kirkland", "Mountain View", "Alpharetta", 
"Hemet", "Brooklyn Park", "Bismarck", "Pleasanton", "Skokie", 
"Johnson City", "Avondale", "Casa Grande", "Gastonia", "Rocklin", 
"Novato", "Deltona", "Wellington", "San Ramon", "Rio Rancho", 
"Lafayette", "Troy", "South Gate", "Farmington Hills", "Goodyear", 
"Largo", "Bloomington", "Kenner", "Blue Springs", "Roswell", 
"Victoria", "Kolkata", "Tokyo"];

const aqiHash = {
    1: "Good",
    2: "Moderate",
    3: "Unhealthy (Sensitive)",
    4: "Unhealthy",
    5: "Very Unhealthy",
    6: "Hazardous"
}

async function getResponse() {
    try {
        place = document.querySelector(".searchBox").value;

        response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3ec38af15e3c4d18a2b144806242204&q=${place}&aqi=yes`);
        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return;
        }

        response = await response.json();
    } catch (error) {
        console.log(error);
        return;
    }

    //set the data only and only if there is no error
    setData(response, place);
}

function showDropdown() {
    let input = document.querySelector(".searchBox").value.toLowerCase();
    let dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = "";

    if (input) {
        let filteredLocations = locations.filter(location => location.toLowerCase().startsWith(input));
        if (filteredLocations.length > 0) {
            filteredLocations.forEach(location => {
                let div = document.createElement("div");
                div.className = "dropdown-item";
                div.textContent = location;
                div.onclick = () => {
                    document.querySelector(".searchBox").value = location;
                    dropdown.style.display = "none";
                    getResponse();
                };
                dropdown.appendChild(div);
            });
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    } else {
        dropdown.style.display = "none";
    }
}

document.querySelector(".searchBox").addEventListener("input", showDropdown);
document.querySelector(".searchBox").addEventListener("focus", showDropdown);
document.addEventListener("click", function(event) {
    let dropdown = document.getElementById("dropdown");
    if (!document.querySelector(".search").contains(event.target)) {
        dropdown.style.display = "none";
    }
});

function setData(currentData, place) {
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

function changeIcon(currentData) {
    let icon = currentData.current.condition['icon'];
    document.querySelector(".icon").src = icon;
}

function handleKeyDown(event) {
    if (event.key === "Enter") {
        getResponse();
    }
}

function showDropdown() {
    let input = document.querySelector(".searchBox").value.toLowerCase();
    let dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = "";
    if (input) {
        let filteredLocations = locations.filter(location => location.toLowerCase().startsWith(input));
        filteredLocations.forEach(location => {
            let div = document.createElement("div");
            div.className = "dropdown-item";
            div.textContent = location;
            div.onclick = () => {
                document.querySelector(".searchBox").value = location;
                dropdown.innerHTML = "";
                getResponse();
            };
            dropdown.appendChild(div);
        });
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

document.querySelector(".searchBox").addEventListener("input", showDropdown);
document.querySelector(".searchBox").addEventListener("focus", showDropdown);
document.addEventListener("click", function(event) {
    let dropdown = document.getElementById("dropdown");
    if (!document.querySelector(".search").contains(event.target)) {
        dropdown.style.display = "none";
    }
});
