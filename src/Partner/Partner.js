import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitterSquare
} from '@fortawesome/free-brands-svg-icons';

import { faCode } from '@fortawesome/free-solid-svg-icons';

import { Loader } from '../common/Loader';
import { CatalogAbstract } from '../common/CatalogAbstract';

const StyledWrapper = styled.section`
  position: relative;
`;

const StyledContentWrapper = styled.section`
  position: relative;
  width: 900px;
  min-height: calc(100vh - 305px);
  margin: 40px auto;
  h4 {
    display: inline-block;
    color: #aaa;
    font-size: 1.2rem;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
  }
  header {
    background-color: #eee;
    padding: 20px;
    border-left: 5px solid #888;
    margin-bottom: 20px;
    overflow: auto;
    img {
      float: left;
    }
    h1 {
      line-height: 40px;
      float: left;
    }
  }
  .customAvatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .mediaWrapper {
    margin: 0 auto;
    overflow: auto;
    .socialMediaWrapper,
    .websiteWrapper {
      width: calc(50% - 20px);
      margin: 5px 10px;
      padding: 10px;
      float: left;
    }
  }
  .description {
    padding-top: 40px;
    border-top: 1px solid #eee;
    margin-top: 20px;
  }
  .partnerCatalogs {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-content: flex-start;
    flex-wrap: wrap;
    overflow: auto;
    padding: 10px;
    text-align: center;
    width: 900px;
    margin: 40px auto;
    h4 {
      width: 100%;
      text-align: left;
    }
  }
`;

class Partner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      catalogsFromPartner: [],
      partner: {
        name: '',
        bussinessType: '',
        avatar: '',
        customAvatar: '',
        description: '',
        prefferedName: '',
        twitter: '',
        fb: '',
        website: ''
      }
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { id } = this.props.match.params;

    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/partner/${id}`
    );

    const { partner } = { ...this.state };

    let currentPartner = Object.assign({}, partner);

    currentPartner = response.data;

    this.setState(
      {
        loading: false,
        partner: currentPartner
      },
      async () => {
        let response = await axios.post(
          `${process.env.REACT_APP_API_URL}/catalogs/partner/${id}`,
          { id: id }
        );

        this.setState({ catalogsFromPartner: response.data });
      }
    );
  }

  render() {
    const {
      customAvatar,
      description,
      prefferedName,
      twitter,
      fb,
      website
    } = this.state.partner;

    const fbSection = fb ? (
      <span>
        <a href={`https://${fb}`} target='blank'>
          <FontAwesomeIcon icon={faFacebookSquare} size='2x' />
        </a>{' '}
      </span>
    ) : (
      ''
    );

    const twitterSection = twitter ? (
      <span>
        <a href={`https://${twitter}`} target='blank'>
          <FontAwesomeIcon icon={faTwitterSquare} size='2x' />
        </a>{' '}
      </span>
    ) : (
      ''
    );

    const websiteSection = website ? (
      <span>
        <a href={`https://${website}`} target='blank'>
          <FontAwesomeIcon icon={faCode} size='2x' />
        </a>{' '}
      </span>
    ) : (
      ''
    );

    let catalogsFromPartner = this.state.catalogsFromPartner ? (
      <>
        <h4> Newest catalogs from this magazine: </h4>
        {this.state.catalogsFromPartner.map(catalog => {
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
        })}{' '}
      </>
    ) : null;

    let mainSectionContent = this.state.loading ? (
      <Loader> </Loader>
    ) : (
      <StyledContentWrapper>
        <header>
          <img
            className='customAvatar'
            src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${customAvatar}`}
            alt=''
          />
          <h1> {prefferedName} </h1>{' '}
        </header>{' '}
        <div className='mediaWrapper'>
          <div className='socialMediaWrapper'>
            <h4> This magazine 's social media</h4>{' '}
            <div>
              {' '}
              {fbSection} {twitterSection}{' '}
            </div>{' '}
          </div>{' '}
          <div className='websiteWrapper'>
            <h4> This magazine 's website</h4> <div> {websiteSection} </div>{' '}
          </div>{' '}
        </div>{' '}
        <div className='description'> {description} </div>{' '}
        <div className='partnerCatalogs'> {catalogsFromPartner} </div>{' '}
      </StyledContentWrapper>
    );

    return <StyledWrapper>{mainSectionContent}</StyledWrapper>;
  }
}

export default Partner;
