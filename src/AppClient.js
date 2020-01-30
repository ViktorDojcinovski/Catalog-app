import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Header } from './core/Header';
import { Footer } from './core/Footer';
import { Page } from './Page404/Page';

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

export class AppClient extends Component {
  render() {
    const route_prefix = this.props.match.url;

    return (
      <>
        <Header />
        <Suspense fallback={<div> Loading </div>}>
          <Switch>
            <Route
              path={route_prefix}
              exact
              component={lazy(() => import('./CatalogList/CatalogList'))}
            />{' '}
            <Route
              path={route_prefix + 'catalog/:id'}
              component={lazy(() => import('./Catalog/Catalog'))}
            />{' '}
            <Route
              path={route_prefix + 'magazines'}
              component={lazy(() => import('./MagazineList/MagazineList'))}
            />{' '}
            <Route
              path={route_prefix + 'magazine/:id'}
              component={lazy(() => import('./Partner/Partner'))}
            />{' '}
            <Route component={Page} />{' '}
          </Switch>
        </Suspense>
        <Footer />
      </>
    );
  }
}
