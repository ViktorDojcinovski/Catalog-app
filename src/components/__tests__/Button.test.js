import React from "react";
import { shallow } from "enzyme";

import Button from "../Button";

describe("Button", () => {
  let mountedButton;
  beforeEach(() => {
    mountedButton = shallow(<Button />);
  });
  it("renders without crashing", () => {
    let mountedButton = shallow(<Button />);
  });
  it("call a function passed to it when clicked", () => {
    const mockCallback = jest.fn();
    const mountedButtonWithCallback = shallow(
      <Button handleClick={mockCallback} />
    );
    mountedButtonWithCallback.find("button").simulate("click");
    expect(mockCallback.mock.calls.length).toEqual(1);
  });
});
