import React, { useState, useEffect } from 'react';

import './Gigs.css';
import makeRequest from '../../../api/apiClient';
import { GET_GIGS } from '../../../api/queries';
import { calculateGrid } from '../../../utils';

function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGigs() {
      setLoading(true);
      const res = await makeRequest({ query: GET_GIGS });
      setGigs(res.data.data.gigs);
      setLoading(false);
    }
    fetchGigs();
  }, []);

  return (
    <section>
      <h4 className="grey darken-4 grey-text text-lighten-4 z-depth-4">Gigs</h4>
      <div className="container">
        <div className="row">
          {isLoading ? (
            <h5>Loading...</h5>
          ) : (
            gigs.map(gig => (
              <div className={calculateGrid(gigs.length)} key={gig._id}>
                <div className="card">
                  <div className="card-image">
                    <img src={gig.image} alt="" />
                    <a
                      className="btn-floating halfway-fab waves-effect waves-light"
                      href={gig.fbEvent}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-square" />
                    </a>
                  </div>
                  <div className="card-content">
                    <p>{gig.date}</p>
                    <p>{gig.venue}</p>
                    <p>{gig.address}</p>
                    <p>Doors: {gig.hour}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Gigs;
