document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('.searchBox');
    const dropdown = document.getElementById('dropdown');
    let debounceTimeout;

    // Function to get search suggestions
    async function getSuggestions(query) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=5989b0093caf487a8c970518240606&q=${query}&aqi=yes`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } 
        catch (error) {
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
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5989b0093caf487a8c970518240606&q=${query}&aqi=yes`);
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