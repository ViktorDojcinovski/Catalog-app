import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CatalogAbstract } from './CatalogAbstract';

export const CatalogAbstractList = props => {
  return (
    <>
      <h3> {props.title} </h3>{' '}
      {props.catalogs
        ? props.catalogs.map(catalog => {
            return (
              <Link key={catalog._id} to={'/catalog/' + catalog._id}>
                <CatalogAbstract
                  name={catalog.name}
                  type={catalog.type}
                  image_folder={catalog.image_folder}
                  front_image={catalog.filesNames[0].image}
                  startDate={catalog.startDate}
                  endDate={catalog.endDate}
                />{' '}
              </Link>
            );
          })
        : null}{' '}
    </>
  );
};

CatalogAbstractList.propTypes = {
  title: PropTypes.string.isRequired,
  catalogs: PropTypes.array.isRequired
};
