const Weather = (props) =>{
    const weatherInfo = props.weather.current
    const city = props.city
    return(
        <div className='weather'>
            <h4>Weather in {city}</h4>
            <p>Descriptions: {weatherInfo.weather_descriptions}</p>
            <img src={weatherInfo.weather_icons[0]} alt = 'weather of city'/>
            <p>Temperature: {weatherInfo.temperature}</p>
            <p>Wind: {weatherInfo.wind_speed}</p>
            <p>Humidity: {weatherInfo.humidity}</p>
        </div>
    )
}

export default Weather