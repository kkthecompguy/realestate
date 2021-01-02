import React from 'react';
import Navbar from '../components/Navbar';
import Alert from '../components/Alert';

const Layout = props => {
  return (
    <React.Fragment>
      <Navbar />
      <Alert />
      {props.children}
    </React.Fragment>
  );
}

export default Layout;