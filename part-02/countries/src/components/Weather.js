import { useState, useEffect } from "react";
import axios from "axios";

const ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = ({ city }) => {
  const [cityData, setCityData] = useState(null);

  // Fetch data from OpenWeatherMap
  const url = ENDPOINT + `?q=${encodeURIComponent(city)}&appid=${API_KEY}`;
  useEffect(() => {
    setCityData(null);
    axios.get(url).then((res) => setCityData(res.data));
  }, [url]);

  // Loading indicator
  if (cityData === null) return <div>loading weather...</div>;

  // Extract needed data
  const icon = `http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`;
  const description = cityData.weather[0].description;
  const temperature = Math.round((cityData.main.temp - 273.15) * 100) / 100;
  const wind = cityData.wind.speed;

  return (
    <div>
      <h3>Weather in {city}</h3>
      <div>Temperature: {temperature} Celsius</div>
      <img src={icon} alt={description} />
      <div>wind {wind} m/s</div>
    </div>
  );
};

export default Weather;
