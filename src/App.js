import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout';
import CatalogueList from './containers/CatalogueList';
import Catalogue from './containers/Catalogue';
import AdminApp from './admin/AdminApp';

// Implement FontAwesome library
// to be available App-wide
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faWindowClose,
  faImage,
  faHeading,
  faCode,
  faFont,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

library.add(faWindowClose, faImage, faHeading, faCode, faFont, faEdit, faTrash);

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/catalogue/:id' component={Catalogue} />
          <Route path='/' exact component={CatalogueList} />
          <Route path='/admin' component={AdminApp} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
