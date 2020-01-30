import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import ReactImageMagnify from 'react-image-magnify';

import { SocialButtons } from './components/SocialButtons';

import '../turn.js';

import { Loader } from '../common/Loader';
import { CatalogAbstract } from '../common/CatalogAbstract';

const StyledWrapper = styled.div`
  position: relative;
  user-select: none;
  margin: 40px auto;
  width: 900px;
  .magazine {
    margin: 0 auto !important;
  }

  .initialView {
    #flipbook {
      transform: translateX(-200px) !important;
      transition: all 0.3s;
    }
  }
  .eventualView {
    #flipbook {
      transform: translateX(200px) !important;
      transition: all 0.3s;
    }
  }
  #flipbook {
    transition: all 0.3s;
  }
  .page {
    height: 100%;
    img {
      height: 100%;
    }
  }
  button {
    position: absolute;
    border: none;
    background: transparent;
    font-size: 60px;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
    &#flip-right {
      top: 45%;
      transform: translateY(-50%);
      right: 0;
    }
    &#flip-left {
      top: 45%;
      transform: translateY(-50%);
      left: 0;
    }
  }
  .similarCatalogs {
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
      color: #aaa;
      font-size: 1.2rem;
      text-align: left;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
    }
  }
`;

export default class Catalog extends Component {
  id;
  options = {
    width: 800,
    height: 600,
    autoCenter: true,
    display: 'double',
    acceleration: true,
    elevation: 50,
    gradients: !$.isTouch,
    when: {
      turning: (e, page) => {
        console.log($(this).turn('view'));

        if (this.state.catalog.filesNames.length === page) {
          this.setState({ currentView: -1 });
        } else {
          this.setState({ currentView: page });
        }
      }
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentView: 1,
      similarCatalogs: [],
      catalog: {
        name: '',
        type: '',
        startDate: Date,
        endDate: Date,
        image_folder: '',
        filesNames: []
      }
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    this.id = this.props.match.params.id;

    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/catalog/${this.id}`
    );

    const { catalog } = { ...this.state };

    let currentCatalog = Object.assign({}, catalog);

    currentCatalog = response.data;

    this.setState(
      {
        loading: false,
        catalog: currentCatalog
      },
      async () => {
        let response = await axios.post(
          `${process.env.REACT_APP_API_URL}/catalogs/category/${currentCatalog.type}`,
          { category: currentCatalog.type }
        );

        const filteredCatalogs = response.data.filter(catalog => {
          return catalog._id !== this.id;
        });

        this.setState({ similarCatalogs: filteredCatalogs });
      }
    );

    if (this.el) {
      $(this.el).turn(Object.assign({}, this.options));
    }
    document.addEventListener('keydown', this.onKeyDownHandler, false);
  }

  onKeyDownHandler = event => {
    if (event.keyCode === 37) {
      $(this.el).turn('previous');
    }
    if (event.keyCode === 39) {
      $(this.el).turn('next');
    }
  };

  flipNext = event => {
    event.preventDefault();
    $(this.el).turn('next');
  };

  flipPrevious = event => {
    event.preventDefault();
    $(this.el).turn('previous');
  };

  render() {
    let flipBook = (
      <div id='flipbook' ref={el => (this.el = el)} className='magazine'>
        {this.state.catalog.filesNames.map((page, index) => (
          <div key={index} className='page'>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: '',
                  width: 400,
                  height: 600,
                  src: `${process.env.REACT_APP_API_URL}/catalogs/${this.state.catalog['image_folder']}/images/${page['image']}`
                },
                largeImage: {
                  width: 1200,
                  height: 1800,
                  src: `${process.env.REACT_APP_API_URL}/catalogs/${this.state.catalog['image_folder']}/images/${page['image']}`
                },
                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                isHintEnabled: true,
                shouldHideHintAfterFirstActivation: false,
                enlargedImagePosition: 'over'
              }}
            />
          </div>
        ))}
      </div>
    );

    let flipButtons = (
      <>
        <button id='flip-right' onClick={this.flipNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button id='flip-left' onClick={this.flipPrevious}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </>
    );

    let similarCatalogAbstracts = this.state.similarCatalogs ? (
      <div className='similarCatalogs'>
        <h4> Other catalogs from this category: </h4>
        {this.state.similarCatalogs.map(catalog => {
          return (
            <Link key={catalog._id} to={'/catalog/' + catalog._id}>
              <CatalogAbstract
                name={catalog.name}
                type={catalog.type}
                image_folder={catalog.image_folder}
                front_image={catalog.filesNames[0].image}
                startDate={catalog.startDate}
                endDate={catalog.endDate}
              />
            </Link>
          );
        })}
      </div>
    ) : null;

    let mainSectionContent = this.state.loading ? (
      <Loader> </Loader>
    ) : (
      <StyledWrapper>
        <div
          options={this.options}
          className={
            this.state.currentView === 1
              ? 'initialView'
              : this.state.currentView === -1
              ? 'eventualView'
              : ''
          }
        >
          {flipBook}
          {flipButtons}
        </div>
        <SocialButtons id={this.id} />
        {similarCatalogAbstracts}
      </StyledWrapper>
    );

    return <StyledWrapper> {mainSectionContent} </StyledWrapper>;
  }

  componentWillUnmount() {
    if (this.el) {
      $(this.el)
        .turn('destroy')
        .remove();
    }
    document.removeEventListener('keydown', this.onKeyDownHandler, false);
  }
}
