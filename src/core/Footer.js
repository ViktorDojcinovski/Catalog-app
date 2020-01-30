import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitterSquare
} from '@fortawesome/free-brands-svg-icons';

import { Logo } from '../common/Logo';

const StyledWrapper = styled.section`
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: left;
`;

const ContentHolder = styled.div`
  background-color: rgba(113, 45, 216, 0.4);
  width: 100%;
  min-height: 100px;
  padding: 20px 10px;
  color: white;
  font-size: 12px;
  a {
    color: white;
    margin-right: 10px;
    &:hover {
      color: #eee;
    }
  }
  & h4 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  & h6 {
    font-size: 14px;
    font-weight: normal;
  }
`;

const CopyRightHolder = styled.div`
  background-color: rgba(113, 45, 216, 0.8);
  width: 100%;
  min-height: 40px;
  color: white;
  font-size: 10px;
  line-height: 40px;
  text-align: center;
`;

export function Footer() {
  return (
    <StyledWrapper>
      <ContentHolder>
        <div className='container'>
          <div className='row'>
            <Logo />
            <div className='col-3'>
              <h4> About </h4> <h6> Who are we </h6>{' '}
            </div>{' '}
            <div className='col-3'>
              <h4> Privacy </h4> <h6> Privacy Policy </h6>{' '}
              <h6> Terms and Conditions </h6>{' '}
            </div>{' '}
            <div className='col-2'>
              <h4> Get social </h4>{' '}
              <a className='social' href='https://facebook.com'>
                <FontAwesomeIcon icon={faFacebookSquare} size='2x' />
              </a>{' '}
              <a className='social' href='https://twitter.com'>
                <FontAwesomeIcon icon={faTwitterSquare} size='2x' />
              </a>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </ContentHolder>{' '}
      <CopyRightHolder> copyright katalozi.mk 2019 </CopyRightHolder>{' '}
    </StyledWrapper>
  );
}
