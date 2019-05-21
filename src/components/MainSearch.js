import React from "react";
import styled from "styled-components";

const Input = styled.input`
  background: #ccc;
  color: blue;
  box-sizing: border-box;
  padding: 5px;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 2rem;
  width: 60%;
  float: left;
`;

function MainSearch() {
  return <Input placeholder="Insert a keyword" />;
}

export default MainSearch;
