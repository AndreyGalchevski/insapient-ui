import React, { useState, useEffect } from 'react';

import './Videos.css';
import makeRequest from '../../../api/apiClient';

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
    <section>
      <h4 className="grey darken-4 grey-text text-lighten-4 z-depth-4">Videos</h4>
      <div className="row">
        {isLoading ? (
          <h5>Loading...</h5>
        ) : (
          videos.map(video => (
            <div className="col s12 m6" v-for="video in videos" key={video._id}>
              <div className="video-container card">
                <iframe
                  className="card-content"
                  title={video.name}
                  src={video.url}
                  width="560"
                  height="315"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Videos;
