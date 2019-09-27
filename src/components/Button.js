import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 3px;
  color: white;
  outline: none;
  cursor: pointer;
  font: inherit;
  width: 140px;
  height: auto;
  padding: 10px;
  margin: 10px;
  font-weight: bold;
  float: right;
  transition: all 0.2s;
  &.success {
    background-color: rgb(89, 150, 5);
    &[disabled] {
      background-color: rgba(89, 150, 5, 0.4);
    }
  }
`;

const button = props => {
  return (
    <StyledButton
      disabled={props.disabled}
      onClick={props.clicked}
      className={props.btnType}
    >
      {props.children}{' '}
    </StyledButton>
  );
};

export default button;
