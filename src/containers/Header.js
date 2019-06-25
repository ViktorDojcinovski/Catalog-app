import React, { Component } from "react";
import styled from "styled-components";

import Logo from "../components/Logo";
import MainMenu from "../components/MainMenu";

const StyledWrapper = styled.div`
  background-color: rgba(255, 255, 255, 1);
  padding: 10px 10px 0 10px;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.1);
  max-width: 100%;
`;

const LogoHolder = styled.div`
  overflow: visible;
  clear: both;
  max-width: 1210px;
  margin: 0 auto;
`;

const MenuHolder = styled.div`
  max-width: 1210px;
  margin: 0 auto;
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    return (
      <StyledWrapper>
        <MenuHolder>
          <MainMenu />
        </MenuHolder>
        <LogoHolder>
          <Logo />
          <div style={{ clear: "both" }} />
        </LogoHolder>
      </StyledWrapper>
    );
  }
}

export default Header;
