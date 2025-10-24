# Weather App

## Overview

This is a web-based Weather App developed as part of the Unified Mentor project. It allows users to enter a city name or ZIP code to retrieve current weather conditions, including temperature (in Celsius), weather description, and an icon representing the weather.

## Technologies Used

- **HTML**: For structuring the app with input fields and display areas.
- **CSS**: For styling, ensuring a visually appealing and responsive design.
- **JavaScript**: For interactivity, using async/await to fetch weather data from the OpenWeatherMap API.

## Features

- Input field to enter a city name (e.g., "Bengaluru,IN") or ZIP code (e.g., "560001,IN").
- Submit button to trigger weather data retrieval.
- Display of temperature (Celsius), weather description, and weather icon.
- Responsive design that works on various screen sizes.
- Error handling for invalid locations or API issues.

## Prerequisites

- A web browser (e.g., Chrome, Firefox).
- Internet connection to access the OpenWeatherMap API.
- Node.js and a local server (e.g., Live Server) for running the app locally (optional).

## Installation

1. Clone or download this repository to your local machine.
2. Navigate to the project directory.
3. Replace the `apiKey` value in `script.js` with your own OpenWeatherMap API key (obtainable from [https://openweathermap.org/](https://openweathermap.org/)).
4. Open `index.html` in a web browser, or use a local server (e.g., Live Server in VS Code) for a live reload experience.

## Usage

1. Enter a city name with a country code (e.g., "Paris,FR" or "Bengaluru,IN") or a ZIP code with a country code (e.g., "560001,IN" or "10001,US") in the input field.
2. Click the "Check Weather" button.
3. View the weather information displayed below, or check the error message if the location is invalid.

## Notes

- The app uses the OpenWeatherMap API's free tier, which provides reliable support for city names with country codes (e.g., "Bengaluru,IN") and ZIP codes (e.g., "560001,IN") when properly formatted.
- Test the app with different locations to ensure functionality. For example, "London,UK" and "560001,IN" should work, but "999999,XX" will trigger an error.

## Testing

- Tested on [05:42 PM IST, October 24, 2025] with city names like "Bengaluru,IN" (showing ~25-28°C, partly cloudy) and ZIP codes like "560001,IN" (successfully resolved to Bengaluru weather).
- Check the browser console (F12) for error details if issues persist with other locations.

## Acknowledgments

- OpenWeatherMap API [](https://openweathermap.org/) for weather data.
