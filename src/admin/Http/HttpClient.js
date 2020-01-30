import { Component } from 'react';
import Auth from '../Auth/Auth';

export class HttpClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth()
    };
  }
  submitCatalog(endpoint, data) {
    const method = 'POST';
    return this.fetchUber({ endpoint, method, data });
  }
  getCatalogs(endpoint) {
    const method = 'GET';
    const data = null;
    return this.fetchUber({ endpoint, method, data });
  }
  getCatalog(endpoint) {
    const method = 'GET';
    const data = null;
    return this.fetchUber({ endpoint, method, data });
  }
  updateCatalog(endpoint, data) {
    const method = 'PUT';
    return this.fetchUber({ endpoint, method, data });
  }
  deleteCatalog(endpoint, data) {
    const method = 'DELETE';
    return this.fetchUber({ endpoint, method, data });
  }
  fetchUber(args) {
    const { endpoint, method, data } = args;

    const load =
      method !== 'GET' ? {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.state.auth.getAccessToken()}`
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: data // body data type must match "Content-Type" header
      } : {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.auth.getAccessToken()}`
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // no-referrer, *client
      };

    return fetch(endpoint, load);
  }
}
