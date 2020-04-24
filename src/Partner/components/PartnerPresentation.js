import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  faFacebookSquare,
  faTwitterSquare
} from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

import { SocialMediaIcon } from './SocialMediaIcon';
import { CatalogAbstractList } from '../../common/CatalogAbstractList';

import './PartnerPresentation.scss';

export class PartnerPresentation extends Component {
  render() {
    const { customAvatar, description, prefferedName } = this.props.partner;

    return (
      <section className='main'>
        <section className='contentWrapper'>
          <header>
            <img
              className='customAvatar'
              src={
                customAvatar
                  ? `${process.env.REACT_APP_API_URL}/uploads/avatars/${customAvatar}`
                  : 'https://via.placeholder.com/30'
              }
              alt=''
            />
            <h1> {prefferedName} </h1>{' '}
          </header>{' '}
          <div className='mediaWrapper'>
            <div className='socialMediaWrapper'>
              <h4> This magazine 's social media</h4>{' '}
              <div>
                <SocialMediaIcon
                  url='http://facebook.com'
                  icon={faFacebookSquare}
                />{' '}
                <SocialMediaIcon
                  url='http://twitter.com'
                  icon={faTwitterSquare}
                />{' '}
              </div>{' '}
            </div>{' '}
            <div className='websiteWrapper'>
              <h4> This magazine 's website</h4>{' '}
              <div>
                <SocialMediaIcon url='http://google.com' icon={faCode} />{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
          <div className='description'> {description} </div>{' '}
          <div className='partnerCatalogs'>
            {' '}
            {this.props.catalogs ? (
              <CatalogAbstractList
                title='Newest catalogs from this magazine'
                catalogs={this.props.catalogs}
              />
            ) : null}{' '}
          </div>{' '}
        </section>{' '}
      </section>
    );
  }
}

PartnerPresentation.propTypes = {
  partner: PropTypes.object,
  catalogs: PropTypes.array
};

export default PartnerPresentation;
