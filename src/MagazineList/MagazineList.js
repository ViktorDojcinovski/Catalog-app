import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Loader } from '../common/Loader';
import { MagazineAbstract } from './components/MagazineAbstract';

const StyledWrapper = styled.section`
  margin: 30px auto 0;
`;

const StyledMainBodyWrapper = styled.section`
  overflow: auto;
  width: 900px;
  margin: 40px auto;
`;

const StyledListWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  padding: 10px;
  text-align: center;
  min-height: calc(100vh - 275px);
  width: 100%;
  margin: 0 auto;
  float: left;
  h3 {
    color: #aaa;
    font-size: 1.2rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    padding-left: 4px;
    margin-top: 25px;
    margin-bottom: 20px;
    margin-left: 10px;
    width: 100%;
    text-align: left;
  }
`;

class MagazineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      partners: []
    };
  }
  async componentDidMount() {
    this.setState({ loading: true });
    let partners = await axios.get(`${process.env.REACT_APP_API_URL}/partners`);

    this.setState({
      partners: partners.data,
      loading: false
    });
  }
  render() {
    let partnerAbstracts = this.state.partners.map(partner => {
      return (
        <Link key={partner.email} to={'/magazine/' + partner._id}>
          <MagazineAbstract partner={partner} />{' '}
        </Link>
      );
    });

    let mainSectionContent = this.state.loading ? (
      <Loader />
    ) : (
      <StyledMainBodyWrapper>
        <StyledListWrapper>
          <h3> Magazines </h3> {partnerAbstracts}{' '}
        </StyledListWrapper>{' '}
      </StyledMainBodyWrapper>
    );
    return <StyledWrapper> {mainSectionContent} </StyledWrapper>;
  }
}

export default MagazineList;
