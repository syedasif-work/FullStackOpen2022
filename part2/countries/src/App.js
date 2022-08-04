import { useEffect, useState } from "react"
import axios from 'axios'
import Country from "./components/Country";

const App = () => {

  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([])
  const [countryToShow, setCountryToShow] = useState()

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(response => setCountries(response.data))
  }, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
    setCountryToShow(undefined)
  }

  const handleShow = (country) => {
    setCountryToShow(country)
  }
  
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  console.log(countryToShow)
  return (
    <>
    find countries <input value={filter} onChange={handleChange}/>
    <div>
    {countriesToShow.length > 10 ? `Too many matches, specify another filter` : 
    countriesToShow.length > 1 ? countriesToShow.map(country => <div key={country.name.official}>{country.name.common}<button onClick={() => handleShow(country)}>show</button></div>) : 
    countriesToShow.length === 1 ? <Country country={countriesToShow[0]}/> : <></>}
    </div>
    {countryToShow? <Country country={countryToShow}/>: <></>}
    </>
  )
}

export default App