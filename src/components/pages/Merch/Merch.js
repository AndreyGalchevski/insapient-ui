import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchResources } from '../../../api/utils';
import Loader from '../../common/Loader/Loader';
import Header from '../../common/Header/Header';
import HalfwayFab from '../../common/HalfwayFab/HalfwayFab';

import './Merch.css';

function Merch() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMerch() {
      setLoading(true);
      const res = await fetchResources('merchandises');
      setItems(res.data);
      setLoading(false);
    }
    fetchMerch();
  }, []);

  return (
    <section className="merches">
      <Loader isLoading={isLoading}>
        <Header pageTitle="Merch" />
        <div className="merches-container">
          {items.map((item) => (
            <div className="merch" key={item._id}>
              <img src={item.image} alt="" />
              <div className="merch-info">
                <HalfwayFab>
                  <Link to={`merch-details/${item._id}`}>
                    <i className="fas fa-ellipsis-h" />
                  </Link>
                </HalfwayFab>
                <p>{item.name}</p>
                <p>{item.type}</p>
                <p>{item.price} USD</p>
              </div>
            </div>
          ))}
        </div>
      </Loader>
    </section>
  );
}

export default Merch;
