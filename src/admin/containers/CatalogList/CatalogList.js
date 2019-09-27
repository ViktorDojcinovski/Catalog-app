import React, { Component } from 'react';

import Auth from '../../Auth/Auth';
import CatalogListItem from './CatalogListItem/CatalogListItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import AuxComp from '../../../hoc/AuxComp';

class CatalogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: new Auth(),
      error: false,
      catalogues: null
    };
  }

  componentDidMount() {
    console.log('blah blah');
    fetch(`${process.env.REACT_APP_API_URL}/catalogues`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.auth.getAccessToken()}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ error: false, catalogues: data });
        this.error = false;
      })
      .catch(error => {
        this.setState({ error: true });
        console.error(error);
      });
  }

  deleteCatalogueHandler = (event, catalogueId) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/admin/deleteCatalogue/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.auth.getAccessToken()}`
      },
      body: JSON.stringify({ catalogueId: catalogueId })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ catalogues: data });
      })
      .catch(err => {
        this.setState({ error: true });
        console.error(err);
      });
  };

  editCatalogueHandler = (event, catalogueId) => {
    event.preventDefault();
    const queryString = 'catalogueId=' + catalogueId;
    this.props.history.push({
      pathname: '/admin/new-catalogue',
      search: '?' + queryString
    });
  };

  render() {
    let catalogues = this.state.error ? (
      <p> {escape("Pages can't be loaded!")} </p>
    ) : (
      <Spinner />
    );

    if (this.state.catalogues) {
      catalogues = (
        <div>
          <h2> List of created catalogues </h2>
          {this.state.catalogues.map(catalogue => {
            return (
              <CatalogListItem
                key={catalogue._id}
                name={catalogue.name}
                deleteCatalogue={e =>
                  this.deleteCatalogueHandler(e, catalogue._id)
                }
                editCatalogue={e => this.editCatalogueHandler(e, catalogue._id)}
              />
            );
          })}
        </div>
      );
    }

    return <AuxComp> {catalogues} </AuxComp>;
  }
}

export default CatalogList;
