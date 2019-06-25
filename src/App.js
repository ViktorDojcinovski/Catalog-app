import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout";
import CatalogueList from "./containers/CatalogueList";
import Catalogue from "./containers/Catalogue";
import AdminApp from "./admin/AdminApp";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/catalogue/:id" component={Catalogue} />{" "}
          <Route path="/" exact component={CatalogueList} />{" "}
          <Route path="/admin" component={AdminApp} />
        </Switch>{" "}
      </Layout>
    );
  }
}

export default App;
