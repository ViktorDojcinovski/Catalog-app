import React, { Component } from 'react';

import { Auth } from '../Auth/Auth';
import { CatalogListItem } from './components/CatalogListItem';
import { Spinner } from '../components/UI/Spinner/Spinner';
import { admin_uri } from '../../common/app.constants';

export class CatalogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: new Auth(),
      partnerEmail: null,
      error: false,
      catalogs: [],
      loading: false
    };
  }
  componentDidMount() {
    this.setState({ loading: true });

    this.props.auth.getProfile((profile, error) => {
      this.partnerEmail = profile.email;

      fetch(`${process.env.REACT_APP_API_URL}/admin/getCatalogs`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.state.auth.getAccessToken()}`
        },
        body: JSON.stringify({ partnerEmail: this.partnerEmail })
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({ error: false, catalogs: data });
          this.error = false;
          this.setState({ loading: false });
        })
        .catch(error => {
          this.setState({ error: true });
          console.error(error);
        });
    });
  }
  deleteCatalogHandler = (event, catalogId) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/admin/deleteCatalog/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.auth.getAccessToken()}`
      },
      body: JSON.stringify({ catalogId: catalogId })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ catalogs: data });
      })
      .catch(err => {
        this.setState({ error: true });
        console.error(err);
      });
  };
  editCatalogHandler = (event, catalogId) => {
    event.preventDefault();
    const queryString = 'catalogId=' + catalogId;
    this.props.history.push({
      pathname: `/${admin_uri}/new-catalog`,
      search: '?' + queryString,
      state: { editMode: true }
    });
  };
  render() {
    let content = this.state.error ? (
      <p> Pages can 't be loaded! </p>
    ) : (
      <Spinner />
    );

    if (this.state.catalogs.length > 0) {
      content = (
        <div>
          <h2 className='admin-area-top-header'> List of created catalogs </h2>{' '}
          {this.state.catalogs.map(catalog => {
            return (
              <CatalogListItem
                key={catalog._id}
                name={catalog.name}
                deleteCatalog={e => this.deleteCatalogHandler(e, catalog._id)}
                editCatalog={e => this.editCatalogHandler(e, catalog._id)}
              />
            );
          })}{' '}
        </div>
      );
    } else {
      if (!this.state.loading) {
        content = <div> No catalogs to list! </div>;
      }
    }
    return content;
  }
}
