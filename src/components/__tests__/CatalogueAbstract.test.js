import React from 'react';
import { shallow } from 'enzyme';

import CatalogueAbstract from '../CatalogueAbstract';

describe('CatalogueAbstract', () => {
  let mountedCatalogueAbstract;

  beforeEach(() => {
    let props = {
      name: 'Test Catalogue',
      type: 'Test Type'
    };
    mountedCatalogueAbstract = shallow(<CatalogueAbstract {...props} />);
  });
  it('renders without crashing', () => {
    shallow(<CatalogueAbstract />);
  });
});
