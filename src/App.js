import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout";
import CatalogueList from "./containers/CatalogueList";
import Catalogue from "./containers/Catalogue";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/catalogue/:id" component={Catalogue} />
          <Route path="/" exact component={CatalogueList} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
