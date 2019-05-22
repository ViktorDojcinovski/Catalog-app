import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import renderer from "react-test-renderer";

import CatalogueList from "../CatalogueList";

describe("Catalogue List section", function() {
  let mountedCatalogueList;
  beforeEach(() => {
    mountedCatalogueList = shallow(<CatalogueList />);
  });
  it("renders correctly", () => {
    const tree = renderer.create(<CatalogueList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders without crashing", () => {
    shallow(<CatalogueList />);
  });
  it("calls axios.get in #componentDidMount", () => {
    return mountedCatalogueList
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalled();
      });
  });
  it("calls axios.get with correct url", () => {
    return mountedCatalogueList
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalledWith(
          "http://localhost:3000/data/catalogues.json"
        );
      });
  });
  it("updaes the state with the data from the api endpoint", () => {
    return mountedCatalogueList
      .instance()
      .componentDidMount()
      .then(() => {
        expect(mountedCatalogueList.state()).toHaveProperty("catalogues", [
          {
            name: "Test name",
            type: "Test type"
          }
        ]);
      });
  });
});
