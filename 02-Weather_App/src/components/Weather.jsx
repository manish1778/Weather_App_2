import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import search_icon from "../images/search.png"
import cloud_icon from "../images/1cloud.png"
import drizzle_icon from "../images/1drizzle.png"
import rain_icon from "../images/1rain.png"
import humidity_icon from "../images/2humidity.png"
import wind_icon from "../images/1wind.png"
import snow_icon from "../images/1snow.png"
import clear_icon from "../images/1clear.png"

const Weather = () => {
  const inputRef = useRef();
  const [weatherData,setWeatherData]=useState(false);


  const allIcons={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,
    

  }


  // const Unique Id="e9a6855ed232d563e114c75004106397"
  const search = async(city)=>{
    if(city===""){
      alert("Please Enter city name");
      return;
    }


    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"e9a6855ed232d563e114c75004106397"}`;
      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      const icon=allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon:icon,
      })

    } catch(error){
      setWeatherData(false);
      console.error("Error in fetching weather data");

    }
  } 
 useEffect(()=>{
  search("Delhi");
// eslint-disable-next-line
},[])

  return (
    <div className="weather">
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Enter City Name" />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
        </div>

        {weatherData?<>

          <img src={weatherData.icon} alt="Transparent" className="weather-icon" />
        <p className='temperature'>{weatherData.temperature}&deg;C
        </p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} km/hr</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>

        </>:<></>}
        
    </div>
  )
}

export default Weather