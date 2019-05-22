import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

import CatalogueAbstract from "../components/CatalogueAbstract";

const StyledWrapper = styled.section`
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px;
  text-align: center;
`;

class CatalogueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogues: []
    };
  }
  async componentDidMount() {
    let response = await axios.get(
      "http://localhost:3000/data/catalogues.json"
    );
    this.setState({ catalogues: response.data.catalogues });
  }
  render() {
    let catalogAbstracts = this.state.catalogues.map((catalogue, id) => {
      return (
        <CatalogueAbstract
          key={id}
          name={catalogue.name}
          type={catalogue.type}
        />
      );
    });
    return <StyledWrapper>{catalogAbstracts}</StyledWrapper>;
  }
}

export default CatalogueList;
