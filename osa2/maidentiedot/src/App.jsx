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

const CountryInfo = ({country}) => {
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
    </div>
  )
}

const CountryList = ({countries}) => {
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
          <div key={name}>{name}</div>
        )
      })
    )
  }
  if (countries.length == 1) {
    return (
      <CountryInfo country={countries[0]} />
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

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
         .then(response => response.data)
         .then(initCountryData => {
          setCountryData(initCountryData)
      })
  }, [])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const filteredCountries = countryData.filter((country) => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
  

  return (
    <>
      <Filter value={countryFilter} onChange={handleFilterChange}/>
      <CountryList countries={filteredCountries}/>
    </>
  )
}

export default App
