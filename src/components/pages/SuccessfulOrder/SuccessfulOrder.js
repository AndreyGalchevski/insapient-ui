import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import qs from 'query-string';

import { updateResource } from '../../../api/utils';
import { CLEAR_CART } from '../Cart/cartActionTypes';
import { useCartContext } from '../Cart/cartContext';
import Loader from '../../common/Loader/Loader';

import './SuccessfulOrder.css';

function SuccessfulOrder(props) {
  const { location } = props;

  const [, dispatch] = useCartContext();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function finishOrder() {
      const { paymentId, PayerID } = qs.parse(location.search);
      if (paymentId && PayerID) {
        setLoading(true);
        try {
          const updatedOrder = {
            status: 'paid',
            paymentId,
            payerId: PayerID
          };
          await updateResource('orders', updatedOrder.paymentId, updatedOrder);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    }

    finishOrder();
    dispatch({ type: CLEAR_CART });
  }, []);

  return (
    <section className="successful-order">
      <Loader isLoading={isLoading}>
        <div className="success-message">
          <h5>Thank You For Your Support</h5>
          <h4>Cheers!</h4>
          <Link to="/">Back To Main Page</Link>
        </div>
      </Loader>
    </section>
  );
}

SuccessfulOrder.propTypes = {
  location: ReactRouterPropTypes.location.isRequired
};

export default SuccessfulOrder;
