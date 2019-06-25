import React from "react";
import { InputGroup, Input } from "reactstrap";
import styled from "styled-components";

const StyledInputGroup = styled(InputGroup)`
  float: left;
  width: 30%;
  height: 40px;
  margin-right: 5%;
  input {
    text-align: center;
    font-size: 12px;
    height: 38px;
    border-radius: 0;
    border: 3px solid #cee057;
  }
`;

function MainSearch(props) {
  return (
    <StyledInputGroup>
      <Input placeholder="rapid filter" onChange={props.onSearchChange} />
    </StyledInputGroup>
  );
}

export default MainSearch;
