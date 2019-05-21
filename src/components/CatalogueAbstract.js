import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.section`
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 4px;
  float: left;
  width: calc(33.33% - 8px);
`;

const StyledHeader = styled.h2`
  color: black;
`;

const StyledParagraph = styled.p`
  color: grey;
`;

function CatalogueAbstract(props) {
  let header, type;
  if (props) {
    header = !props.name ? "Test phase header" : props.name;
    type = !props.type ? "Test phase type" : props.type;
  }
  return (
    <StyledWrapper>
      <StyledHeader> {header} </StyledHeader>
      <StyledParagraph> {type} </StyledParagraph>
    </StyledWrapper>
  );
}

export default CatalogueAbstract;
