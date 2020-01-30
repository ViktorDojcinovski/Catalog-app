import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../Auth/AuthContext';

export class Home extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated, login } = this.context;
    return (
      <div>
        <h1> Home </h1>{' '}
        {isAuthenticated() ? (
          <Link to='/admin/profile'> View profile </Link>
        ) : (
          <button onClick={login}> Log In </button>
        )}{' '}
      </div>
    );
  }
}
