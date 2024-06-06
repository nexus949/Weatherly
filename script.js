document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('.searchBox');
    const dropdown = document.getElementById('dropdown');
    let debounceTimeout;

    // Predefined list of common locations
    const commonLocations = [
        'London, UK',
        'Paris, France',
        'Tokyo, Japan',
        'Sydney, Australia',
        'Berlin, Germany',
        'Moscow, Russia',
        'Beijing, China',
        'Mumbai, India',
        'New York, USA',
        'Los Angeles, USA',
        'Chicago, USA',
        'Houston, USA',
        'Phoenix, USA',
        'Philadelphia, USA',
        'San Antonio, USA',
        'San Diego, USA',
        'Dallas, USA',
        'San Jose, USA',
        'Austin, USA',
        'Jacksonville, USA',
        'Fort Worth, USA',
        'Columbus, USA',
        'Charlotte, USA',
        'San Francisco, USA',
        'Indianapolis, USA',
        'Seattle, USA',
        'Denver, USA',
        'Washington, USA',
        'Boston, USA',
        'El Paso, USA',
        'Nashville, USA',
        'Detroit, USA',
        'Oklahoma City, USA',
        'Portland, USA',
        'Las Vegas, USA',
        'Memphis, USA',
        'Louisville, USA',
        'Baltimore, USA',
        'Milwaukee, USA',
        'Albuquerque, USA',
        'Tucson, USA',
        'Fresno, USA',
        'Sacramento, USA',
        'Mesa, USA',
        'Kansas City, USA',
        'Atlanta, USA',
        'Long Beach, USA',
        'Omaha, USA',
        'Raleigh, USA',
        'Miami, USA',
        'Virginia Beach, USA',
        'Oakland, USA',
        'Minneapolis, USA',
        'Tulsa, USA',
        'Arlington, USA',
        'Tampa, USA',
        'New Orleans, USA',
        'Wichita, USA',
        'Cleveland, USA',
        'Bakersfield, USA',
        'Aurora, USA',
        'Anaheim, USA',
        'Honolulu, USA',
        'Santa Ana, USA',
        'Riverside, USA',
        'Corpus Christi, USA',
        'Lexington, USA',
        'Henderson, USA',
        'Stockton, USA',
        'Saint Paul, USA',
        'Cincinnati, USA',
        'St. Louis, USA',
        'Pittsburgh, USA',
        'Greensboro, USA',
        'Lincoln, USA',
        'Anchorage, USA',
        'Plano, USA',
        'Orlando, USA',
        'Irvine, USA',
        'Newark, USA',
        'Toledo, USA',
        'Durham, USA',
        'Chula Vista, USA',
        'Fort Wayne, USA',
        'Jersey City, USA',
        'St. Petersburg, USA',
        'Laredo, USA',
        'Madison, USA',
        'Chandler, USA',
        'Buffalo, USA',
        'Lubbock, USA',
        'Scottsdale, USA',
        'Reno, USA',
        'Glendale, USA',
        'Gilbert, USA',
        'Winston–Salem, USA',
        'North Las Vegas, USA',
        'Norfolk, USA',
        'Chesapeake, USA',
        'Garland, USA',
        'Irving, USA',
        'Hialeah, USA',
        'Fremont, USA',
        'Boise, USA',
        'Richmond, USA',
        'Spokane, USA',
        'Baton Rouge, USA',
        'Tacoma, USA',
        'San Bernardino, USA',
        'Modesto, USA',
        'Fontana, USA',
        'Des Moines, USA',
        'Moreno Valley, USA',
        'Santa Clarita, USA',
        'Fayetteville, USA',
        'Birmingham, USA',
        'Oxnard, USA',
        'Rochester, USA',
        'Port St. Lucie, USA',
        'Grand Rapids, USA',
        'Huntsville, USA',
        'Salt Lake City, USA',
        'Frisco, USA',
        'Yonkers, USA',
        'Amarillo, USA',
        'Glendale, USA',
        'Huntington Beach, USA',
        'McKinney, USA',
        'Montgomery, USA',
        'Augusta, USA',
        'Aurora, USA',
        'Akron, USA',
        'Little Rock, USA',
        'Tempe, USA',
        'Columbus, USA',
        'Overland Park, USA',
        'Grand Prairie, USA',
        'Tallahassee, USA',
        'Cape Coral, USA',
        'Mobile, USA',
        'Knoxville, USA',
        'Shreveport, USA',
        'Worcester, USA',
        'Ontario, USA',
        'Vancouver, USA',
        'Sioux Falls, USA',
        'Chattanooga, USA',
        'Brownsville, USA',
        'Fort Lauderdale, USA',
        'Providence, USA',
        'Newport News, USA',
        'Rancho Cucamonga, USA',
        'Santa Rosa, USA',
        'Peoria, USA',
        'Oceanside, USA',
        'Elk Grove, USA',
        'Salem, USA',
        'Pembroke Pines, USA',
        'Eugene, USA',
        'Garden Grove, USA',
        'Cary, USA',
        'Fort Collins, USA',
        'Corona, USA',
        'Springfield, USA',
        'Jackson, USA',
        'Alexandria, USA',
        'Hayward, USA',
        'Clarksville, USA',
        'Lakewood, USA',
        'Lancaster, USA',
        'Salinas, USA',
        'Palmdale, USA',
        'Hollywood, USA',
        'Springfield, USA',
        'Macon, USA',
        'Kansas City, USA',
        'Sunnyvale, USA',
        'Pomona, USA',
        'Killeen, USA',
        'Escondido, USA',
        'Pasadena, USA',
        'Naperville, USA',
        'Bellevue, USA',
        'Joliet, USA',
        'Murfreesboro, USA',
        'Midland, USA',
        'Rockford, USA',
        'Paterson, USA',
        'Savannah, USA',
        'Bridgeport, USA',
        'Torrance, USA',
        'McAllen, USA',
        'Syracuse, USA',
        'Surprise, USA',
        'Denton, USA',
        'Roseville, USA',
        'Thornton, USA',
        'Miramar, USA',
        'Pasadena, USA',
        'Mesquite, USA',
        'Olathe, USA',
        'Dayton, USA',
        'Carrollton, USA',
        'Waco, USA',
        'Orange, USA',
        'Fullerton, USA',
        'Charleston, USA',
        'West Valley City, USA',
        'Visalia, USA',
        'Hampton, USA',
        'Gainesville, USA',
        'Warren, USA',
        'Coral Springs, USA',
        'Cedar Rapids, USA',
        'Round Rock, USA',
        'Sterling Heights, USA',
        'Kent, USA',
        'Columbia, USA',
        'Santa Clara, USA',
        'New Haven, USA',
        'Stamford, USA',
        'Concord, USA',
        'Elizabeth, USA',
        'Athens, USA',
        'Thousand Oaks, USA',
        'Lafayette, USA',
        'Simi Valley, USA',
        'Topeka, USA',
        'Norman, USA',
        'Fargo, USA',
        'Wilmington, USA',
        'Abilene, USA',
        'Odessa, USA',
        'Columbia, USA',
        'Pearland, USA',
        'Victorville, USA',
        'Hartford, USA',
        'Vallejo, USA',
        'Allentown, USA',
        'Berkeley, USA',
        'Richardson, USA',
        'Arvada, USA',
        'Ann Arbor, USA',
        'Rochester, USA',
        'Cambridge, USA',
        'Sugar Land, USA',
        'Lansing, USA',
        'Evansville, USA',
        'College Station, USA',
        'Fairfield, USA',
        'Clearwater, USA',
        'Beaumont, USA',
        'Independence, USA',
        'Provo, USA',
        'West Jordan, USA',
        'Murfreesboro, USA',
        'Palm Bay, USA',
        'El Monte, USA',
        'Carlsbad, USA',
        'North Charleston, USA',
        'Temecula, USA',
        'Clovis, USA',
        'Springfield, USA',
        'Meridian, USA',
        'Westminster, USA',
        'Costa Mesa, USA',
        'High Point, USA',
        'Manchester, USA',
        'Pueblo, USA',
        'Lakeland, USA',
        'Pompano Beach, USA',
        'West Palm Beach, USA',
        'Antioch, USA',
        'Everett, USA',
        'Downey, USA',
        'Lowell, USA',
        'Centennial, USA',
        'Elgin, USA',
        'Richmond, USA',
        'Peoria, USA',
        'Broken Arrow, USA',
        'Miami Gardens, USA',
        'Billings, USA',
        'Jurupa Valley, USA',
        'Sandy Springs, USA',
        'Gresham, USA',
        'Lewisville, USA',
        'Hillsboro, USA',
        'Ventura, USA',
        'Greeley, USA',
        'Inglewood, USA',
        'Waterbury, USA',
        'League City, USA',
        'Santa Maria, USA',
        'Tyler, USA',
        'Davie, USA',
        'Lakewood, USA',
        'Daly City, USA',
        'Boulder, USA',
        'Allen, USA',
        'West Covina, USA',
        'Sparks, USA',
        'Wichita Falls, USA',
        'Green Bay, USA',
        'San Mateo, USA',
        'Norwalk, USA',
        'Rialto, USA',
        'Las Cruces, USA',
        'Chico, USA',
        'El Cajon, USA',
        'Burbank, USA',
        'South Bend, USA',
        'Renton, USA',
        'Vista, USA',
        'Davenport, USA',
        'Edinburg, USA',
        'Tuscaloosa, USA',
        'Carmel, USA',
        'Spokane Valley, USA',
        'San Angelo, USA',
        'Vacaville, USA',
        'Clinton, USA',
        'Bend, USA',
        'Woodbridge, USA',
        'San Marcos, USA',
        'Plymouth, USA',
        'Dearborn, USA',
        'Livonia, USA',
        'Allen, USA',
        'Bloomington, USA',
        'Tracy, USA',
        'Edinburg, USA',
        'Plymouth, USA',
        'Layton, USA',
        'Longmont, USA',
        'Hesperia, USA',
        'Cheyenne, USA',
        'Albany, USA',
        'Brockton, USA',
        'Lorain, USA',
        'Kennewick, USA',
        'Baytown, USA',
        'Apple Valley, USA',
        'Redwood City, USA',
        'Manteca, USA',
        'Upland, USA',
        'Haverhill, USA',
        'Mount Pleasant, USA',
        'Buckeye, USA',
        'Pittsburgh, USA',
        'Suffolk, USA',
        'Palo Alto, USA',
        'Pawtucket, USA',
        'Lynchburg, USA',
        'Lawrence, USA',
        'Yuma, USA',
        'Elkhart, USA',
        'Warwick, USA',
        'Largo, USA',
        'Tustin, USA',
        'Palm Coast, USA',
        'Muncie, USA',
        'Alhambra, USA',
        'St. George, USA',
        'Reading, USA',
        'Schaumburg, USA',
        'Bristol, USA',
        'Westland, USA',
        'Rapid City, USA',
        'Conroe, USA',
        'Temecula, USA',
        'Missouri City, USA',
        'Gulfport, USA',
        'New Bedford, USA',
        'Perris, USA',
        'Rock Hill, USA',
        'Flower Mound, USA',
        'San Leandro, USA',
        'Coon Rapids, USA',
        'Kendall, USA',
        'Greenville, USA',
        'Norwalk, USA',
        'Peabody, USA',
        'Buena Park, USA',
        'Blaine, USA',
        'Lakeville, USA',
        'Greenwood, USA',
        'Valdosta, USA',
        'Newark, USA',
        'Quincy, USA',
        'Southfield, USA',
        'Colton, USA',
        'Springfield, USA',
        'Hawthorne, USA',
        'Dubuque, USA',
        'Lodi, USA',
        'Fishers, USA',
        'Hammond, USA',
        'Gary, USA',
        'Concord, USA',
        'St. Clair Shores, USA',
        'Columbia, USA',
        'Marietta, USA',
        'Santa Monica, USA',
        'Redlands, USA',
        'Eden Prairie, USA',
        'Sammamish, USA',
        'Dearborn Heights, USA',
        'Westminster, USA',
        'Bayonne, USA',
        'Pittsburg, USA',
        'Portsmouth, USA',
        'Rome, USA',
        'Rancho Cordova, USA',
        'Palm Springs, USA',
        'Lynchburg, USA',
        'Kirkland, USA',
        'Mountain View, USA',
        'Alpharetta, USA',
        'Hemet, USA',
        'Brooklyn Park, USA',
        'Bismarck, USA',
        'Pleasanton, USA',
        'Skokie, USA',
        'Johnson City, USA',
        'Avondale, USA',
        'Casa Grande, USA',
        'Gastonia, USA',
        'Rocklin, USA',
        'Novato, USA',
        'Deltona, USA',
        'Wellington, USA',
        'San Ramon, USA',
        'Rio Rancho, USA',
        'Lafayette, USA',
        'Troy, USA',
        'South Gate, USA',
        'Farmington Hills, USA',
        'Goodyear, USA',
        'Largo, USA',
        'Bloomington, USA',
        'Kenner, USA',
        'Blue Springs, USA',
        'Roswell, USA',
        'Victoria, USA',
        'Kolkata, India',
        ];

    // Function to get search suggestions
    async function getSuggestions(query) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=5989b0093caf487a8c970518240606&q=${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            return [];
        }
    }

    // Function to handle search box input with debouncing
    searchBox.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
            const query = searchBox.value.trim();
            if (query.length > 0) {
                // Filter predefined locations
                const filteredCommonLocations = commonLocations.filter(location =>
                    location.toLowerCase().includes(query.toLowerCase())
                );

                dropdown.innerHTML = '';
                
                // Display filtered predefined locations
                filteredCommonLocations.forEach((location, index) => {
                    const div = document.createElement('div');
                    div.classList.add('dropdown-item');
                    div.textContent = location;
                    div.setAttribute('data-index', index);
                    div.addEventListener('click', () => {
                        searchBox.value = location;
                        dropdown.style.display = 'none';
                        getResponse();
                    });
                    dropdown.appendChild(div);
                });

                if (filteredCommonLocations.length > 0) {
                    dropdown.style.display = 'block';
                }

                // Fetch additional suggestions from API if needed
                if (filteredCommonLocations.length < 5) {
                    const suggestions = await getSuggestions(query);
                    suggestions.forEach((suggestion, index) => {
                        const div = document.createElement('div');
                        div.classList.add('dropdown-item');
                        div.textContent = suggestion.name;
                        div.setAttribute('data-index', index + filteredCommonLocations.length);
                        div.addEventListener('click', () => {
                            searchBox.value = suggestion.name;
                            dropdown.style.display = 'none';
                            getResponse();
                        });
                        dropdown.appendChild(div);
                    });

                    if (suggestions.length > 0) {
                        dropdown.style.display = 'block';
                    }
                }
            } else {
                dropdown.style.display = 'none';
            }
        }, 300); // Adjust debounce delay as needed
    });

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