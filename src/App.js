import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppClient } from './AppClient';
import { AppAdmin } from './admin/AppAdmin';
import { ErrorBoundary } from './hoc/ErrorBoundary';
import { admin_uri } from './common/app.constants';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Switch>
          <Route path={`/${admin_uri}`} component={AppAdmin} />{' '}
          <Route path='/' component={AppClient} />{' '}
        </Switch>{' '}
      </ErrorBoundary>
    );
  }
}

export default App;
