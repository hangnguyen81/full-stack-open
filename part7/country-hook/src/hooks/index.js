import {useState, useEffect} from "react";
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }

  export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    const [found, setFound] = useState(false);

    const fetchCountry = async() =>{
        if (name !== ''){
            const apiUrl = `https://restcountries.com/v2/name/${name}?fullText=true`;
            const res = await axios.get(apiUrl);
            const status = await res.data.status;
            if(status === 404){
                setCountry('Not Found')
                setFound(false)
            }
            else {
                setCountry(res.data[0]);
                setFound(true);
            } 
        }
    };

    useEffect(()=>{
        fetchCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[name])

    return {data: country, found}
  }