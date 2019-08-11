import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

import makeRequest from '../../../api/apiClient';
import { GET_MERCH } from '../../../api/queries';
import { openModal } from '../../../utils';
import * as cartActions from '../Cart/cartActions';
import Modal from '../../common/Modal/Modal';

import './MerchDetails.css';

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(cartActions, dispatch)
  };
}

function MerchDetails(props) {
  const { match, addItemToCart } = props;

  const [isLoading, setLoading] = useState(false);
  const [item, setItem] = useState({});
  const [state, setState] = useState({
    size: '',
    quantity: ''
  });

  useEffect(() => {
    async function fetchMerchDetails(id) {
      setLoading(true);
      try {
        const res = await makeRequest({
          query: GET_MERCH,
          variables: { merchId: id }
        });
        setItem(res.data.data.merch);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchMerchDetails(match.params.id);
  }, []);

  function handleSizeChange(param) {
    return function(e) {
      const { value } = e.target;
      const selectedQuantityEl = document.getElementById('quantity');
      selectedQuantityEl.disabled = false;
      selectedQuantityEl.setAttribute('max', param[value]);
      setState({ ...state, size: value });
    };
  }

  function handleQuantityChange(e) {
    const { value } = e.target;
    setState({ ...state, quantity: value });
  }

  function handleAddItemClick(merchItem) {
    if (!state.quantity) {
      openModal('#validation-error-modal');
      return;
    }

    if (
      (merchItem.stock.sizes && merchItem.stock.sizes[state.size] < state.quantity) ||
      merchItem.stock.total < state.quantity
    ) {
      openModal('#stock-error-modal');
      return;
    }

    const cartItem = {
      id: v4(),
      name: merchItem.name,
      sku: merchItem._id,
      type: merchItem.type,
      price: Number(merchItem.price),
      size: state.size || '',
      quantity: Number(state.quantity)
    };

    addItemToCart(cartItem);
    setTimeout(() => {
      openModal('#add-to-cart-success-modal');
    }, 100);
  }

  return (
    <section className="merch-details">
      <Modal id="stock-error-modal" text="Not enough items in-stock" />
      <Modal id="validation-error-modal" text="Please choose quantity" />
      <Modal id="add-to-cart-success-modal" text="The item has been added to your cart" />
      <h4 className="grey darken-4 grey-text text-lighten-4 z-depth-4">
        {item.name} {item.type}
      </h4>
      <div className="container">
        <div className="row">
          {isLoading ? (
            <h5>Loading...</h5>
          ) : (
            <div className="row">
              <div>
                <img src={item.image} alt="" className="responsive-img" width="300" height="350" />
              </div>
              {item && item.stock && item.stock.sizes && (
                <div className="col s12" onChange={handleSizeChange(item.stock.sizes)}>
                  <h6>Size</h6>
                  <div className="size-input">
                    {Object.keys(item.stock.sizes).map(key => (
                      <label className="size-checkbox">
                        <input
                          id="size"
                          name="size"
                          type="radio"
                          value={key}
                          disabled={item.type !== 'T-Shirt' || item.stock.sizes[key] === 0}
                        />
                        <span className="size-label">{key}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="col m2 offset-m5 s6 offset-s3">
                <h6>Quantity</h6>
                <div className="input-field">
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    className="validate"
                    value={state.quantity}
                    min="1"
                    max={
                      item && item.stock && item.stock.sizes
                        ? item.stock.sizes[state.size]
                        : item && item.stock && item.stock.total
                    }
                    disabled={item.type === 'T-Shirt' && state.size === ''}
                    onChange={handleQuantityChange}
                  />
                  <span
                    id="quantity-error"
                    className="helper-text"
                    data-error="Not Enough In Stock"
                  />
                </div>
              </div>
              <div className="col s12">
                <button
                  type="button"
                  className="modal-close btn btn-flat"
                  onClick={() => handleAddItemClick(item)}
                >
                  <i className="fa fa-cart-plus" />
                  Add To Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(MerchDetails);
