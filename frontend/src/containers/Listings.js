import React, {useState,  useEffect} from 'react';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import Card from '../components/Card';
import Pagination from '../components/Pagination';


const Listing = props => {
  const [listings, setListings] = useState([]);
  const [count, setCount] = useState(0);
  const [previous, setPrevious] = useState("");
  const [next, setNext] = useState("");
  const [active, setActive] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/listings/?page=1');

        setListings(res.data.results);
        setCount(res.data.count);
        setPrevious(res.data.previous);
        setNext(res.data.next);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const displayListings = () => {
    let display = [];
    let result = [];

    listings.map(listing => {
      return display.push(
        <Card
          title={listing.title}
          address={listing.address}
          city={listing.city}
          state={listing.state}
          price={listing.price}
          homeType={listing.home_type}
          saleType={listing.sale_type}
          bedrooms={listing.bedrooms}
          bathrooms={listing.bathrooms}
          sqft={listing.sqft}
          photoMain={listing.photo_main}
          slug={listing.slug}
        />
      )
    });

    for (let i = 0; i < listings.length; i += 3) {
      result.push(
        <div key={i} className="row">
          <div className="col-1-of-3">
            {display[i]}
          </div>
          <div className="col-1-of-3">
            {display[i + 1] ? display[i + 1]: null}
          </div>
          <div className="col-1-of-3">
            {display[i + 2] ? display[i + 2]: null}
          </div>
        </div>
      )
    }

    return result
  }

  const visitPage = page => {
    axios.get(`http://127.0.0.1:8000/api/listings/?page=${page}`)
    .then(res => {
      setListings(res.data.results);
      setPrevious(res.data.previous);
      setNext(res.data.next);
      setActive(page);
    })
    .catch(err => console.log(err));
  }

  const previousNumber = () => {
    axios.get(previous)
    .then(res => {
      setListings(res.data.results);
      setPrevious(res.data.previous);
      setNext(res.data.next);
      if (previous) {
        setActive(active -1);
      }
    })
    .catch(err => console.log(err));
  }

  const nextNumber = () => {
    axios.get(next)
    .then(res => {
      setListings(res.data.results);
      setPrevious(res.data.previous);
      setNext(res.data.next);
      if (next) {
        setActive(active +1);
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <main className="listings">
      <Helmet>
        <title>Real Estate - Listings</title>
        <meta name="description" content="Listings Page" />
      </Helmet>
      <section className="listings__listings">
        {displayListings()}
      </section>
      <section className="listings__pagination">
        <div className="row">
          <Pagination
            itemsPerPage={3}
            count={count}
            visitPage={visitPage}
            previous={previousNumber}
            next={nextNumber}
            active={active}
            setActive={setActive} 
          />
        </div>
      </section>
      <section className="listings__listings">
        {displayListings()}
      </section>
    </main>
  );
}
export default Listing;