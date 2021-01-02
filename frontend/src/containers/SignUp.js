import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import { createMessage } from '../actions/messages';
import PropTypes from 'prop-types'
import {Link, Redirect} from 'react-router-dom';
import { Helmet } from 'react-helmet';


const Signup = ({ signup, isAuthenticated, createMessage}) => {
  const [formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const {name, email, password, password2} = formData;

  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== password2){
      createMessage({passwordNotmatch: "The passwords do not much"});
    } else {
      signup(name, email, password, password2)
    }
    
    if (isAuthenticated) return <Redirect to="/" />
  }
  return (
    <div className="auth">
      <Helmet>
        <title>Real Estate Sign Up</title>
        <meta name="description" content="real estate sign up page"/>
      </Helmet>
      <h1 className="auth__title">Sign Up</h1>
      <p className="auth__lead">Create an Account</p>
      <form onSubmit={handleSubmit} className=".auth__form">
        <div className="auth__form__group">
          <input
           type="text" 
           name="name" 
           id="name" 
           required
           value={name}
           placeholder="Name"
           onChange={e => handleChange(e)}
           className="auth__form__input"/>
        </div>
        <div className="auth__form__group">
          <input
           type="email" 
           name="email" 
           id="email" 
           required
           value={email}
           placeholder="Email"
           onChange={e => handleChange(e)}
           className="auth__form__input"/>
        </div>
        <div className="auth__form__group">
          <input
           type="password" 
           name="password" 
           id="password" 
           value={password}
           minLength="6"
           placeholder="Password"
           onChange={e => handleChange(e)}
           className="auth__form__input"/>
        </div>
        <div className="auth__form__group">
          <input
           type="password" 
           name="password2" 
           id="password2" 
           value={password2}
           minLength="6"
           placeholder="Confirm Password"
           onChange={e => handleChange(e)}
           className="auth__form__input"/>
        </div>
        <button type="submit" className="auth__form__button">Register</button>
      </form>
      <p className="auth__authtext">
        Already have an account? <Link to="/login" className="auth__authtext__link">Login</Link>
      </p>
    </div>
  );
}

Signup.propTypes = {
  isAuthenticated: PropTypes.bool,
  signup: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup, createMessage })(Signup);