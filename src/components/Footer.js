import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.section`
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;
  text-align: center;
`;

function Footer() {
  return <StyledWrapper>This is the footer!</StyledWrapper>;
}

export default Footer;
