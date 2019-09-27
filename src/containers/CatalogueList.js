import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import Header from './Header';
import Footer from '../components/Footer';
import MainSearch from '../components/MainSearch';
import CatalogueAbstract from '../components/CatalogueAbstract';

const StyledWrapper = styled.section`
  margin: 30px auto;
`;

const StyledSearchBar = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap;
  overflow: visible;
  padding: 10px;
  text-align: center;
  max-width: 992px;
  margin: 0 auto;
  z-index: 100;
`;

const StyledListWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap;
  overflow: auto;
  padding: 10px;
  text-align: center;
  min-height: calc(100vh - 275px);
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledButtonDropdown = styled(ButtonDropdown)`
  float: left;
  width: 30%;
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  background-color: rgba(194, 216, 45, 0.8);
  border: transparent;
  border-radius: 0;
  &:hover {
    background-color: rgba(194, 216, 45, 0.95);
  }
`;

class CatalogueList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      searchfield: '',
      catalogues: []
    };
  }
  async componentDidMount() {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/catalogues`
    );
    this.setState({ catalogues: response.data });
  }
  onSearchCallback = event => {
    this.setState({ searchfield: event.target.value });
  };
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    const filteredCatalogues = this.state.catalogues.filter(catalog => {
      return catalog.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });
    let catalogAbstracts = filteredCatalogues.map(catalogue => {
      console.log(catalogue);
      return (
        <Link key={catalogue.id} to={'/catalogue/' + catalogue._id}>
          <CatalogueAbstract
            name={catalogue.name}
            type={catalogue.type}
            image_folder={catalogue.image_folder}
            front_image={catalogue.filesNames[0].image}
            startDate={catalogue.startDate}
            endDate={catalogue.endDate}
          />
        </Link>
      );
    });
    return (
      <StyledWrapper>
        <Header />
        <StyledSearchBar>
          <MainSearch onSearchChange={this.onSearchCallback} />
          <StyledButtonDropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <StyledDropdownToggle caret> By Category </StyledDropdownToggle>
            <DropdownMenu>
              <DropdownItem header> Header </DropdownItem>
              <DropdownItem disabled> Action </DropdownItem>
              <DropdownItem> Another Action </DropdownItem>
              <DropdownItem divider />
              <DropdownItem> Another Action </DropdownItem>
            </DropdownMenu>
          </StyledButtonDropdown>
        </StyledSearchBar>
        <StyledListWrapper> {catalogAbstracts} </StyledListWrapper> <Footer />
      </StyledWrapper>
    );
  }
}

export default CatalogueList;
