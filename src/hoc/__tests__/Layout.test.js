import React from "react";
import { shallow } from "enzyme";

import Layout from "../Layout";

describe("HOC Layout", () => {
  let mountedLayout;
  beforeEach(() => {
    mountedLayout = shallow(<Layout />);
  });
  it("renders without crashing", () => {
    shallow(<Layout />);
  });
  it("renders a Header", () => {
    let mountedLayout = shallow(<Layout />);
    const header = mountedLayout.find("Header");
    expect(header.length).toBe(1);
  });
  it("renders a Footer", () => {
    let mountedLayout = shallow(<Layout />);
    const footer = mountedLayout.find("Footer");
    expect(footer.length).toBe(1);
  });
});
