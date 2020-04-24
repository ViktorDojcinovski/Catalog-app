import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import Catalog from './Catalog';

describe.only('<Catalog />', () => {
  let mountedCatalog;

  beforeAll(() => {
    mountedCatalog = shallow(<Catalog match={{ params: { id: 1 } }} />, {
      disableLifecycleMethods: true
    });
  });

  beforeEach(() => {});

  afterEach(() => {
    //mountedCatalog.unmount();
  });

  it('renders without crashing', () => {
    shallow(<Catalog match={{ params: { id: 1 } }} />);
  });

  it('calls axios.get inside #componentDidMount', () => {
    expect(axios.get).toHaveBeenCalled();
  });

  it('calls axios.get once inside #componentDidMount', () => {
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('calls axios.get with correct url', () => {
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/catalog/1`
    );
  });

  it('updates the state with the data from the api endpoint', async () => {
    expect.assertions(1);

    return mountedCatalog
      .instance()
      .componentDidMount()
      .then(() => {
        expect(mountedCatalog.state()).toHaveProperty('catalog', {
          id: 1,
          name: 'Test name',
          type: 'Test type',
          images: ['image_1.png', 'image_2.png']
        });
      });
  });
  it.only('creates filename from input given', function() {
    let filename = 'document.pdf';
    let generatedInput = mountedCatalog
      .instance()
      .createNameFromInput('document');

    expect(generatedInput).toEqual(filename);
  });
});
