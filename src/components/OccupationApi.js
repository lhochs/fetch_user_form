import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OccupationApi(){
    const [occupation, setOccupation] = useState([]);
    // let occupationNames = [];
    useEffect(()=>{
        axios
        .get("https://frontend-take-home.fetchrewards.com/form")
        .then((response) => {
            setOccupation(response.data.occupations)
        })

    }, [])

    return(
        <div>
            <h1>
                List of Occupations:
            </h1>
            <ul>
                {occupation.map((job, index) => (
                <li key={index}>{job}</li>
                ))}
            </ul>
            
        </div>
    );
}



export default OccupationApi