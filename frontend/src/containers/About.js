import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import House from '../assests/images/house.jpg';

const About = () => {
  const [topSeller, setTopSeller] = useState([]);
  const [realtors, setRealtors] = useState([]);

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "application/json"
    }

    const getTopSeller = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/realtors/top-sellers/');
        setTopSeller(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTopSeller();
  }, []);

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "application/json"
    }

    const getRealtors = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/realtors/');
        setRealtors(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getRealtors();
  }, []);

  const getAllRealtors = () => {
    let allRealtors = [];
    let results = [];

    realtors.map(realtor => {
      return allRealtors.push(
        <Fragment key={realtor.id}>
          <div className="about__display">
            <img src={realtor.photo} alt="Realtor" className="about__display__image"/>
          </div>
          <h3 className="about__realtor">{realtor.name}</h3>
          <p className="about__contact">{realtor.phone}</p>
          <p className="about__contact">{realtor.email}</p>
          <p className="about__about">{realtor.description}</p>
        </Fragment>
      );
    });

    for (let i = 0; i < realtors.length; i += 3) {
      results.push(
        <div key={i} className="row">
          <div className="col-1-of-3">
            {allRealtors[i]}
          </div>
          <div className="col-1-of-3">
            {allRealtors[i + 1] ?  allRealtors[i + 1]: null}
          </div>
          <div className="col-1-of-3">
            {allRealtors[i + 2] ?  allRealtors[i + 2]: null}
          </div>
        </div>
      );
    }

    return results;
  };

  const getTopSeller = () => {
    let result = [];

    topSeller.map(seller => {
      return result.push(
        <Fragment key={seller.id} >
          <div className="about__display">
            <img src={seller.photo} alt="Realtor" className="about__display__image"/>
          </div>
          <h3 className="about__topseller">Top Seller:</h3>
          <p className="about__realtor">{seller.name}</p>
          <p className="about__contact">{seller.phone}</p>
          <p className="about__contact">{seller.email}</p>
          <p className="about__about">{seller.description}</p>
        </Fragment>
      );
    });

    return result;
  }

  return (
    <main className="about">
      <Helmet>
        <title>Real Estate - About</title>
        <meta name="description" content="About us" />
      </Helmet>
      <header className="about__header">
        <h1 className="about__heading">About Real Estate</h1>
      </header>
      <section className="about__Info">
        <div className="row">
          <div className="col-3-of-4">
            <h2 className="about__subheading">We find the perfect home for you</h2>
            <p className="about__paragraph">
            Integer eu mauris maximus, placerat lorem ut, iaculis risus. Etiam quis pulvinar metus, et dapibus quam. Suspendisse condimentum eros a venenatis sollicitudin. Aenean nec pellentesque ligula, eu convallis leo. Pellentesque ultricies nulla purus, vitae mattis felis mattis et. Nunc nec consequat lorem. Praesent sit amet commodo justo. Sed vel est vitae magna porta aliquam ac a odio. Mauris at dictum ligula, quis congue nisl. Curabitur blandit sem vel placerat tempor
            </p>
            <div className="about__display">
              <img src={House} alt="House" className="about__display__image"/>
            </div>
            <p className="about__paragraph">
            Integer eu mauris maximus, placerat lorem ut, iaculis risus. Etiam quis pulvinar metus, et dapibus quam. Suspendisse condimentum eros a venenatis sollicitudin. Aenean nec pellentesque ligula, eu convallis leo. Pellentesque ultricies nulla purus, vitae mattis felis mattis et. Nunc nec consequat lorem. Praesent sit amet commodo justo. Sed vel est vitae magna porta aliquam ac a odio. Mauris at dictum ligula, quis congue nisl. Curabitur blandit sem vel placerat tempor
            </p>
          </div>
          <div className="col-1-of-4">
            {getTopSeller()}
          </div>
        </div>
      </section>
      <section className="about__team">
        <div className="row">
          <h2 className="about__subheading">Meet our awesome Team</h2>
        </div>
        {getAllRealtors()}
      </section>
    </main>
  );
}

export default About;