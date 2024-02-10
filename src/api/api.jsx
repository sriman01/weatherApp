// const apiKey = 'd234224b1ef578a8ff31d24d22f1c3a5';
const apiKey = '93fe5968bf60192b7d4520de88c21499';

// const apiKey = '123'

const getWeather = async (city, unit) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((json) => {
        return json;
    })
}
const getWeatherSecond = async (city, unit) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((json) => {
        return json;
    })
}


/**  */

let city = 'ranchi'
let unit = 'metric'

async function fetchWeatherData(city, unit) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}


fetchWeatherData(city, unit)
    .then(data => {
        // console.log('Forecast Type Data:', data);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

fetchWeatherData('ranchi', 'metric')


export  {getWeather, getWeatherSecond, fetchWeatherData};