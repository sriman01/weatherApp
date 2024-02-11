import "./chart.css";
import { fetchWeatherDataThird } from "../../api/api.jsx";
import dateFormat from "dateformat";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";
import { useEffect, useState } from "react";



function Chart({ city, unit , coord}) {
  const [chartWidth, setChartWidth] = useState(400);
  const [data, setData] = useState([]);


  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth > 768 ? 400 : 350;
      setChartWidth(newWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const weatherData = await fetchWeatherData(city, unit);
  //       const { list } = weatherData;
        
  //       console.log(weatherData)
  //       // console.log(list[0].dt_txt)

  //       const newData = list?.slice(0, 2)?.concat(list?.slice(10, 11))?.concat(list?.slice(20, 21))?.concat(list?.slice(30, 31)).map((item) => ({
  //         name: getDayOfWeek(item.dt_txt),
  //         temp: item.main.temp,
  //         humidity: item.main.humidity,
  //         feels_like: item.main.feels_like,
  //       }));

  //       setData(newData);
  //     } catch (error) {
  //       console.error("Error fetching weather data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [city, unit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherDataThird(coord.lat, coord.lon, unit);
        const { daily } = weatherData;
  
        const newData = [];
  
        for (let i = 1; i < 6; i++) {
          const day_name = getDayOfWeek(daily.time[i]);
          const max_temp = daily.temperature_2m_max[i];
          const min_temp = daily.temperature_2m_min[i];
          const humidity = daily.precipitation_sum[i];
  
          // console.log("actual data", day_name, max_temp, min_temp, humidity);
  
          newData.push({ day_name, max_temp, min_temp, humidity });
        }
  
        setData(newData);
  
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
  
    fetchData();
  
  }, [coord.lat, coord.lon, unit]);
  


  function getDayOfWeek(dateString) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
}


  return (
    <div className="chart">
      <h1>Stats</h1>
      <div>
        <AreaChart
          width={chartWidth}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#953553" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#953553" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day_name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="max_temp"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="min_temp"
            stroke="#953553"
            fillOpacity={1}
            fill="url(#colorMv)"
          />
            <Area type="monotone" dataKey="humidity" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </div>
    </div>
  );
}

export default Chart;
