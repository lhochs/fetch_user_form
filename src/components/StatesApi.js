import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StatesApi(){
    const [state, setState] = useState([]);
    // let occupationNames = [];
    useEffect(()=>{
        axios
        .get("https://frontend-take-home.fetchrewards.com/form")
        .then((response) => {
            console.log(response.data.states);
            setState(response.data.states)
        })

    }, [])

    return(
        <div>
            <h1>
                List of Occupations:
            </h1>
            <ul>
                {
                state
                    .map(st=>
                    <li key={st.name}>{st.abbreviation}</li>
                    )
                }
            </ul>
            {/* <ul>
                {state["name"].map((job, index) => (
                <li key={index}>{job}</li>
                ))}
            </ul> */}
            
        </div>
    );
}



export default StatesApi