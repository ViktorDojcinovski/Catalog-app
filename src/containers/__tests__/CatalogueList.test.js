import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import CatalogueList from "../CatalogueList";

describe("Catalogue List section", function() {
  let catalogueList;
  let mountedCatalogueList;
  beforeEach(() => {
    catalogueList = shallow(
      <BrowserRouter>
        <CatalogueList />
      </BrowserRouter>
    );
    mountedCatalogueList = shallow(<CatalogueList />);
  });
  it("renders correctly", () => {
    const tree = renderer.create(catalogueList).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders without crashing", () => {
    shallow(
      <BrowserRouter>
        <CatalogueList />
      </BrowserRouter>
    );
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
          "http://localhost:8001/catalogues"
        );
      });
  });
  it("updates the state with the data from the api endpoint", () => {
    return mountedCatalogueList
      .instance()
      .componentDidMount()
      .then(() => {
        expect(mountedCatalogueList.state()).toHaveProperty("catalogues", [
          {
            id: 1,
            name: "Test name",
            type: "Test type",
            images: ["image_1.png", "image_2.png"]
          }
        ]);
      });
  });
});
