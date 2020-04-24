import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import 'moment-timezone';

const StyledWrapper = styled.section`
  position: relative;
  align-self: center;
  box-sizing: border-box;
  margin: 20px;
  width: 161.8px;
  height: 320px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.1s;
  &:hover {
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.4);
    transform: scale(1.02);
    transition: all 0.1s;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 215px;
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledHeader = styled.h2`
  color: black;
  font-size: 16px;
  line-height: 1.2em;
  font-weight: bold;
  text-align: left;
  position: absolute;
  top: 225px;
  width: 100%;
  padding-left: 20px;
`;

const StyledParagraph = styled.p`
  color: #444;
  font-size: 0.8rem;
  line-height: 1rem;
  font-weight: bold;
  text-align: left;
  position: absolute;
  top: 245px;
  padding-left: 20px;
`;

const StyledDates = styled.div`
  position: absolute;
  top: 275px;
  padding-left: 20px;
  p {
    text-align: left;
    color: #555;
    font-size: 0.9rem;
    line-height: 0.9rem;
    margin-bottom: 2px;
    &.align-right {
      text-align: right;
    }
    > small {
      color: #888;
    }
  }
`;

export function CatalogAbstract(props) {
  let header, type, image_folder, startDate, endDate;
  if (props) {
    image_folder = !props.image_folder
      ? 'Test image folder'
      : process.env.REACT_APP_API_URL +
        '/catalogs/' +
        props.image_folder +
        '/images/' +
        props.front_image;
    header = !props.name ? 'Test phase header' : props.name;
    type = !props.type ? 'Test phase type' : props.type;
    startDate = !props.startDate ? 'Test phase date' : props.startDate;
    endDate = !props.endDate ? 'Test phase date' : props.endDate;
  }
  return (
    <StyledWrapper>
      <StyledImage src={image_folder} /> <StyledHeader> {header} </StyledHeader>
      <StyledParagraph> {type} </StyledParagraph>
      <StyledDates>
        <p>
          <small>
            from <Moment format='DD.MM.YYYY'> {startDate} </Moment>
          </small>
        </p>
        <p className='align-right'>
          <small>
            to <Moment format='DD.MM.YYYY'> {endDate} </Moment>
          </small>
        </p>
      </StyledDates>
    </StyledWrapper>
  );
}

CatalogAbstract.propTypes = {
  image_folder: PropTypes.string,
  front_imagename: PropTypes.string,
  type: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};
