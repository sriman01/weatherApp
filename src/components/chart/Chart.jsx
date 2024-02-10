import "./chart.css";
import { getWeatherSecond } from "../../api/api.jsx";
import dateFormat from "dateformat";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";
import { useEffect, useState } from "react";



function Chart({ city, unit }) {
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

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await getWeatherSecond(city, unit);
        const { list } = weatherData;

        const newData = list?.slice(0, 5)?.map((item) => ({
          name: renderDate(item.dt),
          temp: item.main.temp,
          humidity: item.main.humidity,
          feels_like: item.main.feels_like,
        }));

        setData(newData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [city, unit]);

  const renderDate = (dt) => {
    return dateFormat(dt, "h:MM");
  };

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
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
            <Area type="monotone" dataKey="humidity" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </div>
    </div>
  );
}

export default Chart;
