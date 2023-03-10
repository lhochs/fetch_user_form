import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestApp = (props) => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ occupation, setOccupation ] = useState([]);
    const [ occupationUpdate, setOccupationUpdate ] = useState("")
    const [ state, setState ] = useState([]);
    const [ stateUpdate, setStateUpdate ] = useState("")
    // const [errors, setErrors] = useState({});
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
        axios.post("https://frontend-take-home.fetchrewards.com/form", {
            name: name, 
            email: email,
            password: password,
            occupation: occupationUpdate,
            state: stateUpdate,
        })
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setHasBeenSubmitted( true );
            })
            .catch(err => {
                console.log(err.response.data);
            });
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
            <input type = "text" onChange={ (e) => setName(e.target.value)}/> 
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
            <select onChange={ (e) => setOccupationUpdate(e.target.value)} >
                {occupation.map((job, index) => (
                    <option key={index}>{job}</option>
                    ))}
            </select> 
        </div>
        <div>
            <label>State: </label>
            <select onChange={ (e) => setStateUpdate(e.target.value)}>
                {state.map((states) => (
                    <option key={states.name}>{states.abbreviation}</option>
                    ))}
            </select> 
        </div>
        <input type="submit" value="Create User"/>
    </form>
    );

}

export default TestApp;