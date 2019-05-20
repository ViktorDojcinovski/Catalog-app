import React from "react";
import { shallow } from "enzyme";

import App from "../App";
import { exportAllDeclaration } from "@babel/types";

describe("App", function() {
  it("renders without crashing", () => {
    let mountedApp = shallow(<App />);
  });

  it("renders a Header", () => {
    let mountedApp = shallow(<App />);
    const headers = mountedApp.find("Header");
    expect(headers.length).toBe(1);
  });
});
