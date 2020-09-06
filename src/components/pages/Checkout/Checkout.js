import React, { useState, useEffect } from 'react';

import { fetchResources, createResource } from '../../../api/utils';
import { useCartContext } from '../Cart/cartContext';
import Header from '../../common/Header/Header';
import Loader from '../../common/Loader/Loader';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';

import './Checkout.css';

function Checkout() {
  const [cart] = useCartContext();
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
    cellphone: '',
  });

  useEffect(() => {
    async function fetchUserLocation() {
      const response = await fetch('https://ipapi.co/json');
      const data = await response.json();
      setCustomerInfo({
        ...customerInfo,
        country: { value: data.country, label: data.country_name },
      });
    }

    fetchUserLocation();
  }, []);

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetchResources('countries');
      const countryOptions = res.data.data.countries.map((c) => ({
        label: c.name,
        value: c.code,
      }));
      setCountries(countryOptions);
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchCities(country) {
      const res = await fetchResources(`cities?country=${country}`);
      const cityOptions = res.data.map((c) => ({
        label: c.name,
        value: c._id,
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
      country: { value: selectedCountry.value, label: selectedCountry.label },
    });
  }

  function handleCityChange(selectedCity) {
    setCustomerInfo({
      ...customerInfo,
      city: { value: selectedCity.value, label: selectedCity.label },
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

    const items = cart.items.map((item) => ({
      name: `${item.name} ${item.type}`,
      sku: item.sku,
      price: item.price,
      size: item.size,
      currency: 'USD',
      quantity: item.quantity,
    }));

    const transaction = {
      item_list: {
        items,
      },
      amount: {
        currency: 'USD',
        total: cart.total,
      },
      description: 'Payment for official Insapient band merchandise',
    };
    const order = {
      transaction,
      customerInfo: {
        ...customerInfo,
        country: customerInfo.country.value,
        city: customerInfo.city.label,
      },
    };
    setLoading(true);
    const res = await createResource('orders', order);
    setLoading(false);
    window.open(res.data, '_self');
  }

  return (
    <section className="checkout">
      <Loader isLoading={isLoading}>
        <Header pageTitle="Checkout" isMobileOnly={false} />
        <Modal isOpen={isModalOpen} onClose={closeModal} contentLabel="Submission error modal">
          <h3>Please fill out all the fields</h3>
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
              <Select
                value={customerInfo.city}
                placeholder="City"
                onChange={handleCityChange}
                options={cities}
              />
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
            <Button text="Pay with PayPal" type="submit" />
          </form>
        </div>
      </Loader>
    </section>
  );
}

export default Checkout;
