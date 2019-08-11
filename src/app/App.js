import React from 'react';
import { Route } from 'react-router-dom';
import 'swiper/dist/css/swiper.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

import Navbar from '../components/layout/Navbar/Navbar';
import Fab from '../components/layout/Fab/Fab';
import Footer from '../components/layout/Footer/Footer';
import Home from '../components/pages/Home/Home';
import Band from '../components/pages/Band/Band';
import Gigs from '../components/pages/Gigs/Gigs';
import Lyrics from '../components/pages/Lyrics/Lyrics';
import Songs from '../components/pages/Songs/Songs';
import Videos from '../components/pages/Videos/Videos';
import Merch from '../components/pages/Merch/Merch';
import MerchDetails from '../components/pages/MerchDetails/MerchDetails';
import Cart from '../components/pages/Cart/Cart';
import Checkout from '../components/pages/Checkout/Checkout';
import SuccessfulOrder from '../components/pages/SuccessfulOrder/SuccessfulOrder';
import PrivacyPolicy from '../components/pages/PrivacyPolicy/PrivacyPolicy';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Fab />
      <Route exact path="/" component={Home} />
      <Route exact path="/band" component={Band} />
      <Route exact path="/gigs" component={Gigs} />
      <Route exact path="/lyrics" component={Lyrics} />
      <Route exact path="/songs" component={Songs} />
      <Route exact path="/videos" component={Videos} />
      <Route exact path="/merch" component={Merch} />
      <Route exact path="/merch-details/:id" component={MerchDetails} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/successful-order" component={SuccessfulOrder} />
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      <Footer />
    </div>
  );
}

export default App;
