import axios from "axios"
import { useEffect, useState } from "react"

const Country = ({country}) => {

    const [weather, setWeather] = useState()
    const city = country.capital[0]
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
             .then(response => setWeather(response.data));
    }, [city, api_key])
    console.log(city)
    console.log(weather)
    
    return (
        <>
        <h2>{country.name.common}</h2>

        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>

        <h4>languages:</h4>
        <ul>
            {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt=""/>

        {weather ? 
                <><h2>Weather in {city}</h2><p>temperature is {weather.main.temp} Celsius</p><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weatherIcon" /><p>wind {weather.wind.speed} m/s</p></>
     : <></>}
        

        </>
    )
}

export default Country