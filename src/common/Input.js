import React, { Component } from "react";
import styled from "styled-components";

const StyledInputWrapper = styled.div`
  float: left;
  width: 100%;
  margin-right: 2.5%;
  margin-bottom: 20px;
  input {
    width: 100%;
    border: transparent;
    border-bottom: 1px solid #ccc;
    padding: 4px 10px;
  }
  select {
    display: block;
    width: 100%;
    border: transparent;
    border-bottom: 1px solid #ccc;
    padding: 4px 10px;
  }
  label {
    display: block;
    padding-left: 10px;
    font-weight: bold;
  }
`;

export class Input extends Component {
  render() {
    let inputElement = null;

    switch (this.props.elementType) {
      case "input":
        inputElement = (
          <input
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changed}
          />
        );
        break;
      case "textarea":
        inputElement = (
          <textarea
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changed}
          />
        );
        break;
      case "select":
        inputElement = (
          <select value={this.props.value} onChange={this.props.changed}>
            {" "}
            <option value="">Set type</option>
            {this.props.elementConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {" "}
                {option.displayValue}{" "}
              </option>
            ))}{" "}
          </select>
        );
        break;
      default:
        inputElement = (
          <input
            value={this.props.value}
            {...this.props.elementConfig}
            onChange={this.props.changed}
          />
        );
    }

    return (
      <StyledInputWrapper>
        <label> {this.props.elementConfig.label} </label> {inputElement}{" "}
      </StyledInputWrapper>
    );
  }
}
