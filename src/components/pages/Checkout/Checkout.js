import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import makeRequest from '../../../api/apiClient';
import { GET_COUNTRIES, GET_CITIES, CREATE_ORDER } from '../../../api/queries';
import Header from '../../common/Header/Header';
import Loader from '../../common/Loader/Loader';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';
import Modal from '../../common/Modal/Modal';

import './Checkout.css';

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

function Checkout(props) {
  const { cart } = props;

  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    country: {},
    city: {},
    address: '',
    zipCode: '',
    cellphone: ''
  });

  useEffect(() => {
    async function fetchUserLocation() {
      const res = await axios.get('https://ipapi.co/json');
      setCustomerInfo({
        ...customerInfo,
        country: { value: res.data.country, label: res.data.country_name }
      });
    }

    fetchUserLocation();
  }, []);

  useEffect(() => {
    async function fetchCountries() {
      const res = await makeRequest({ query: GET_COUNTRIES });
      const countryOptions = res.data.data.countries.map(c => ({
        label: c.name,
        value: c.code
      }));
      setCountries(countryOptions);
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchCities(country) {
      const res = await makeRequest({
        query: GET_CITIES,
        variables: {
          country
        }
      });
      const cityOptions = res.data.data.cities.map(c => ({
        label: c.name,
        value: c._id
      }));
      setCities(cityOptions);
    }

    if (customerInfo.country.value) {
      fetchCities(customerInfo.country.value);
    }
  }, [customerInfo.country.value]);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleCustomerInfoChange(e) {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  }

  function handleCountryChange(selectedCountry) {
    setCustomerInfo({
      ...customerInfo,
      country: { value: selectedCountry.value, label: selectedCountry.label }
    });
  }

  function handleCityChange(selectedCity) {
    setCustomerInfo({
      ...customerInfo,
      city: { value: selectedCity.value, label: selectedCity.label }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !customerInfo.fullName ||
      !customerInfo.email ||
      !customerInfo.country ||
      !customerInfo.city ||
      !customerInfo.address ||
      !customerInfo.zipCode ||
      !customerInfo.cellphone
    ) {
      openModal();
      return;
    }

    const items = cart.items.map(item => ({
      name: `${item.name} ${item.type}`,
      sku: item.sku,
      price: item.price,
      size: item.size,
      currency: 'USD',
      quantity: item.quantity
    }));

    const transaction = {
      item_list: {
        items
      },
      amount: {
        currency: 'USD',
        total: cart.total
      },
      description: 'Payment for official Insapient band merchandise'
    };
    const order = {
      transaction,
      customerInfo: {
        ...customerInfo,
        country: customerInfo.country.value,
        city: customerInfo.city.label
      }
    };
    setLoading(true);
    const res = await makeRequest({
      query: CREATE_ORDER,
      variables: {
        order
      }
    });
    setLoading(false);
    window.open(res.data.data.createOrder, '_self');
  }

  return (
    <section className="checkout">
      <Loader isLoading={isLoading}>
        <Header pageTitle="Checkout" isMobileOnly={false} />
        <Modal isOpen={isModalOpen} onClose={closeModal} contentLabel="Submission error modal">
          <h5>Please fill out all the fields</h5>
          <button type="button" onClick={closeModal}>
            OK
          </button>
        </Modal>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <Input
                type="text"
                name="fullName"
                value={customerInfo.fullName}
                onChange={handleCustomerInfoChange}
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleCustomerInfoChange}
              />
            </div>
            <div>
              <Select
                value={customerInfo.country}
                placeholder="Country"
                onChange={handleCountryChange}
                options={countries}
              />
            </div>
            <div>
              <Select placeholder="City" onChange={handleCityChange} options={cities} />
            </div>
            <div>
              <Input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleCustomerInfoChange}
              />
            </div>
            <div>
              <Input
                type="text"
                name="zipCode"
                value={customerInfo.zipCode}
                onChange={handleCustomerInfoChange}
              />
            </div>
            <div>
              <Input
                name="cellphone"
                type="text"
                value={customerInfo.cellphone}
                onChange={handleCustomerInfoChange}
              />
            </div>
            <div>
              <button type="submit">
                Pay with <i className="fab fa-paypal" />
              </button>
            </div>
          </form>
        </div>
      </Loader>
    </section>
  );
}

Checkout.propTypes = {
  cart: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Checkout);
