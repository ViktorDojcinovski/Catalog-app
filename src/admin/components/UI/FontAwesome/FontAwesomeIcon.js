import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FontAwesomeIco = props => {
  let styles = {
    color: '#222'
  };

  return <FontAwesomeIcon icon={props.icon} style={styles} />;
};

export default FontAwesomeIco;
