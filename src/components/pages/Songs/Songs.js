import React, { useState, useEffect } from 'react';

import makeRequest from '../../../api/apiClient';

function Songs() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSongs() {
      setLoading(true);
      const GET_SONGS = `
        {
          songs {
            _id
            name
            url
          }
        }
      `;
      const res = await makeRequest({ query: GET_SONGS });
      setSongs(res.data.data.songs);
      setLoading(false);
    }
    fetchSongs();
  }, []);

  return (
    <section>
      <h4 className="grey darken-4 grey-text text-lighten-4 z-depth-4">Songs</h4>
      <div className="container">
        <div className="row">
          {isLoading ? (
            <h5>Loading...</h5>
          ) : (
            songs.map(song => (
              <div key={song._id} className="col s12 m6" style={{ marginBottom: '16px' }}>
                <iframe
                  title={song.name}
                  src={song.url}
                  width="300"
                  height="380"
                  frameBorder="0"
                  allowTransparency="true"
                  allow="encrypted-media"
                ></iframe>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Songs;

// https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/558742164&color=%23585858&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true
