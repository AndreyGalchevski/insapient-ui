import React, { useEffect } from 'react';

import { initSlider } from '../../../utils';

import './Home.css';

function Home() {
  useEffect(() => {
    initSlider('.swiper-container');
  }, []);

  return (
    <section className="home">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img
              src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1547663121/insapient/home/01.jpg"
              alt=""
            />
          </div>
          <div className="swiper-slide">
            <img
              src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1547663121/insapient/home/02.jpg"
              alt=""
            />
          </div>
          <div className="swiper-slide">
            <img
              src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1547663121/insapient/home/03.jpg"
              alt=""
            />
          </div>
          <div className="swiper-slide">
            <img
              src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1547663121/insapient/home/04.jpg"
              alt=""
            />
          </div>
          <div className="swiper-slide">
            <img
              src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1547663121/insapient/home/05.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="band-message">
          <p>
            Insapient brings cutting edge fresh sounding thrash metal infused with heavy grooves.
          </p>
          <p>
            This power trio from Israel comes out swinging with an unforgiving, bone-crushing and
            moshpit-forming wave of madness.
          </p>
          <p>The question is: are You sapient enough to realize that you are Insapient?</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
