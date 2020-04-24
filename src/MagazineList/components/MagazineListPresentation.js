import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { MagazineAbstract } from './MagazineAbstract';

import './MagazineListPresentation.scss';

const MagazineListPresentation = props => {
  return (
    <section className='main'>
      <div className='bodyWrapper'>
        <div className='listWrapper'>
          <h3> Magazines </h3>
          {props.partners.map(partner => {
            return (
              <Link key={partner.email} to={'/magazine/' + partner._id}>
                <MagazineAbstract partner={partner} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

MagazineListPresentation.propTypes = {
  partners: PropTypes.array
};

export default MagazineListPresentation;
