import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout';
import Home from './containers/Home';
import About from './containers/About';
import Listing from './containers/Listings';
import ListingDetail from './containers/ListingDetail';
import Contact from './containers/Contact';
import Signup from './containers/SignUp';
import Login from './containers/Login';
import NotFound from './components/NotFound';
import PrivateRoute from './components/privateRoutes';
import './sass/main.scss';

const App = () => {
  return (
    <React.Fragment>
      <Router>
          <Layout>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/listings' component={Listing} />
              <PrivateRoute exact path='/listings/:slug' component={ListingDetail} />
              <Route exact path='/about' component={About} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
      </Router>
    </React.Fragment>
  );
}

export default App;
