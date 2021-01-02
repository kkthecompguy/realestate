import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const CustomForm = props => {
  const [formData, setFormData] = useState({
    sale_type : 'For Sale',
    price: '$0+',
    bedrooms: '0+',
    home_type: 'House',
    bathrooms: '0+',
    sqft: '1000+',
    days_listed: '1 or less',
    has_photos: '1+',
    open_house: 'false',
    keywords: ''
  });

  const {sale_type, price, bedrooms, home_type, bathrooms, sqft, days_listed, has_photos, open_house, keywords} = formData;

  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = e => {
    e.preventDefault();

    axios.defaults.headers = {
      "Content-Type": "application/json"
    };


    setLoading(true);
    axios.post('http://127.0.0.1:8000/api/listings/search/', {sale_type, price, bedrooms, home_type, bathrooms, sqft, days_listed, has_photos, open_house, keywords})
    .then(res => {
      setLoading(false);
      props.setListings(res.data);
      window.scrollTo(0, 0);
    })
    .catch(err => {
      setLoading(false);
      window.scrollTo(0, 0);
    })
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="listingform">
        <div className="row">
          <div className="col-1-of-6">
            <div className="listingform__section">
              <label htmlFor="sale_type" className="listingform__label">Sale or Rent</label>
              <select name="sale_type" id="sale_type" className="listingform__select" onChange={handleChange} value={sale_type}>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>
            <div className="listingform__section">
              <label htmlFor="sqft" className="listingform__label">Sqft</label>
              <select name="sqft" id="sqft" className="listingform__select" onChange={handleChange} value={sqft}>
                <option>1000+</option>
                <option>1200+</option>
                <option>1500+</option>
                <option>2000+</option>
                <option>Any</option>
              </select>
            </div>
          </div>
          
          <div className="col-1-of-6">
            <div className="listingform__section">
              <label htmlFor="price" className="listingform__label">Minimum Price</label>
              <select name="price" id="price" className="listingform__select" onChange={handleChange} value={price}>
                <option>$0+</option>
                <option>$200,000+</option>
                <option>$400,000+</option>
                <option>$600,000+</option>
                <option>$800,000+</option>
                <option>$1,000,000+</option>
                <option>$1,200,000+</option>
                <option>$1,500,000+</option>
                <option>Any</option>
              </select>
            </div>
            <div className="listingform__section">
              <label htmlFor="days_listed" className="listingform__label">Days Listed</label>
              <select name="days_listed" id="days_listed" className="listingform__select" onChange={handleChange} value={days_listed}>
                <option>1 or less</option>
                <option>2 or less</option>
                <option>5 or less</option>
                <option>10 or less</option>
                <option>20 or less</option>
                <option>Any</option>
              </select>
            </div>
          </div>

          <div className="col-1-of-6">
            <div className="listingform__section">
              <label htmlFor="bedrooms" className="listingform__label">Bedrooms</label>
              <select name="bedrooms" id="bedrooms" className="listingform__select" onChange={handleChange} value={bedrooms}>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
                <option>5+</option>
              </select>
            </div>
            <div className="listingform__section">
              <label htmlFor="has_photos" className="listingform__label">Has Photos</label>
              <select name="has_photos" id="has_photos" className="listingform__select" onChange={handleChange} value={has_photos}>
                <option>1+</option>
                <option>3+</option>
                <option>5+</option>
                <option>10+</option>
                <option>15+</option>
              </select>
            </div>
          </div>

          <div className="col-1-of-6">
            <div className="listingform__section">
              <label htmlFor="home_type" className="listingform__label">Home Type</label>
              <select name="home_type" id="home_type" className="listingform__select" onChange={handleChange} value={home_type}>
                <option>House</option>
                <option>Condo</option>
                <option>Townhouse</option>
              </select>
            </div>
            <div className="listingform__section">
              <label htmlFor="keywords" className="listingform__label">Keywords</label>
              <input
              type="text" 
              name="keywords" 
              id="keywords"
              value={keywords}
              onChange={handleChange}  
              className="listingform__input"/>
            </div>
          </div>

          <div className="col-1-of-6">
            <div className="listingform__section">
              <label htmlFor="bathrooms" className="listingform__label">Baths</label>
              <select name="bathrooms" id="bathrooms" className="listingform__select" onChange={handleChange} value={bathrooms}>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
              </select>
            </div>
            <div className="listingform__altsection">
              <label htmlFor="open_house" className="listingform__label">Open House</label>
              <input
              type="checkbox" 
              name="open_house" 
              id="open_house"
              value={open_house}
              onChange={handleChange}  
              className="listingform__checkbox"/>
            </div>
          </div>

          <div className="col-1-of-6">
            {
              loading ? 
              <div className="listingform__loader">
                <Loader type="Oval" color="#424242" height={50} width={50} />
              </div> :
              <button type="submit" className="listingform__button listing__button__primary">Save</button>
            }
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

CustomForm.propTypes = {
  setListings: PropTypes.func.isRequired
}

export default CustomForm;