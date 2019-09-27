import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const closeIcon = props => (
  <div onClick={props.clicked}>
    <FontAwesomeIcon icon='window-close' />
  </div>
);

export default closeIcon;
