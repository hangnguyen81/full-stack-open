import axios from "axios"
import { useState, useEffect } from "react"
import Weather from "./Weather"

const SingleCountry = (props) =>{
    const country = props.country
    const [weather, setWeather] = useState([])
    const city = country[0].capital

    useEffect(()=>{
        const fetchWeatherData = () => {
            const api_key = process.env.REACT_APP_API_KEY   
            axios
                .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
                .then(res => setWeather(res.data))
        }
        fetchWeatherData()
    },[])

    

    return(
        <div className='single-country'>
            <h3>{country[0].name}</h3>
            <div className='detail-country'>
                <img src={country[0].flag} alt='Flag of country'/>
                <div>
                    <p>Capital city: {country[0].capital}</p>
                    <p>Population: {country[0].population}</p>
                    <p>Region: {country[0].region}</p>
                    <p>Timezones: {country[0].timezones[0]}</p>
                    <p>Currencies:</p>
                    <ul>
                        {country[0].currencies.map(currency =>
                            <li key={currency.name}>{currency.name}</li>
                            )}
                    </ul>
                    <p>Langagues:</p>
                    <ul>
                        {country[0].languages.map(language =>
                            <li key={language.name}>{language.name}</li>
                            )}
                    </ul>
                    {weather.length !== 0? <Weather city={city} weather={weather} />:''}               

                </div>

            </div>

        </div>
    )
}

export default SingleCountry