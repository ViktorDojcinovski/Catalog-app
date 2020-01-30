import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledWrapper = styled.section`
  position: relative;
  align-self: center;
  box-sizing: border-box;
  margin: 5px;
  padding-left: 5px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  overflow: auto;
  transition: all 0.1s;
  &:hover {
    background: rgba(230, 230, 230, 0.4);
    transition: all 0.1s;
    cursor: pointer;
  }
`;

const StyledImage = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  float: left;
  margin-right: 5px;
`;

const StyledHeader = styled.h2`
  position: relative;
  margin-top: 0.15em;
  color: black;
  font-size: 16px;
  line-height: 1.2em;
  font-weight: normal;
  text-align: left;
  width: calc(100% - 35px);
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

export function CategoryLabel(props) {
  let name, icon;
  if (props) {
    name = !props.name ? 'Test phase header' : props.name;
    icon = !props.icon ? 'Test phase icon' : props.icon;
  }
  return (
    <StyledWrapper onClick={props.clicked}>
      <StyledImage>
        <FontAwesomeIcon icon={icon} />
      </StyledImage>
      <StyledHeader className={props.isActive ? 'active' : ''}>
        {name}
      </StyledHeader>
    </StyledWrapper>
  );
}
