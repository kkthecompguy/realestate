import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { createMessage } from '../actions/messages';

const Contact = ({ createMessage }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const {name, email, subject, message} = formData;

  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = e => {
    e.preventDefault();

    axios.defaults.headers = {
      "Content-Type": "application/json"
    };

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

    const data = JSON.stringify({name, email, subject, message})


    setLoading(true);
    axios.post('http://127.0.0.1:8000/api/contacts/', data)
    .then(() => {
      createMessage({messageSent: 'You information is sent'})
      setLoading(false);
      window.scrollTo(0, 0);
    })
    .catch(err => {
      createMessage({notSent: 'Error occurred while sending'})
      setLoading(false);
      window.scrollTo(0, 0);
      console.log(err);
    });
  }

  return (
    <div className="contact">
      <Helmet>
        <title>Real Estate - Contact</title>
        <meta name="description" content="Contact Page" />
      </Helmet>
      <form onSubmit={handleSubmit} className="contact__form">
        <label htmlFor="name" className="contact__form__label">Name*</label>
        <input
         type="text" 
         name="name" 
         id="name" 
         placeholder="Full Name" 
         required 
         value={name}
         onChange={handleChange}
         className="contact__form__input"/>

        <label htmlFor="email" className="contact__form__label">Email*</label>
        <input
         type="email" 
         name="email" 
         id="email" 
         placeholder="example@gmail.com" 
         required 
         value={email}
         onChange={handleChange}
         className="contact__form__input"/>

        <label htmlFor="subject" className="contact__form__label">Subject*</label>
        <input
         type="text" 
         name="subject" 
         id="subject" 
         placeholder="Subject" 
         required 
         value={subject}
         onChange={handleChange}
         className="contact__form__input"/>

        <label htmlFor="message" className="contact__form__label">Message</label>
        <textarea name="message" id="message" value={message} onChange={handleChange} cols="30" rows="10" className="contact__form__textarea"></textarea>
        {
          loading ? 
          <div className="contact__form__loader">
            <Loader type="Oval" color="#424242" height={50} width={50} />
          </div> :
          <button type="submit" className="contact__form__button">Send</button>
        }
      </form>
    </div>
  );
}

Contact.propTypes = {
  createMessage: PropTypes.func.isRequired
}

export default connect(null, { createMessage })(Contact);