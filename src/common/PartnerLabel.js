import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  position: relative;
  align-self: center;
  box-sizing: border-box;
  margin: 5px;
  width: calc(100% - 5px);
  background: rgba(255, 255, 255, 1);
  overflow: auto;
  transition: all 0.1s;
  &:hover {
    background: rgba(230, 230, 230, 0.4);
    transition: all 0.1s;
    cursor: pointer;
  }
`;

const StyledImage = styled.img`
  width: 30px;
  height: 30px;
  position: relative;
  float: left;
  margin-right: 5px;
`;

const StyledHeader = styled.h2`
  color: black;
  font-size: 16px;
  line-height: 1.2em;
  font-weight: normal;
  text-align: left;
  width: calc(100% - 35px);
  position: relative;
  margin-top: 0.2rem;
  float: left;
  &.active {
    font-weight: bold;
    &:after {
      content: '';
      position: absolute;
      top: -4px;
      right: 0;
      background-color: #80bdff;
      width: 4px;
      height: 30px;
    }
  }
`;

export function PartnerLabel(props) {
  let name, customAvatar;
  if (props) {
    name = !props.name ? 'Test phase header' : props.name;
    customAvatar = !props.customAvatar ? null : props.customAvatar;
  }
  return (
    <StyledWrapper onClick={props.clicked}>
      <StyledImage
        src={
          customAvatar
            ? `${process.env.REACT_APP_API_URL}/uploads/avatars/${customAvatar}`
            : 'https://via.placeholder.com/30'
        }
      />
      <StyledHeader className={props.isActive ? 'active' : ''}>
        {name}
      </StyledHeader>
    </StyledWrapper>
  );
}

PartnerLabel.propTypes = {
  name: PropTypes.string.isRequired,
  customAvatar: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired
};
