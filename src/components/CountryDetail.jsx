import { useState, useEffect } from 'react';
import weatherService from '../services/weather'; 

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (country.capital) {
      weatherService.getWeather(country.capital)
        .then(weatherData => setWeather(weatherData));
    }
  }, [country.capital]);
  
  return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} km²</p>

            <h3>Languages</h3>
            <ul>
              {Object.values(country.languages)
                     .map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              width = "200"/>

            {weather && (
              <>
              <h2>Weather in {country.capital}</h2>
              <p>Temperature: {weather.main.temp} Celsius</p>
              <img 
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} 
                alt="Weather icon"
                width = "100" />
              <p>Wind: {weather.wind.speed} m/s</p>
              
              </>
            )}

        </div>
    );
  };
  
  export default CountryDetail;
  