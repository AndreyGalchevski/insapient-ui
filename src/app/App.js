import React, { Suspense, lazy } from 'react';
import { Route, withRouter } from 'react-router-dom';
import 'swiper/dist/css/swiper.min.css';

import './App.css';

import Navbar from '../components/layout/Navbar/Navbar';
// import Fab from '../components/layout/Fab/Fab';
import Footer from '../components/layout/Footer/Footer';
import Loader from '../components/common/Loader/Loader';

const Home = withRouter(lazy(() => import('../components/pages/Home/Home')));
const Band = withRouter(lazy(() => import('../components/pages/Band/Band')));
const Gigs = withRouter(lazy(() => import('../components/pages/Gigs/Gigs')));
const Lyrics = withRouter(lazy(() => import('../components/pages/Lyrics/Lyrics')));
const Songs = withRouter(lazy(() => import('../components/pages/Songs/Songs')));
const Videos = withRouter(lazy(() => import('../components/pages/Videos/Videos')));
const Merch = withRouter(lazy(() => import('../components/pages/Merch/Merch')));
const MerchDetails = withRouter(
  lazy(() => import('../components/pages/MerchDetails/MerchDetails'))
);
const Cart = withRouter(lazy(() => import('../components/pages/Cart/Cart')));
const Checkout = withRouter(lazy(() => import('../components/pages/Checkout/Checkout')));
const SuccessfulOrder = withRouter(
  lazy(() => import('../components/pages/SuccessfulOrder/SuccessfulOrder'))
);
const PrivacyPolicy = withRouter(
  lazy(() => import('../components/pages/PrivacyPolicy/PrivacyPolicy'))
);

function App() {
  return (
    <main className="App">
      <Suspense fallback={<Loader isLoading />}>
        <Navbar />
        {/* <Fab /> */}
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
      </Suspense>
    </main>
  );
}

export default App;
