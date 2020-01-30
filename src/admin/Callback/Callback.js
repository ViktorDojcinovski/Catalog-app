import React, { Component } from 'react';

import { AuthContext } from '../Auth/AuthContext';

export class Callback extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    //Handle authentiaction if expected values are in the URL
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.context.handleAuthentication();
    } else {
      throw new Error('Invalid callback URL.');
    }
  }

  render() {
    return <h1> Loading... </h1>;
  }
}
