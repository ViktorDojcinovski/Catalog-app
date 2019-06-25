import React, { Component } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import Home from "./Home";
import Profile from "./Profile";
import Callback from "./Callback";
import AdminHeader from "./AdminHeader";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import Auth from "./Auth/Auth";
import PrivateRoute from "./PrivateRoute";

import AuthContext from "./AuthContext";

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
          <Route path={route_prefix + "/public"} component={Public} />
          <Route
            path={route_prefix + "/callback"}
            render={props => <Callback auth={auth} {...props} />}
          />
          <PrivateRoute path={route_prefix + "/profile"} component={Profile} />
          <PrivateRoute path={route_prefix + "/private"} component={Private} />
          <PrivateRoute
            path={route_prefix + "/course"}
            component={Courses}
            scopes={["read:courses"]}
          />
        </StyledWrapper>
      </AuthContext.Provider>
    );
  }
}

export default Admin;
