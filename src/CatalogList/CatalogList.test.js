import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import CatalogList from '../../CatalogList/CatalogList';

describe('Catalog List section', function() {
  let catalogList;
  let mountedCatalogList;
  beforeEach(() => {
    catalogList = shallow(
      <BrowserRouter>
        <CatalogList />
      </BrowserRouter>
    );
    mountedCatalogList = shallow(<CatalogList />);
  });
  it('renders correctly', () => {
    const tree = renderer.create(catalogList).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    shallow(
      <BrowserRouter>
        <CatalogList />
      </BrowserRouter>
    );
  });
  it('calls axios.get in #componentDidMount', () => {
    return mountedCatalogList
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalled();
      });
  });
  it('calls axios.get with correct url', () => {
    return mountedCatalogList
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalledWith(
          'http://localhost:8001/catalogs'
        );
      });
  });
  it('updates the state with the data from the api endpoint', () => {
    return mountedCatalogList
      .instance()
      .componentDidMount()
      .then(() => {
        expect(mountedCatalogList.state()).toHaveProperty('catalogs', [
          {
            id: 1,
            name: 'Test name',
            type: 'Test type',
            images: ['image_1.png', 'image_2.png']
          }
        ]);
      });
  });
});
