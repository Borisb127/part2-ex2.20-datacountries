// Import components and services
import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import countryService from './services/country';


function App() {

  // State declarations
  const [country, setCountry] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [countryDisplay, setCountryDisplay] = useState(null);

  // Fetching initial data
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountry => setCountry(initialCountry));
  }, []);

   // Do not render anything if Country is still null
   if (!country) { 
    return null 
  }


  // Decide what to show based on filter
  const filterCountries = (filterValue) => {
    if (!filterValue) return setCountryDisplay(null);

    const filtered = country.filter(c => c.name.common.toLowerCase().includes(filterValue.toLowerCase()));
    
    // Display based on count
    if (filtered.length > 10) setCountryDisplay(<p>Too many matches, specify another filter</p>);
    else if (filtered.length === 1) setCountryDisplay(<CountryDetail country={filtered[0]} />);
    else if (filtered.length === 0) setCountryDisplay(<p>No matches</p>);
    else setCountryDisplay(<CountryList country={filtered} />);
  };



  // Event handlers
  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setCountryFilter(filterValue);
    filterCountries(filterValue);
  };
  
  
  return (
    <div>
      <Filter value={countryFilter} onChange={handleFilterChange} />
      {countryDisplay}
    </div>
  );
}

export default App;
