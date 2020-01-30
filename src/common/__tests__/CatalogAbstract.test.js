import React from 'react';
import { shallow } from 'enzyme';

import CatalogAbstract from '../CatalogAbstract';

describe('CatalogAbstract', () => {
  beforeEach(() => {
    let props = {
      name: 'Test Catalog',
      type: 'Test Type'
    };
    shallow(<CatalogAbstract {...props} />);
  });
  it('renders without crashing', () => {
    shallow(<CatalogAbstract />);
  });
});
