import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

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
    let response = await axios.get("http://localhost:8001/catalogues");
    this.setState({ catalogues: response.data });
  }
  render() {
    let catalogAbstracts = this.state.catalogues.map(catalogue => {
      return (
        <Link key={catalogue.id} to={"/catalogue/" + catalogue.id}>
          <CatalogueAbstract name={catalogue.name} type={catalogue.type} />
        </Link>
      );
    });
    return <StyledWrapper>{catalogAbstracts}</StyledWrapper>;
  }
}

export default CatalogueList;
