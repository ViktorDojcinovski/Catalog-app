import React from "react";
import styled from "styled-components";

import logo_img from "../assets/katalozi.png";

const StyledWrapper = styled.div`
  width: 100%;
  height: 38px;
  margin-right: 2%;
  margin-bottom: 30px;
  float: left;
`;

export function Logo() {
  return (
    <StyledWrapper>
      <img src={logo_img} alt="Catalog App Logo" />
    </StyledWrapper>
  );
}
