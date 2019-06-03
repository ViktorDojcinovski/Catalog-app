import React, { Component } from "react";
import styled from "styled-components";

import Header from "../containers/Header";
import Footer from "../components/Footer";

const StyledWrapper = styled.div``;

class Layout extends Component {
  render() {
    return (
      <StyledWrapper>
        <Header />
        {this.props.children}
        <Footer />
      </StyledWrapper>
    );
  }
}

export default Layout;
