import React, {useState} from 'react';
import {Link, Redirect } from 'react-router-dom';
import firebase from '../firebase';
import './Login.css';
import tweeterlogo from '../tweeter.svg';
import {useDispatch} from 'react-redux';
import {setHeaderVisibility } from '../actions';

const Login = (props) =>{
  const [toRedirect, setRedirect] = useState(false);
  const [formDetails, setFormDetails] = React.useState({username : '', password: ''});
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();

  // Ensure that the header is not visible when the user gets to this route
  dispatch(setHeaderVisibility(false))
  
  const handleFormChange = e => setFormDetails({...formDetails, [e.target.name] : e.target.value})

  const handleFormSubmission = e =>{
  	e.preventDefault();
  	firebase.auth().signInWithEmailAndPassword(formDetails.username, formDetails.password)
  	.then(user => {
  		setRedirect(true);
  	})
  	.catch(error => {
  		setError(error.message);
  	})
  }

  if(toRedirect){
    return <Redirect to = '/'/>
  }else
  return (
  	<form className = 'registrationForm' onSubmit = {handleFormSubmission} method = "POST">
      <div className = 'mx-auto text-center mb-4'>
        <img src = {tweeterlogo} alt = 'logo'/>
      </div>
      <h6 className = 'my-3 text-center faded'>Login to your account</h6>
      {error && <div className = 'small alert alert-danger text-center'>{error}</div>}
    <input type = 'text' value = {formDetails.username} className = 'form-control small' name = 'username' onChange = {handleFormChange} placeholder = "Username"/>
    <input type = 'password' value = {formDetails.password} className = 'form-control small' name = 'password' onChange = {handleFormChange} placeholder = "Password"/>
    <button className = 'mb-3 btn btn-block btn-primary' type = 'submit'>Register</button>
    <p className = 'faded small'>Don't have an account, create one <Link className = 'main' to = '/join'>here</Link></p>
     </form>
  )

}
export default Login
