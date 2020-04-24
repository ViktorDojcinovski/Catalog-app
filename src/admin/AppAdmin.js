import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { Auth } from "./Auth/Auth";
import { AuthContext } from "./Auth/AuthContext";
import { Callback } from "./Callback/Callback";
import { PrivateRoute } from "./components/PrivateRoute";
import Home from "./Home/Home";
import CatalogList from "./CatalogList/CatalogList";
import UserListContainer from "./UserList/PartnerListContainer";
import NewCatalog from "./NewCatalog/NewCatalog";
import Profile from "./Profile/Profile";
import { Page } from "../Page404/Page";
import withDashboard from "../hoc/withDashboard";

const StyledWrapper = styled.div`
  position: relative;
  left: 220px;
  width: calc(100% - 220px);
  min-height: 100vh;
  padding: 30px;
  background-color: #eee;
`;

export class AppAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
    };
  }
  render() {
    const { auth } = this.state;
    const route_prefix = this.props.match.url;

    return (
      <AuthContext.Provider value={auth}>
        <Route path={route_prefix + "/callback"} component={Callback} />
        <StyledWrapper>
          <Switch>
            <Route
              path={route_prefix}
              exact
              render={(props) => <Home {...props} />}
            />
            <PrivateRoute
              path={route_prefix + "/catalog-list"}
              component={CatalogList}
            />
            <PrivateRoute
              path={route_prefix + "/new-catalog"}
              component={NewCatalog}
            />
            <PrivateRoute
              path={route_prefix + "/profile"}
              component={Profile}
            />
            <PrivateRoute
              path={route_prefix + "/partners-list"}
              component={UserListContainer}
            />
            <Route exact component={withDashboard(Page)} />{" "}
          </Switch>
        </StyledWrapper>
      </AuthContext.Provider>
    );
  }
}
