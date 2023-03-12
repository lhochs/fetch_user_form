import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const FORM_INFO_URL = "https://frontend-take-home.fetchrewards.com/form"

const SignUp = (props) => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ occupation, setOccupation ] = useState([]);
    const [ occupationUpdate, setOccupationUpdate ] = useState("");
    const [ state, setState ] = useState([]);
    const [ stateUpdate, setStateUpdate ] = useState("");
    const [ hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

    // create axios get request to request data from given endpoint
    useEffect(()=>{
       populateFormData();
    }, [])

    // send axios post request to same endpoint if there are no errors
    const createUser = (e) => {
        e.preventDefault();
        submitFormData();
        e.target.reset();
    };

    async function populateFormData() {
        try {
        const response = await axios
        .get(FORM_INFO_URL);
        setOccupation(response.data.occupations);
        setState(response.data.states);
        } catch (e) {

           // Set error message in the form;
        }
    }
    
    async function submitFormData() {
        try {
            const res = await axios.post("https://frontend-take-home.fetchrewards.com/form", {
                name: name, 
                email: email,
                password: password,
                occupation: occupationUpdate,
                state: stateUpdate,
            });

             console.log(res);
                console.log(res.data);
                setHasBeenSubmitted( true );
        } catch (err) {
            console.log(err.response.data);
        }
    }

    return (
    <div className = "background">
        <form id = "newUser" onSubmit = { createUser }>
            <div className="container-img">
                <div className="img">
                </div>
                <div className="container">
                    <h1>Register</h1>
                        {
                            hasBeenSubmitted ? 
                            <h5 style={{color: "green"}}>Thank you for signing up!</h5> :
                            <h5 style={{color: "grey"}}>Please enter your details to sign up :)</h5>
                        }
                    <div className = "row mb-4">
                        <label className = "col-sm-5 col-form-label">Full Name: </label>
                        <div className="col-sm-7">
                            <input type = "text" className="form-control" placeholder="Lily Ochs" required onChange={ (e) => setName(e.target.value) }/> 
                        </div>
                    </div>
                    <div className = "row mb-4">
                        <label className = "col-sm-5 col-form-label">Email: </label>
                        <div className="col-sm-7">
                            <input type = "text" className="form-control" placeholder="lilyochs@yahoo.com" ref={register({
    required: "Required",
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "invalid email address"
    }
    })} required onChange={ (e) => setEmail(e.target.value)}/> 
                        </div>
                    </div>
                    <div className = "row mb-4">
                        <label className = "col-sm-5 col-form-label">Password: </label>
                        <div className="col-sm-7">
                            <input type = "password" className="form-control"  required onChange={ (e) => setPassword(e.target.value)}/> 
                        </div>
                    </div>
                    <div className = "row mb-4">
                        <label className = "col-sm-5 col-form-label">Occupation: </label>
                        <div className="col-sm-7">
                            <select className="form-select" defaultValue="Select Occupation" required onChange={ (e) => setOccupationUpdate(e.target.value)}>
                                <option value = "">Select Occupation</option>
                                {occupation.map((job, index) => (
                                    <option key={index}>{job}</option>
                                    ))}
                            </select> 
                        </div>
                    </div>
                    <div className = "row mb-4">
                        <label className = "col-sm-5 col-form-label">State: </label>
                        <div className="col-sm-7">
                            <select className="form-select" defaultValue="Select State" required onChange={ (e) => setStateUpdate(e.target.value) }>
                                <option value="">Select State</option>
                                {state.map((states) => (
                                    <option key={states.abbreviation}>{states.name}</option>
                                    ))}
                            </select> 
                        </div>
                    </div>
                    <p className = "required">These fields are required</p>
                    <div className="">
                        {
                            hasBeenSubmitted ? 
                            <input className="btn btn-secondary" onClick={() => window.location.reload(true)} value="Add a New User"/> :
                            <input className="btn btn-secondary" type="submit" value="Create User"/> 
                        }
                    </div>
                </div>
            </div>
        </form>
    </div>
    );

}

export default SignUp;