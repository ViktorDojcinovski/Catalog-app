import React from "react";
import { shallow } from "enzyme";

import Footer from "../Footer";

describe("Footer", () => {
  let mountedFooter;
  beforeEach(() => {
    mountedFooter = shallow(<Footer />);
  });
  it("renders without crashing", () => {
    shallow(<Footer />);
  });
});
