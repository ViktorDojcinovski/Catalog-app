import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import Catalog from './Catalog';

describe('Single Catalog', () => {
  let mountedCatalog;

  beforeEach(() => {
    mountedCatalog = shallow(<Catalog match={{ params: { id: 1 } }} />);
  });
  it('renders without crashing', () => {
    shallow(<Catalog match={{ params: { id: 1 } }} />);
  });
  it('calls axios.get in #componentDidMount', () => {
    return mountedCatalog
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalled();
      });
  });
  it('calls axios.get with correct url', () => {
    return mountedCatalog
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalledWith(
          'http://localhost:8001/catalog/1'
        );
      });
  });
  //   it("updates the state with the data from the api endpoint", () => {
  //     return mountedCatalog
  //       .instance()
  //       .componentDidMount()
  //       .then(() => {
  //         expect(mountedCatalog.state()).toHaveProperty("catalog", {
  //           id: 1,
  //           name: "Test name",
  //           type: "Test type",
  //           images: ["image_1.png", "image_2.png"]
  //         });
  //       });
  //   });
});
