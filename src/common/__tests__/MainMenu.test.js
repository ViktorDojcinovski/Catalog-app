import React from "react";
import { shallow } from "enzyme";

import MainMenu from "../MainMenu";

describe("MainMenu", () => {
  let mountedMainMenu;
  beforeEach(() => {
    mountedMainMenu = shallow(<MainMenu />);
  });
  it("renders without crashing", () => {
    shallow(<MainMenu />);
  });
});
