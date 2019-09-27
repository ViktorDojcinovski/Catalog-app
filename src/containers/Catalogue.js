import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

import '../turn.js';

import Header from './Header';
import Footer from '../components/Footer';

const StyledWrapper = styled.section`
  .magazineWrapper {
    user-select: none;
    margin: 40px 0;
    .magazine {
      margin: 0 auto !important;
    }
  }
  .page {
    height: 100%;
    img {
      max-width: 100%;
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
  }
  button#flip-right {
    top: 50%;
    right: 0;
  }
  button#flip-left {
    top: 50%;
    left: 0;
  }
`;

class Catalogue extends Component {
  options = {
    width: 800,
    height: 600,
    autoCenter: true,
    display: 'double',
    acceleration: true,
    elevation: 50,
    gradients: !$.isTouch,
    when: {
      turned: function(e, page) {
        console.log('Current view: ', $(this).turn('view'));
      }
    }
  };
  static defaultProps = {
    style: {},
    className: '',
    options: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      catalogue: {
        name: '',
        type: '',
        startDate: Date,
        endDate: Date,
        image_folder: '',
        filesNames: []
      }
    };
  }

  componentWillUnmount() {
    if (this.el) {
      $(this.el)
        .turn('destroy')
        .remove();
    }
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/catalogue/${id}`
    );

    const { catalogue } = { ...this.state };

    const currentCatalogue = catalogue;

    currentCatalogue['name'] = response.data.name;
    currentCatalogue['type'] = response.data.type;
    currentCatalogue['image_folder'] = response.data.image_folder;
    currentCatalogue['filesNames'] = response.data.filesNames;

    this.setState({
      catalogue: currentCatalogue
    });

    if (this.el) {
      $(this.el).turn(Object.assign({}, this.options));
    }
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  handleKeyDown = event => {
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
    return (
      <StyledWrapper>
        <Header />
        <div options={this.options} className='magazineWrapper'>
          <div ref={el => (this.el = el)} className='magazine'>
            {this.state.catalogue['filesNames'].map((page, index) => (
              <div key={index} className='page'>
                <img
                  src={`${process.env.REACT_APP_API_URL}/catalogues/${
                    this.state.catalogue['image_folder']
                  }/images/${page['image']}`}
                  alt=''
                />
              </div>
            ))}
          </div>
          <button id='flip-right' onClick={this.flipNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <button id='flip-left' onClick={this.flipPrevious}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <Footer />
      </StyledWrapper>
    );
  }
}

export default Catalogue;
