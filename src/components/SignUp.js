import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SignUp = (props) => {
    const [ fullName, setFullName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ occupation, setOccupation ] = useState([]);
    const [ state, setState ] = useState([]);
    const [ hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
    
    useEffect(()=>{
        axios
        .get("https://frontend-take-home.fetchrewards.com/form")
        .then((response) => {
            setOccupation(response.data.occupations)
            setState(response.data.states)
        })

    }, [])

    const createUser = (e) => {
        e.preventDefault();

        const newUser = {
            fullName: fullName,
            email: email,
            password: password,
            occupation: occupation,
            state: state,
        };
        console.log("Welcome", newUser);
        setHasBeenSubmitted( true );
    };
    
    return (
    <form onSubmit = { createUser }>
        {
            hasBeenSubmitted ? 
            <h3>Thank you for submitting the form!</h3> :
            <h3>Welcome, please fill out and submit the form.</h3>
        }
        <div>
            <label>Full Name: </label>
            <input type = "text" onChange={ (e) => setFullName(e.target.value)}/> 
        </div>
        <div>
            <label>Email: </label>
            <input type = "text" onChange={ (e) => setEmail(e.target.value)}/> 
        </div>
        <div>
            <label>Password: </label>
            <input type = "text" onChange={ (e) => setPassword(e.target.value)}/> 
        </div>
        <div>
            <label>Occupation: </label>
            {/* <select id="occupation" onChange={ (e) => setOccupation(e.target.value)}> */}
            <select>
                {occupation.map((job, index) => (
                    <option key={index}>{job}</option>
                    ))}
            </select> 
        </div>
        <div>
            <label>State: </label>
            <select>
                {state.map((st) => (
                    <option key={st.name}>{st.abbreviation}</option>
                    ))}
            </select> 
            {/* <input type = "text" onChange={ (e) => setState(e.target.value)}/>  */}
        </div>
        <input type="submit" value="Create User"/>
    </form>
    );
}


export default SignUp;