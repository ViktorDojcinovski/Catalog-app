import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
  transition: all 0.2s;
  &.success {
    background-color: rgb(89, 150, 5);
    &[disabled] {
      background-color: rgba(89, 150, 5, 0.4);
    }
  }
  .fbShare {
    background-color: blue;
  }
`;

export const Button = (props) => {
  return (
    <StyledButton
      disabled={props.disabled}
      onClick={props.clicked}
      className={props.btnType}
    >
      {props.children}{" "}
    </StyledButton>
  );
};

Button.propTypes = {
  disabled: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
