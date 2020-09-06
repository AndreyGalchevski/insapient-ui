import React, { useState, useEffect } from 'react';

import { fetchResources } from '../../../api/utils';
import Loader from '../../common/Loader/Loader';
import Header from '../../common/Header/Header';

import './Lyrics.css';

function Lyrics() {
  const [lyrics, setLyrics] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLyrics() {
      setLoading(true);
      const res = await fetchResources('lyrics');
      setLyrics(res.data);
      setLoading(false);
    }
    fetchLyrics();
  }, []);

  return (
    <section className="lyrics">
      <Loader isLoading={isLoading}>
        <Header pageTitle="Lyrics" />
        <div className="lyrics-container">
          {lyrics.map((lyric) => (
            <div key={lyric._id} className="lyric">
              <span>{lyric.name}</span>
              {lyric.text.split(/\n/).map((line) => (
                <div>
                  {line.includes('Verse') || line.includes('Chorus') ? (
                    <b>{line}</b>
                  ) : (
                    <p>{line}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Loader>
    </section>
  );
}

export default Lyrics;
