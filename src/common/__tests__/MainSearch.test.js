import React from "react";
import { shallow } from "enzyme";

import MainSearch from "../MainSearch";

describe("MainSearch", () => {
  let mountedMainSearch;
  beforeEach(() => {
    mountedMainSearch = shallow(<MainSearch />);
  });
  it("renders without crashing", () => {
    shallow(<MainSearch />);
  });
});
