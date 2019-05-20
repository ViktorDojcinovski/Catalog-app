import React from "react";
import { shallow } from "enzyme";

import CatalogueList from "../CatalogueList";

describe("Catalogue List section", function() {
  it("renders without crashing", () => {
    let mountedCatalogueList = shallow(<CatalogueList />);
  });
});
