import { useState, useEffect } from "react";
import axios from 'axios';
import './css/FilterJobForm.css'

export default function FilterJobForm({fetchAPI, setData}) {
    const [filter, setFilter] = useState("")

    const handleFilter = async (e) => {
      if (e) e.preventDefault();
      if(!filter.trim()){ 
        fetchAPI(); 
        return;
      }
      try{
        const searchResults = await axios.get(`http://localhost:3001/api/filter/${filter}`);
        console.log(searchResults.data)
        setData(searchResults.data)
        return searchResults
      }catch(err){
        console.log(err)
      }
    }

    useEffect(() => {
        handleFilter();
    }, [filter]);

    return (
        <form onSubmit={handleFilter} className="search-form">
            <input className="search-input" placeholder="Enter company name" value={filter} onChange={(e) => setFilter(e.target.value)}/>
            <button type="submit" className="search-button">Search</button>
        </form>
    )
}