import "./App.css";
import { useEffect, useState } from "react";
import search_icon from "./assets/search.png";
import rain_icon from "./assets/rain.png";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png";
import humidity_icon from "./assets/humidity.png";

async function getWeatherData(BASE_URL){
  let response= await fetch(BASE_URL)
  let data= await response.json();
  return data;
}

const getWeatherIcon=(data)=>{
switch(data.weather[0].main.toLowerCase()){
  case"rain":
   return rain_icon;
  case"clear":
   return clear_icon;
  case"clouds":
   return cloud_icon;
  case"drizzle":
   return drizzle_icon;
  case "snow":
   return snow_icon;
}
}

function App() {
  const [location, setLocation] = useState('Mumbai');
  const[data,setData]=useState({});
  const[weatherIcon,setWeatherIcon]=useState(clear_icon);

  const API_KEY = '2a19a485a7faa04d9c10082e1d9b7725';
  const BASE_URL =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

useEffect(()=>{
  getWeatherData(BASE_URL).then((d)=>{
    setData(d)
    console.log(data)
    let icon=getWeatherIcon(data);
    setWeatherIcon(icon);
      })
},[location]);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" 
        value={location} id="" 
        placeholder="Search"
        onChange={(event)=>{
          setLocation(event.target.value)
          console.log(location)
        }}
        />
     
      </div>
      <div className="align">
        <img src={weatherIcon} 
        alt="clear" 
        className="weather-icon" />
        <div className="content">
          <p className="temperature">{Math.round(data.main?.temp-273.15)}</p>
          <p className="location">{data.name}</p>
        </div>
      </div>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>91 %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind" />
          <div>
            <p>3.6Km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;