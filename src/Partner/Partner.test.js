import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import Partner from './Partner';

describe('<Partner />', function() {
  let mountedCatalogList;

  beforeEach(() => {
    mountedCatalogList = shallow(<Partner match={{ params: { id: 1 } }} />, {
      disableLifecycleMethods: true
    });
  });

  it.only('renders without crashing', () => {
    shallow(<Partner match={{ params: { id: 1 } }} />);
  });

  it.only('calls axios.all only once in #componentDidMount', () => {
    expect(axios.all).toHaveBeenCalledTimes(1);
  });

  it.only('calls axios.get only once in #componentDidMount with correct Url', () => {
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/partner/1`
    );
  });

  it.only('calls axios.post only once in #componentDidMount with correct Url', () => {
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(
      axios.post
    ).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/catalogs/partner/1`,
      { id: 1 }
    );
  });

  it.only('calls axios.get with two parametars, #axios.get and #axios.post', () => {
    expect(axios.all).toHaveBeenCalledWith([axios.get(), axios.post()]);
  });
});
