import React, { useState, useEffect } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { v4 } from 'uuid';

import makeRequest from '../../../api/apiClient';
import { GET_MERCH } from '../../../api/queries';
import { useCartContext } from '../Cart/cartContext';
import { ADD_ITEM_TO_CART } from '../Cart/cartActionTypes';
import Loader from '../../common/Loader/Loader';
import Header from '../../common/Header/Header';
import Input from '../../common/Input/Input';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';

import './MerchDetails.css';

function MerchDetails(props) {
  const { match } = props;
  const [, dispatch] = useCartContext();
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
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

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

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
      setModalText('Please choose quantity');
      openModal();
      return;
    }

    if (
      (merchItem.stock.sizes && merchItem.stock.sizes[state.size] < state.quantity) ||
      merchItem.stock.total < state.quantity
    ) {
      setModalText('Not enough items in-stock');
      openModal();
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

    dispatch({ type: ADD_ITEM_TO_CART, payload: cartItem });
    setTimeout(() => {
      setModalText('The item has been added to your cart');
      openModal();
    }, 100);
  }

  return (
    <section className="merch-details">
      <Modal isOpen={isModalOpen} onClose={closeModal} contentLabel="Merch Details Modal">
        <h3>{modalText}</h3>
      </Modal>
      <Loader isLoading={isLoading}>
        <Header pageTitle={`${item.name} ${item.type}`} isMobileOnly={false} />
        <div className="merch-details-container">
          <img src={item.image} alt="" className="merch-details-image" />
          {item && item.stock && item.stock.sizes && (
            <div onChange={handleSizeChange(item.stock.sizes)}>
              <div className="size-input-container">
                {Object.keys(item.stock.sizes).map(key => (
                  <span className="size-checkbox">
                    <input
                      id="size"
                      name="size"
                      type="radio"
                      value={key}
                      disabled={item.type !== 'T-Shirt' || item.stock.sizes[key] === 0}
                    />
                    <span className="size-label">{key}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          <div>
            <Input
              type="number"
              name="quantity"
              value={state.quantity}
              disabled={item.type === 'T-Shirt' && state.size === ''}
              onChange={handleQuantityChange}
            />
          </div>
          <Button type="button" onClick={() => handleAddItemClick(item)} text="Add To Cart" />
        </div>
      </Loader>
    </section>
  );
}

MerchDetails.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
};

export default MerchDetails;
