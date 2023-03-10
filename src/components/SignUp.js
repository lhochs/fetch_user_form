import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SignUp = (props) => {
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
    <div className = "background">
        <form onSubmit = { createUser }>
            <div className="container-img">
                <div className="img">
                </div>
                <div className="container">
                    <h1>Register</h1>
                        {
                            hasBeenSubmitted ? 
                            <h5>Thank you for signing up!</h5> :
                            <h5>Please enter your details to sign up :)</h5>
                        }
                    <div className = "row mb-3">
                        <label className = "col-sm-3 col-form-label">Full Name: </label>
                        <div className="col-sm-9">
                            <input type = "text" className="form-control" onChange={ (e) => setName(e.target.value)}/> 
                        </div>
                    </div>
                    <div className = "row mb-3">
                        <label className = "col-sm-3 col-form-label">Email: </label>
                        <div className="col-sm-9">
                            <input type = "text" className="form-control" onChange={ (e) => setEmail(e.target.value)}/> 
                        </div>
                    </div>
                    <div className = "row mb-3">
                        <label className = "col-sm-3 col-form-label">Password: </label>
                        <div className="col-sm-9">
                            <input type = "text" className="form-control" onChange={ (e) => setPassword(e.target.value)}/> 
                        </div>
                    </div>
                    <div className = "row mb-3">
                        <label className = "col-sm-3 col-form-label">Occupation: </label>
                        <div className="col-sm-9">
                            <select className="form-select" onChange={ (e) => setOccupationUpdate(e.target.value)} >
                                <option>Select Occupation</option>
                                {occupation.map((job, index) => (
                                    <option key={index}>{job}</option>
                                    ))}
                            </select> 
                        </div>
                    </div>
                    <div className = "row mb-3">
                        <label className = "col-sm-3 col-form-label">State: </label>
                        <div className="col-sm-9">
                            <select className="form-select" onChange={ (e) => setStateUpdate(e.target.value)}>
                                <option>Select State</option>
                                {state.map((states) => (
                                    <option key={states.abbreviation}>{states.name}</option>
                                    ))}
                            </select> 
                        </div>
                    </div>
                    <div className="">
                        <input type="submit" value="Create User"/>
                    </div>
                </div>
            </div>
        </form>
    </div>
    );

}

export default SignUp;