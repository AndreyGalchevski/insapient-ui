import React, { useState, useEffect } from 'react';

import makeRequest from '../../../api/apiClient';
import Loader from '../../common/Loader/Loader';
import Header from '../../common/Header/Header';

import './Videos.css';

function Videos() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      const GET_VIDEOS = `
        {
          videos {
            _id
            name
            url
          }
        }
      `;
      const res = await makeRequest({ query: GET_VIDEOS });
      setVideos(res.data.data.videos);
      setLoading(false);
    }
    fetchVideos();
  }, []);

  return (
    <section className="videos">
      <Loader isLoading={isLoading}>
        <Header pageTitle="Videos" />
        <div className="videos-container">
          {videos.map(video => (
            <div className="video" key={video._id}>
              <iframe
                className="embed"
                title={video.name}
                src={video.url}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </Loader>
    </section>
  );
}

export default Videos;
