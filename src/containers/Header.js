import React, { Component } from "react";
import styled from "styled-components";

import Logo from "../components/Logo";
import MainSearch from "../components/MainSearch";
import MainMenu from "../components/MainMenu";

const StyledWrapper = styled.div`
  overflow: auto;
  background-color: rgba(0, 0, 255, 0.2);
  padding: 10px;
`;

class Header extends Component {
  render() {
    return (
      <StyledWrapper>
        <Logo />
        <MainSearch />
        <MainMenu />
      </StyledWrapper>
    );
  }
}

export default Header;
