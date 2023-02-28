import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState(null);
  const [result, setResult] = useState(false);
  const [weather, setWeather] = useState(null);

  function showTemp(response) {
    setResult(true);
    setWeather({
      temp: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiid = "3a94f3778290bfeee61278505dbbe51d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiid}&units=metric`;
    axios.get(apiUrl).then(showTemp);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (result) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temp)}℃</li>
          <li>Description: {weather.description}</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>
            {" "}
            <img src={weather.icon} alt="Weather Icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
