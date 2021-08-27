import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Footer from "./components/Footer";
import Header from "./components/Header";
import SearchBar from './components/SearchBar';
import ListCountries from './components/ListCountries';

function App() {
  const [Countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [informText, setInformText] = useState('')

  // fetch data
  const fetchData = () =>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }
  useEffect(fetchData,[])

  const handleSearchChange = event =>{
    const searchQuery = event.target.value.toLowerCase()
    const filtered = Countries.filter(country =>{
      const countryName = country.name.toLowerCase()
      return countryName.includes(searchQuery)
    })
    if (filtered.length > 10){
        setInformText('Too many matches, please provide more specified search')
        setFilteredCountries([])
    }else {
      setInformText('')
      setFilteredCountries(filtered)
    }
  }

  return (
    <div className="page-container">
      <Header />
      <main>
        <div className='search-section'>          
          <SearchBar onChange={handleSearchChange} informText={informText}/>
          <ListCountries countries = {filteredCountries}/>
        </div>   
      </main>
      <Footer />
    </div>
  );
}

export default App;
