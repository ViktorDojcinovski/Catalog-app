import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Auth from './Auth/Auth';
import AdminHeader from './components/AdminHeader';
import Home from './containers/Home';
import Profile from './components/Profile';
import Callback from './components/Callback';
import Public from './components/Public';
import PrivateRoute from './components/PrivateRoute';
import NewCatalogue from './containers/NewCatalogue/NewCatalogue';
import CatalogList from './containers/CatalogList/CatalogList';
import Courses from './components/Courses';

import AuthContext from './Auth/AuthContext';

const StyledWrapper = styled.div`
  max-width: 1210px;
  margin: 40px auto;
`;

class Admin extends Component {
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
        <AdminHeader auth={auth} />
        <StyledWrapper>
          <Route
            path={route_prefix}
            exact
            render={props => <Home auth={auth} {...props} />}
          />
          <Route path={route_prefix + '/public'} component={Public} />
          <Route
            path={route_prefix + '/callback'}
            render={props => <Callback auth={auth} {...props} />}
          />
          <PrivateRoute path={route_prefix + '/profile'} component={Profile} />
          <PrivateRoute
            path={route_prefix + '/new-catalogue'}
            component={NewCatalogue}
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

export default Admin;
