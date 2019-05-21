import React, { Component } from "react";
import styled from "styled-components";

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
    this.catalogues = [
      {
        name: "Vero",
        type: "grocery"
      },
      {
        name: "Mr.Bricolage",
        type: "toolkits"
      },
      {
        name: "",
        type: ""
      }
    ];
  }
  render() {
    let catalogAbstracts = this.catalogues.map((catalogue, id) => {
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
