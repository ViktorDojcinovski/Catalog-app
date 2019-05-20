import React from "react";
import { shallow } from "enzyme";

import Logo from "../Logo";

describe("Logo", () => {
  let mountedLogo;
  beforeEach(() => {
    mountedLogo = shallow(<Logo />);
  });
  it("renders without crashing", () => {
    let mountedLogo = shallow(<Logo />);
  });
  it("contains an image", () => {
    const img = mountedLogo.find("img");
    expect(img.length).toBe(1);
  });
});
