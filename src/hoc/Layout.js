import React, { Component } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  background-color: rgba(180, 180, 180, 0.01);
`;

class Layout extends Component {
  render() {
    return <StyledWrapper> {this.props.children} </StyledWrapper>;
  }
}

export default Layout;
