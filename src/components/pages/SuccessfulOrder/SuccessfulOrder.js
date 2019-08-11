import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';

import './SuccessfulOrder.css';
import makeRequest from '../../../api/apiClient';
import { UPDATE_ORDER } from '../../../api/queries';

import * as cartActions from '../Cart/cartActions';

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
      <div className="container">
        <div className="row">
          {isLoading ? (
            <h5>Loading...</h5>
          ) : (
            <div className="col s12">
              <div className="success-message">
                <h5>Thank You For Your Support</h5>
                <h4>Cheers!</h4>
                <Link to="/" className="btn btn-flat">
                  Back To Main Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

SuccessfulOrder.propTypes = {
  location: PropTypes.object.isRequired,
  clearCart: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(SuccessfulOrder);
