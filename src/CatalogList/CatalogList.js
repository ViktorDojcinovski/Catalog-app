import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faTools, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

import { MainSearch } from '../common/MainSearch';
import { CatalogAbstract } from '../common/CatalogAbstract';
import { PartnerLabel } from '../common/PartnerLabel';
import { CategoryLabel } from '../common/CategoryLabel';
import { Loader } from '../common/Loader';
import { Ad } from './components/Ad';

const StyledWrapper = styled.section`
  margin: 30px auto 0;
`;

const StyledSearchBar = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap;
  overflow: visible;
  text-align: center;
  max-width: 992px;
  z-index: 100;
`;

const StyledMainBodyWrapper = styled.section`
  overflow: auto;
  width: 900px;
  margin: 40px auto;
`;

const StyledFiltersWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 250px;
  float: left;
  h3 {
    color: #aaa;
    font-size: 1.2rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    padding-left: 4px;
    margin-top: 35px;
    margin-bottom: 40px;
  }
  h4 {
    color: #aaa;
    font-size: 0.8rem;
    margin-top: 20px;
    margin-bottom: 10px;
    border: 1px solid #eee;
    padding: 5px;
  }
  h5 {
    display: inline-block;
    color: #aaa;
    font-size: 0.8rem;
    padding-bottom: 5px;
    padding-left: 4px;
    margin-top: 15px;
    margin-bottom: 10px;
    width: 30%;
    cursor: pointer;
    &:hover {
      color: #888;
    }
  }
`;

const StyledPartnerListWrapper = styled.section`
  width: 100%;
`;

const StyledCategoriesListWrapper = styled.section`
  width: 100%;
  margin-bottom: 20px;
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
  width: 650px;
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

export default class CatalogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilterItemValue: null,
      searchfield: '',
      partners: [],
      catalogs: [],
      loading: false
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await axios
      .get(`${process.env.REACT_APP_API_URL}/catalogs`)
      .then(
        async catalogs => {
          await axios.get(`${process.env.REACT_APP_API_URL}/partners`).then(
            partners => {
              this.setState({
                catalogs: catalogs.data,
                partners: partners.data,
                loading: false
              });
            },
            err => {
              throw new Error('Fetching partners error! ' + err);
            }
          );
        },
        err => {
          throw new Error('Fetching catalogs error! ' + err);
        }
      )
      .catch(err => {
        console.error(err);
      });
  }

  onSearchCallback = event => {
    this.setState({ searchfield: event.target.value });
  };

  async showAllCatalogs() {
    this.setState({ loading: true });

    await axios
      .get(`${process.env.REACT_APP_API_URL}/catalogs`)
      .then(
        catalogs => {
          this.setState({
            catalogs: catalogs.data,
            activeFilterItemValue: null,
            loading: false
          });
        },
        err => {
          throw new Error('Fetching catalogs error! ' + err);
        }
      )
      .catch(err => console.error(err));
  }

  onClickHandler(event, filterBy, value) {
    const requestURL =
      filterBy === 'email'
        ? `${process.env.REACT_APP_API_URL}/catalogs/${value}`
        : `${process.env.REACT_APP_API_URL}/catalogs/category/${value}`;

    this.setState({
      loading: true,
      activeFilterItemValue: event.target.innerHTML
    });

    axios.post(requestURL, { [filterBy]: value }).then(catalogs => {
      this.setState({ loading: false, catalogs: catalogs.data });
    });
  }

  render() {
    const filteredCatalogs = this.state.catalogs.filter(catalog => {
      return catalog.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });

    let latestCatalogAbstracts = (
      <StyledListWrapper>
        <h3> Latest Catalogs </h3>
        {filteredCatalogs.map(catalog => {
          return (
            <Link key={catalog._id} to={'/catalog/' + catalog._id}>
              <CatalogAbstract
                name={catalog.name}
                type={catalog.type}
                image_folder={catalog.image_folder}
                front_image={catalog.filesNames[0].image}
                startDate={catalog.startDate}
                endDate={catalog.endDate}
              />
            </Link>
          );
        })}
      </StyledListWrapper>
    );

    let partners = (
      <StyledPartnerListWrapper>
        <h4> Filter by magazine: </h4>
        <div>
          {this.state.partners.map(partner => {
            return (
              <PartnerLabel
                key={partner.email}
                name={partner.prefferedName}
                avatar={partner.avatar}
                customAvatar={partner.customAvatar}
                isActive={
                  this.state.activeFilterItemValue === partner.prefferedName
                }
                clicked={event =>
                  this.onClickHandler(event, 'email', partner.email)
                }
              />
            );
          })}
        </div>
      </StyledPartnerListWrapper>
    );

    let categories = (
      <StyledCategoriesListWrapper>
        <h4> Filter by product category: </h4>
        <div>
          {[
            { name: 'grocery', icon: faShoppingBasket },
            { name: 'toolkits', icon: faTools }
          ].map(category => {
            return (
              <CategoryLabel
                key={category.name}
                name={category.name}
                icon={category.icon}
                isActive={this.state.activeFilterItemValue === category.name}
                clicked={event =>
                  this.onClickHandler(event, 'category', category.name)
                }
              >
                {category}
              </CategoryLabel>
            );
          })}
        </div>
      </StyledCategoriesListWrapper>
    );

    let showAllLabel = this.state.activeFilterItemValue ? (
      <h5 onClick={this.showAllCatalogs.bind(this)}> Show All </h5>
    ) : (
      ''
    );

    let mainSectionContent = this.state.loading ? (
      <Loader />
    ) : (
      <StyledMainBodyWrapper>
        <Ad id={'top_ad'} />
        <StyledFiltersWrapper>
          <h3> Filters </h3>
          {showAllLabel}
          <StyledSearchBar>
            <MainSearch onSearchChange={this.onSearchCallback} />
          </StyledSearchBar>
          {partners}
          {categories}
          <Ad id={'filters_ad'} />
        </StyledFiltersWrapper>
        {latestCatalogAbstracts}
      </StyledMainBodyWrapper>
    );

    return <StyledWrapper> {mainSectionContent} </StyledWrapper>;
  }
}
