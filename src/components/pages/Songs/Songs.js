import React, { useState, useEffect } from 'react';

import { fetchResources } from '../../../api/utils';
import Loader from '../../common/Loader/Loader';
import Header from '../../common/Header/Header';

import './Songs.css';

function Songs() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSongs() {
      setLoading(true);
      const res = await fetchResources('songs');
      setSongs(res.data);
      setLoading(false);
    }
    fetchSongs();
  }, []);

  return (
    <section className="songs">
      <Loader isLoading={isLoading}>
        <Header pageTitle="Songs" />
        <div className="songs-container">
          {songs.map((song) => (
            <div className="song" key={song._id}>
              <iframe
                title={song.name}
                src={song.url}
                width="300"
                height="380"
                frameBorder="0"
                allowTransparency="true"
                allow="encrypted-media"
              />
            </div>
          ))}
        </div>
      </Loader>
    </section>
  );
}

export default Songs;
