import React, { useState, useEffect } from 'react';

import './Lyrics.css';
import makeRequest from '../../../api/apiClient';
import { GET_LYRICS } from '../../../api/queries';

function Lyrics() {
  const [lyrics, setLyrics] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLyrics() {
      setLoading(true);
      const res = await makeRequest({ query: GET_LYRICS });
      setLyrics(res.data.data.lyrics);
      setLoading(false);
    }
    fetchLyrics();
  }, []);

  return (
    <section className="Lyrics">
      <h4 className="grey darken-4 grey-text text-lighten-4 z-depth-4">Lyrics</h4>
      {isLoading ? (
        <h5>Loading...</h5>
      ) : (
        <div className="masonry">
          {lyrics.map(lyric => (
            <div key={lyric._id} className="item">
              <div className="card grey darken-4 grey-text text-lighten-4">
                <div className="card-content">
                  <span className="card-title">{lyric.name}</span>
                  {lyric.text.split(/\n/).map(line => (
                    <div>
                      {line.includes('Verse') || line.includes('Chorus') ? (
                        <b>{line}</b>
                      ) : (
                        <p>{line}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Lyrics;
