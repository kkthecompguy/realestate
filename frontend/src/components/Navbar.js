import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';


const Navbar = ({ auth: { isAuthenticated, loading}, logout}) => {
  const authLinks = (
    <a className="navbar__top__auth__link" href="#!" onClick={logout}>Logout</a>
  );
  
  const guestLinks = (
    <React.Fragment>
      <Link className="navbar__top__auth__link" to="/login">Login</Link>
      <Link className="navbar__top__auth__link" to="/signup">Register</Link>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar__top">
          <div className="navbar__top__logo">
            <Link to="/" className="navbar__top__logo__link">Real Estate</Link>
          </div>
          <div className="navbar__top__auth">
            {!loading && isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
        <div className="navbar__bottom">
          <li className="navbar__bottom__item">
            <NavLink className="navbar__bottom__item__link" exact to="/" >Home</NavLink>
          </li>
          <li className="navbar__bottom__item">
            <NavLink className="navbar__bottom__item__link" exact to="/listings" >Listings</NavLink>
          </li>
          <li className="navbar__bottom__item">
            <NavLink className="navbar__bottom__item__link" exact to="/about" >About</NavLink>
          </li>
          <li className="navbar__bottom__item">
            <NavLink className="navbar__bottom__item__link" exact to="/contact" >Contact</NavLink>
          </li>
        </div>
      </nav>
    </React.Fragment>
  );
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);