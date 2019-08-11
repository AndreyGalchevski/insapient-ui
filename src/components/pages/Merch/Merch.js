import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Merch.css';
import makeRequest from '../../../api/apiClient';
import { GET_MERCHES } from '../../../api/queries';

function Merch() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMerch() {
      setLoading(true);
      const res = await makeRequest({ query: GET_MERCHES });
      setItems(res.data.data.merches);
      setLoading(false);
    }
    fetchMerch();
  }, []);

  return (
    <section className="merch">
      <h4 className="grey darken-4 grey-text text-lighten-4 z-depth-4">Merch</h4>
      <div className="container">
        <div className="row">
          {isLoading ? (
            <h5>Loading...</h5>
          ) : (
            items.map(item => (
              <div className="col s12 m4" key={item._id}>
                <div className="card">
                  <div className="card-image">
                    <img src={item.image} alt="" className="responsive-img" />
                    <Link
                      to={`merch-details/${item._id}`}
                      className="btn-floating halfway-fab waves-effect waves-light grey darken-2"
                    >
                      <i className="material-icons">more</i>
                    </Link>
                  </div>
                  <div className="card-content">
                    <p>{item.name}</p>
                    <p>{item.type}</p>
                    <p>{item.price} USD</p>
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

export default Merch;
