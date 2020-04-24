import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import CatalogList from './CatalogList';

describe('Catalog List section', function() {
  let mountedCatalogList;
  beforeEach(() => {
    mountedCatalogList = shallow(<CatalogList />, {
      disableLifecycleMethods: true
    });
  });
  it('renders without crashing', () => {
    shallow(<CatalogList />);
  });
  it('calls axios.all once in #componentDidMount', () => {
    expect(axios.all).toHaveBeenCalledTimes(1);
  });
  it('calls axios.all with correct parametars #axios.get and #axios.get', () => {
    expect(axios.all).toHaveBeenCalledWith([axios.get(), axios.post()]);
  });
});
