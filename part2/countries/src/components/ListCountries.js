import { useState } from "react"
import SingleCountry from "./SingleCountry"

const ListCountries = (props) =>{
    const countries = props.countries
    const [selectedCountry, setSelectedCountry] = useState([])

    const handleClick = event =>{
        const result = countries.filter(country => country.alpha2Code === event.target.value)
        setSelectedCountry(result)
    
    }
    //console.log(selectedCountry) 
    if (countries.length === 1){
        return(
            <SingleCountry country={countries}/>
        )
    }else{
        return(
            <div className='list-countries'>
                <table>
                    <tbody>
                        {countries.map(country =>
                            <tr key = {country.alpha2Code}>
                                <td>{country.name}</td>
                                <td><button 
                                        onClick={handleClick} 
                                        value={country.alpha2Code}>
                                    Show detail
                                    </button>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>
                    { selectedCountry.length !== 0 ? <SingleCountry country={selectedCountry}/> :''}
            </div>
        )}
}

export default ListCountries