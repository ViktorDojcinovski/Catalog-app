import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SocialMediaIcon = props => {
  return (
    <span>
      <a href={props.url} target='blank'>
        <FontAwesomeIcon icon={props.icon} size='2x' />
      </a>{' '}
    </span>
  );
};
