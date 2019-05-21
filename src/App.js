import React, { Component } from "react";
import styled from "styled-components";

import Header from "./containers/Header";
import CatalogList from "./containers/CatalogueList";
import Footer from "./components/Footer";

const StyledWrapper = styled.div`
  width: 600px;
  margin: 10px auto;
  padding: 0;
  background-color: #f1f1f1;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
`;

class App extends Component {
  render() {
    return (
      <StyledWrapper>
        <Header />
        <CatalogList />
        <Footer />
      </StyledWrapper>
    );
  }
}

export default App;
