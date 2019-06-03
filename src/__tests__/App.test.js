import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import App from "../App";

describe("App", function() {
  let app = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  it("renders without crashing", () => {
    shallow(app);
  });
});
