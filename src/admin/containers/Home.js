import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../Auth/AuthContext';
import Auth from '../Auth/Auth';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history)
    };
  }
  render() {
    const { auth } = this.state;
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div>
        <h1> Home </h1>
        {isAuthenticated() ? (
          <Link to='/admin/profile'> View profile </Link>
        ) : (
          <button onClick={login}> Log In </button>
        )}
        <AuthContext.Provider value={auth} />
      </div>
    );
  }
}

export default Home;
