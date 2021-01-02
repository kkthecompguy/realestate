import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Redirect, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types'


const Login = ({isAuthenticated, login}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  }

  if (isAuthenticated) return <Redirect to="/" />

  return (
    <div className="auth">
      <Helmet>
        <title>Real Estate - Login</title>
        <meta name="description" content="real estate login" />
      </Helmet>
      <h1 className="auth__title">Sign In</h1>
      <p className="auth__lead">Sign into your Account</p>
      <form className="auth_form" onSubmit={handleSubmit}>
        <div className="auth__form__group">
          <input
           type="email" 
           name="email" 
           id="email" 
           value={email}
           required
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
        <button type="submit" className="auth__form__button">Login</button>
      </form>
      <p className="auth__authtext">
        Don't have an account? <Link to="/signup" className="auth__authtext__link">Sign Up</Link>
      </p>
    </div>
  );
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);