import React, { useState, useEffect } from 'react';

import makeRequest from '../../../api/apiClient';
import { GET_MEMBERS } from '../../../api/queries';

function Band() {
  const [members, setMembers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      const res = await makeRequest({ query: GET_MEMBERS });
      setMembers(res.data.data.members);
      setLoading(false);
    }
    fetchMembers();
  }, []);

  return (
    <section className="Band">
      <h4 className="grey darken-4 grey-text text-lighten-4 z-depth-4">Band</h4>
      <div className="container">
        <div className="row">
          {isLoading ? (
            <h5>Loading...</h5>
          ) : (
            members.map(member => (
              <div className="col s12 m4" key={member._id}>
                <div className="card grey darken-4">
                  <div className="card-image">
                    <img className="responsive-img" src={member.image} alt="" />
                  </div>
                  <div className="card-content">
                    <p className="card-title grey-text text-lighten-4">{member.name}</p>
                    <p className="card-title grey-text text-lighten-4">{member.instrument}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Band;
