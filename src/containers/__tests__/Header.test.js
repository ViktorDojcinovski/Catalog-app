import React from "react";
import { shallow } from "enzyme";

import Header from "../Header";

describe("Header", function() {
  let mountedHeader;
  beforeEach(() => {
    mountedHeader = shallow(<Header />);
  });
  it("renders without crashing", () => {
    shallow(<Header />);
  });
  it("renders a Logo", () => {
    const logo = mountedHeader.find("Logo");
    expect(logo.length).toBe(1);
  });
  it("renders a MainSearch", () => {
    const mainSearch = mountedHeader.find("MainSearch");
    expect(mainSearch.length).toBe(1);
  });
  it("renders a MainMenu", () => {
    const mainMenu = mountedHeader.find("MainMenu");
    expect(mainMenu.length).toBe(1);
  });
});
