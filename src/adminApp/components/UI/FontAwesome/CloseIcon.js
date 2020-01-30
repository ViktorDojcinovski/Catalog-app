import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CloseIcon = props => {
  return (
    <div onClick={props.clicked}>
      <FontAwesomeIcon icon='window-close' />
    </div>
  );
};

export default CloseIcon;
