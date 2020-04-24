import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import MagazineList from './MagazineList';

describe('<Partner />', function() {
  let mountedCatalogList;

  beforeEach(() => {
    mountedCatalogList = shallow(
      <MagazineList match={{ params: { id: 1 } }} />,
      {
        disableLifecycleMethods: true
      }
    );
  });

  it('renders without crashing', () => {
    shallow(<MagazineList match={{ params: { id: 1 } }} />);
  });

  it('calls axios.get in #componentDidMount', () => {
    expect(axios.get).toHaveBeenCalled();
  });

  it('calls axios.get with correct url', () => {
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/partners`
    );
  });

  it('updates the state with the data from the api endpoint', async () => {
    await mountedCatalogList.instance().componentDidMount();

    expect(mountedCatalogList.state()).toHaveProperty('partners', [
      {
        id: 1,
        name: 'Test name',
        type: 'Test type',
        images: ['image_1.png', 'image_2.png']
      }
    ]);
  });
});
