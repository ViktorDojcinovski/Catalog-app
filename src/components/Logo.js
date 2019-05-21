import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  background: #fefefe;
  width: 35%;
  height: calc(2rem + 10px);
  margin-right: 2%;
  float: left;
`;

function Logo() {
  return (
    <StyledWrapper>
      <img alt="Catalogue App Logo" />
    </StyledWrapper>
  );
}

export default Logo;
