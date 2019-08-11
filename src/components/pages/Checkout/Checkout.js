import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min';

import './Checkout.css';
import makeRequest from '../../../api/apiClient';
import { GET_COUNTRIES, GET_CITIES, CREATE_ORDER } from '../../../api/queries';

const selectStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'transparent',
    borderColor: '#bdbdbd',
    '&:hover': { borderColor: '#424242' },
    boxShadow: 'none'
  }),
  option: styles => ({
    ...styles,
    backgroundColor: '#9e9e9e',
    color: '#FFF'
  })
};

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

function Checkout(props) {
  const { cart } = props;

  const [isLoading, setLoading] = useState(false);
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
    M.updateTextFields();
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

  useEffect(() => {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  });

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
      const elem = document.querySelector('.modal');
      const errorModal = M.Modal.getInstance(elem);
      errorModal.open();
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

  if (isLoading) {
    return <h5>Loading...</h5>;
  }

  return (
    <section className="checkout">
      <h4 className="grey darken-4 grey-text text-lighten-4 z-depth-4">Checkout</h4>
      <div className="container">
        <form className="row" onSubmit={handleSubmit}>
          {isLoading ? (
            <h5>Loading...</h5>
          ) : (
            <React.Fragment>
              <div className="modal">
                <div className="modal-content">
                  <h5>Please fill out all the fields</h5>
                </div>
                <div className="modal-footer">
                  <button type="button" className="modal-close btn btn-flat">
                    Ok
                  </button>
                </div>
              </div>
              <div className="input-field col s12 m6 offset-m3">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={customerInfo.fullName}
                  onChange={handleCustomerInfoChange}
                />
                <label htmlFor="fullName">Full Name</label>
              </div>
              <div className="input-field col s12 m6 offset-m3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleCustomerInfoChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="col s12 m6 offset-m3 input-field">
                <Select
                  value={customerInfo.country}
                  placeholder="Country"
                  onChange={handleCountryChange}
                  options={countries}
                  styles={selectStyles}
                />
              </div>
              <div className="col s12 m6 offset-m3 input-field">
                <Select
                  placeholder="City"
                  onChange={handleCityChange}
                  options={cities}
                  styles={selectStyles}
                />
              </div>
              <div className="input-field col s12 m6 offset-m3">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={customerInfo.address}
                  onChange={handleCustomerInfoChange}
                />
                <label htmlFor="address">Address</label>
              </div>
              <div className="input-field col s12 m6 offset-m3">
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  value={customerInfo.zipCode}
                  onChange={handleCustomerInfoChange}
                />
                <label htmlFor="zipCode">Zip Code</label>
              </div>
              <div className="input-field col s12 m6 offset-m3">
                <input
                  id="cellphone"
                  name="cellphone"
                  type="text"
                  value={customerInfo.cellphone}
                  onChange={handleCustomerInfoChange}
                />
                <label htmlFor="cellphone">Cellphone</label>
              </div>
              <div className="col s12">
                <button type="submit" className="btn btn-flat">
                  Pay with <i className="fab fa-paypal" />
                </button>
              </div>
            </React.Fragment>
          )}
        </form>
      </div>
    </section>
  );
}

Checkout.propTypes = {
  cart: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Checkout);
