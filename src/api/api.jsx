// const apiKey = 'd234224b1ef578a8ff31d24d22f1c3a5';
const apiKey = '93fe5968bf60192b7d4520de88c21499';

// const secondURL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,wind_speed_10m&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_clear_sky_max,precipitation_sum,rain_sum&wind_speed_unit=kn'

// const apiKey = '123'

const getWeather = async (city, unit) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((json) => {
        return json;
    })
}



async function fetchWeatherDataThird(lat, lon, unit) {
     const new_unit = (unit === 'metric' ? 'celsius' : 'fahrenheit')
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_clear_sky_max,precipitation_sum,rain_sum&temperature_unit=${new_unit}&wind_speed_unit=kn`);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}


export  {getWeather, fetchWeatherDataThird};