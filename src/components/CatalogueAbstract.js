import React from "react";
import styled from "styled-components";

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
  text-align: left;
  position: absolute;
  top: 225px;
  width: 100%;
  padding-left: 20px;
`;

const StyledParagraph = styled.p`
  color: grey;
  font-size: 14px;
  line-height: 1.2em;
  text-align: left;
  position: relative;
  top: 255px;
  padding-left: 20px;
`;

function CatalogueAbstract(props) {
  let header, type, image_folder;
  if (props) {
    image_folder = !props.image_folder
      ? "Test image folder"
      : "http://localhost:8001/catalogues/" +
        props.image_folder +
        "/images/image_1.jpg";
    header = !props.name ? "Test phase header" : props.name;
    type = !props.type ? "Test phase type" : props.type;
  }
  return (
    <StyledWrapper>
      <StyledImage src={image_folder} />
      <StyledHeader> {header} </StyledHeader>{" "}
      <StyledParagraph> {type} </StyledParagraph>{" "}
    </StyledWrapper>
  );
}

export default CatalogueAbstract;
