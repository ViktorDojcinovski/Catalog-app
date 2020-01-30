import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { Auth } from './Auth/Auth';
import { Dashboard } from './core/Dashboard';
import { Home } from './Home/Home';
import { Profile } from './Profile/Profile';
import { Callback } from './Callback/Callback';
import { PrivateRoute } from './components/PrivateRoute';
import { NewCatalog } from './NewCatalog/NewCatalog';
import { CatalogList } from './CatalogList/CatalogList';
import Courses from './components/Courses';

import { AuthContext } from './Auth/AuthContext';

const StyledWrapper = styled.div`
  position: relative;
  left: 220px;
  width: calc(100% - 220px);
  min-height: 100vh;
  padding: 30px;
  background-color: #eee;
`;

export class AdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history)
    };
  }
  render() {
    const { auth } = this.state;
    const route_prefix = this.props.match.url;
    return (
      <AuthContext.Provider value={auth}>
        <Dashboard />
        <StyledWrapper>
          <Route
            path={route_prefix}
            exact
            render={props => <Home {...props} />}
          />
          <Route
            path={route_prefix + '/callback'}
            render={props => <Callback {...props} />}
          />
          <PrivateRoute path={route_prefix + '/profile'} component={Profile} />
          <PrivateRoute
            path={route_prefix + '/new-catalog'}
            component={NewCatalog}
          />
          <PrivateRoute
            path={route_prefix + '/catalog-list'}
            component={CatalogList}
          />
          <PrivateRoute
            path={route_prefix + '/course'}
            component={Courses}
            scopes={['read:courses']}
          />
        </StyledWrapper>
      </AuthContext.Provider>
    );
  }
}
