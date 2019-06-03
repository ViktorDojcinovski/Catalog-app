import React from "react";
import { shallow } from "enzyme";
import axios from "axios";

import Catalogue from "../Catalogue";

describe("Single Catalogue", () => {
  let mountedCatalogue;

  beforeEach(() => {
    mountedCatalogue = shallow(<Catalogue match={{ params: { id: 1 } }} />);
  });
  it("renders without crashing", () => {
    shallow(<Catalogue match={{ params: { id: 1 } }} />);
  });
  it("calls axios.get in #componentDidMount", () => {
    return mountedCatalogue
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalled();
      });
  });
  it("calls axios.get with correct url", () => {
    return mountedCatalogue
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalledWith(
          "http://localhost:8001/catalogue/1"
        );
      });
  });
  //   it("updates the state with the data from the api endpoint", () => {
  //     return mountedCatalogue
  //       .instance()
  //       .componentDidMount()
  //       .then(() => {
  //         expect(mountedCatalogue.state()).toHaveProperty("catalogue", {
  //           id: 1,
  //           name: "Test name",
  //           type: "Test type",
  //           images: ["image_1.png", "image_2.png"]
  //         });
  //       });
  //   });
});
