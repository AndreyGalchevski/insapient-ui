import React from 'react';

import './Fab.css';

function Fab() {
  return (
    <div className="fixed-action-btn">
      <a className="btn-floating btn-large grey darken-2">
        <i className="large material-icons">insert_link</i>
      </a>
      <ul>
        <li>
          <a
            className="btn-floating"
            href="https://www.instagram.com/insapient.band"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram media-icon" />
          </a>
        </li>
        <li>
          <a
            className="btn-floating"
            href="https://www.facebook.com/insapient.band"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f media-icon" />
          </a>
        </li>
        <li>
          <a
            className="btn-floating"
            href="https://www.youtube.com/channel/UCnscHLfwxs-6kApOiHZMLMQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube media-icon" />
          </a>
        </li>
        <li>
          <a
            className="btn-floating"
            href="https://soundcloud.com/insapient"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-soundcloud media-icon" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Fab;
