import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import qs from 'query-string';

import * as cartActions from '../Cart/cartActions';
import makeRequest from '../../../api/apiClient';
import { UPDATE_ORDER } from '../../../api/queries';
import Loader from '../../common/Loader/Loader';

import './SuccessfulOrder.css';

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(cartActions, dispatch)
  };
}

function SuccessfulOrder(props) {
  const { location, clearCart } = props;

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
          await makeRequest({
            query: UPDATE_ORDER,
            variables: {
              order: updatedOrder
            }
          });
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    }

    finishOrder();
    clearCart();
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
  location: ReactRouterPropTypes.location.isRequired,
  clearCart: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(SuccessfulOrder);
