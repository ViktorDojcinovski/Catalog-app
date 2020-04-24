import React, { Component } from 'react';
import axios from 'axios';

import { Loader } from '../common/Loader';
import { CatalogPresentation } from './components/CatalogPresentation';

export default class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      catalog: null,
      similarCatalogs: []
    };
    this.id = null;
  }

  async componentDidMount() {
    this.setState({ loading: true });
    this.id = this.props.match.params.id;

    await axios
      .get(`${process.env.REACT_APP_API_URL}/catalog/${this.id}`)
      .then(response => {
        const { catalog } = this.state;
        let currentCatalog = Object.assign({}, catalog);
        currentCatalog = response.data;

        this.setState(
          {
            loading: false,
            catalog: currentCatalog
          },
          () => {
            axios
              .post(
                `${process.env.REACT_APP_API_URL}/catalogs/category/${this.state.catalog.type}`,
                { category: this.state.catalog.type }
              )
              .then(response => {
                const filteredCatalogs = response.data.filter(catalog => {
                  return catalog._id !== this.id;
                });
                this.setState({ similarCatalogs: filteredCatalogs });
              })
              .catch(error => {
                console.error(error);
              });
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  createNameFromInput(name) {
    return `${name}.pdf`;
  }

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <>
        <CatalogPresentation
          catalog={this.state.catalog}
          catalogs={this.state.similarCatalogs}
        />{' '}
      </>
    );
  }
}
