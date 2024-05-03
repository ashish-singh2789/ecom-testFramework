import { test, expect } from "@playwright/test";
import fetch from "node-fetch";
import fs from "fs";
import { jsonFilePath } from "../config/constants";

// Define interface for weather data
interface WeatherData {
  name: string; // City name
  main: {
    temp: number; // Temperature in Kelvin
    humidity: number; // Humidity in percentage
  };
  weather: {
    main: string; // Main weather condition (e.g., 'Clear', 'Rain', 'Clouds')
    description: string; // Description of weather condition
  }[];
}

// Function to convert temperature from Kelvin to Celsius
function kelvinToCelsius(kelvin: number): number {
  return Number((kelvin - 273.15).toFixed(1));
}

// Function to check if the data has the structure of WeatherData
function isWeatherData(data: any): data is WeatherData {
    return (
      typeof data === 'object' &&
      'name' in data &&
      'main' in data &&
      'temp' in data.main &&
      'weather' in data &&
      Array.isArray(data.weather)
    );
}

async function getWeather(city: string): Promise<WeatherData | null> {
  // Construct the API URL
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36bd07e6046b34afd7855feeca1a41ce`;

  try {
    // Use fetch to make the API call
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
      // Assert the type of data to WeatherData
      if (isWeatherData(data)) {
        // Convert temperature from Kelvin to Celsius
        const celsiusTemp = kelvinToCelsius(data.main.temp);
        data.main.temp = celsiusTemp;

        // Save data to JSON file
        fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));

        // Return the data
        return data;
      } else {
        console.error('Error: Invalid weather data received');
        return null;
      }
    } else {
      console.error('Error fetching weather data:', data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

test.describe('Weather API', () => {
  test('health check test', async ({}) => {
    const city = "Bengaluru";
    const weatherData = await getWeather(city);
    expect(weatherData).not.toBe(null);
    expect(weatherData!.name).toBe(city);
  });
});