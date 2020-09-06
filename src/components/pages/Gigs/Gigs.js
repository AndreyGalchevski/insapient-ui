import React, { useState, useEffect } from 'react';

import { fetchResources } from '../../../api/utils';
import Loader from '../../common/Loader/Loader';
import Header from '../../common/Header/Header';
import HalfwayFab from '../../common/HalfwayFab/HalfwayFab';

import './Gigs.css';

function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGigs() {
      setLoading(true);
      const res = await fetchResources('gigs');
      setGigs(res.data);
      setLoading(false);
    }
    fetchGigs();
  }, []);

  return (
    <section className="gigs">
      <Loader isLoading={isLoading}>
        <Header pageTitle="Gigs" />
        <div className="gigs-container">
          <div className="row">
            {gigs.map((gig) => (
              <div className="gig" key={gig._id}>
                <img src={gig.image} alt="" />
                <div className="gig-info">
                  <HalfwayFab>
                    <a href={gig.fbEvent} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-square" />
                    </a>
                  </HalfwayFab>
                  <p>{gig.date}</p>
                  <p>{gig.venue}</p>
                  <p>{gig.address}</p>
                  <p>Doors: {gig.hour}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Loader>
    </section>
  );
}

export default Gigs;
