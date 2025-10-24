const apiKey = '4d9869ade10f80a898f06bfbe1087ac2';
const geocodingUrl = 'https://api.openweathermap.org/geo/1.0/direct';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('weatherForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const locationInput = document.getElementById('locationInput');
  const weatherDisplay = document.getElementById('weatherDisplay');
  const errorMessage = document.getElementById('errorMessage');

  let location = locationInput.value.trim();
  weatherDisplay.innerHTML = '';
  errorMessage.textContent = '';

  if (!location) {
    errorMessage.textContent = '⚠️ Please enter a city name or ZIP code.';
    return;
  }

  try {
    let weatherData;

    if (/^\d+$/.test(location)) {
      const zipUrl = `${weatherUrl}?zip=${location},IN&appid=${apiKey}&units=metric`;
      const response = await fetch(zipUrl);
      if (!response.ok) throw new Error(`Weather API error! Status: ${response.status}`);
      weatherData = await response.json();
    } 
    else if (/^\d+,[A-Za-z]{2}$/.test(location)) {
      const zipUrl = `${weatherUrl}?zip=${location}&appid=${apiKey}&units=metric`;
      const response = await fetch(zipUrl);
      if (!response.ok) throw new Error(`Weather API error! Status: ${response.status}`);
      weatherData = await response.json();
    } 
    else {
      const geoResponse = await fetch(`${geocodingUrl}?q=${encodeURIComponent(location)}&limit=1&appid=${apiKey}`);
      if (!geoResponse.ok) throw new Error(`Geocoding error! Status: ${geoResponse.status}`);
      const geoData = await geoResponse.json();
      if (geoData.length === 0) throw new Error('city not found');

      const { lat, lon, name: cityName, country } = geoData[0];
      const weatherResponse = await fetch(`${weatherUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      if (!weatherResponse.ok) throw new Error(`Weather API error! Status: ${weatherResponse.status}`);
      weatherData = await weatherResponse.json();
      weatherData.name = cityName;
      weatherData.sys.country = country;
    }

    if (weatherData.cod !== 200) throw new Error(weatherData.message || 'An error occurred.');

    const cityName = weatherData.name;
    const country = weatherData.sys.country;
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherDisplay.innerHTML = `
      <h2>${cityName}, ${country}</h2>
      <img src="${iconUrl}" alt="${description}">
      <p><strong>Temperature:</strong> ${temp.toFixed(1)}°C</p>
      <p><strong>Description:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
  } catch (error) {
    let userMessage = '❌ Something went wrong. Please try again.';
    if (error.message === 'city not found') {
      userMessage = '⚠️ Location not found. Try adding country code (e.g., Paris,FR) or ZIP code (e.g., 560001,IN).';
    } else if (error.message.includes('Geocoding') || error.message.includes('Weather API')) {
      userMessage = '🌐 API issue — try again later or check your connection.';
    }
    errorMessage.textContent = userMessage;
    console.error('Error fetching weather:', error);
  }
});

