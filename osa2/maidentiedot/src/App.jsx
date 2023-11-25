import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => {
  return (
    <div>
    Find countries <input value={value} onChange={onChange}/>
    </div>
  )
}

const LanguageList = ({languages}) => {
  var languageList = []
  for (var key in languages){
    languageList = languageList.concat(languages[key])
  }
  return (
    <ul>{
      languageList.map(language => {
        return (
          <li key={language}>{language}</li>
        )
      })
    }
    </ul>
  )
}

const WeatherInfo = ({weather}) => {
  if (weather) {
    return (
      <div>
        <h2>Weather in {weather.capital}:</h2>
        Temperature is {weather.temp} degrees Celsius <br />
        <img src={weather.icon}/> <br />
        Wind speed is {weather.wind} m/s
      </div>
    )
  }
}

const CountryInfo = ({country, weather}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      Capital: {country.capital[0]} <br />
      Area: {country.area}
      <div>
        <h3>Languages:</h3>
        <LanguageList languages={country.languages} />
      </div>
      <img src={country.flags['png']}/>
      <WeatherInfo weather={weather}/>
    </div>
  )
}


const CountryList = ({countries, buttonOnClickFunc, weather}) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  if (countries.length > 1) {   
    return (
      countries.map(country => {
        const name = country.name.common
        return (
          <div key={name}>
            {name}
            <button onClick={(e) => buttonOnClickFunc(name)}>Show</button>
          </div>
        )
      })
    )
  }
  if (countries.length == 1) {
    return (
      <CountryInfo country={countries[0]} weather={weather} />
    )
  }
  if (countries.length == 0) {
    return (
      <div>No matching countries</div>
    )
  }
}

const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [countryData, setCountryData] = useState([])
  const [currentCapital, setCurrentCapital] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    if (currentCapital) {
      const apiKey = import.meta.env.VITE_WEATHER_KEY
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${currentCapital}&appid=${apiKey}`)
           .then(response => response.data)
           .then(data => {
            const temp = data.main.temp - 273.15
            const weather = {
              capital: currentCapital,
              temp: (Math.round((temp * 10**2)) / 10**2),
              wind: data.wind.speed,
              description: data.weather[0].description,
              icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            }
            setWeatherData(weather)
           })
    }
  }, [currentCapital])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
         .then(response => response.data)
         .then(initCountryData => {
          setCountryData(initCountryData)
      })
  }, [])

  const filteredCountries = (filter) => {
    return countryData.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  }
  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
    const filtered = filteredCountries(event.target.value)
    if (filtered.length == 1) {
      setCurrentCapital(filtered[0].capital[0])
    }
  }
  
  const buttonOnClickFunc = (name) => {
    setCountryFilter(name)
  }

  return (
    <>
      <Filter value={countryFilter} onChange={handleFilterChange}/>
      <CountryList countries={filteredCountries(countryFilter)} 
                   buttonOnClickFunc={buttonOnClickFunc}
                   weather={weatherData}/>
    </>
  )
}

export default App
