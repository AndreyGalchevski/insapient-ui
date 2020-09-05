import React, { useState, useEffect } from 'react';

import { fetchResources } from '../../../api/utils';
import Loader from '../../common/Loader/Loader';
import Header from '../../common/Header/Header';

import './Band.css';

function Band() {
  const [members, setMembers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      const res = await fetchResources('members');
      setMembers(res.data);
      setLoading(false);
    }
    fetchMembers();
  }, []);

  return (
    <section className="band">
      <Loader isLoading={isLoading}>
        <Header pageTitle="Band" />
        <div className="members-container">
          {members.map(member => (
            <div className="member" key={member._id}>
              <img src={member.image} alt="" />
              <div className="member-info">
                <p>{member.name}</p>
                <p>{member.instrument}</p>
              </div>
            </div>
          ))}
        </div>
      </Loader>
    </section>
  );
}

export default Band;
