import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { Search, MapPin, Wind, ArrowUp, Droplet, ArrowDown } from 'react-feather';
import { getWeather } from './api/api';
import dateFormat from 'dateformat';
import MyContext from './components/context/myContext';
import History from './components/history/History';
import Chart from './components/chart/Chart';

function App() {
  const [city, setCity] = useState('Ranchi');
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState('metric'); // Default unit is Celsius
  const [show, setShow] = useState('false')
  const { history, setHistory}= useContext(MyContext);

  useEffect(() => {
    getWeatherbyCity();
  }, []);

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city, unit);
    setWeather(weatherData);
    if (city.trim() !== '' && !history.includes(city.trim())) {
      setHistory(prevHistory => [city.trim(), ...prevHistory.slice(0, 4)]);
    }
    setShow(false)
  };



  const handleSearch = (searchCity) => {
    setCity(searchCity);
    getWeatherbyCity();
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    getWeatherbyCity();
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  }

  const toggleUnit = async () => {
    // Toggle between metric (Celsius) and imperial (Fahrenheit) units
    setUnit(unit === "metric" ? "imperial" : "metric");
  }

  useEffect(() => {
    // Fetch weather data when unit is changed
    const fetchWeatherData = async () => {
      if (city !== "") {
        const weatherData = await getWeather(city, unit);
        setWeather(weatherData);
      }
    };

    fetchWeatherData();
  }, [unit]); // Run effect whenever unit changes
  

  const handleShow = () => {
    if(show){
        setShow(false)
    }
}

  return (
    <div className=' parent' onClick={handleShow}>
    <div className="app" >
      <h1>Weather Search App</h1>
      <div className="input-wrapper">
        <input
          type="text"
          value={city}
          onChange={(e) => (setCity(e.target.value), setShow(true))}
          placeholder='Enter City Name'
        />
        <button onClick={() => handleSearch(city)}>
          <Search />
        </button>
      </div>

      <div style={{ display: !show ? 'none' : 'block' }}>
        <History  handleSuggestionClick={handleSuggestionClick} />
      </div>


      {weather && weather.weather &&
        <div className="content">

          <div className="location d-flex">
            <MapPin />
            <h2>{weather.name} <span>({weather.sys.country})</span></h2>
          </div>
          <p className="datetext">{renderDate()}</p>

          <div className="weatherdesc d-flex flex-c">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <h3>{weather.weather[0].description}</h3>
          </div>

          <div className="tempstats d-flex flex-c">
            <h1>{weather.main.temp.toFixed(0)} <span>{unit === "metric" ? "°C" : "°F"}</span></h1>
            {/* <h1>{unit === "metric" ? weather.main.temp.toFixed(2) : ((weather.main.temp * 9/5) + 32).toFixed(2)} <span>{unit === "metric" ? "°C" : "°F"}</span></h1> */}
            <h3>Feels Like {weather.main.feels_like.toFixed(0)} <span>{unit === "metric" ? "°C" : "°F"}</span></h3>
            <div className="d-flex">
             <ArrowUp />
            <p>High {weather.main.temp_max.toFixed(2)}  &deg;{unit === "metric" ? "C" : "F"}</p>
            &nbsp; <span style={{ color: "#D4145A", fontWeight:"bold", fontSize:"30px"}}>|</span>&nbsp;<ArrowDown />
            <p>Low {weather.main.temp_min.toFixed(2)} &deg;{unit === "metric" ? "C" : "F"}</p>
          </div>
          </div>

          <div className="windstats d-flex">
            <Wind />
            <p>Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</p>
          </div>
          <div className="windstats d-flex">
            <p>Humidity {weather.main.humidity}</p>
            &nbsp; | &nbsp;
            <p>Pressure {weather.main.pressure}</p>
          </div>

        </div>
      }

      {!weather.weather && <div className="content">
        <h4>No Data found !</h4>
      </div>}
     <div className=' unitHandler '>
      <button onClick={toggleUnit} disabled={!weather.weather}>
      Switch to &#176;{unit === "metric" ? "F" : "C"}
      </button>
     </div>
     
    </div>
      <Chart city = {city} unit={unit} />
    </div>
  );
}

export default App;