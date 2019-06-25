import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledWrapper = styled.div`
  text-align: center;
  padding: 10px 10px 0 10px;
  width: 400px;
  margin-left: auto;
  text-align: center;
`;

const StyledList = styled.ul`
  overflow: auto;
  clear: both;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  overflow: auto;
  width: 100%;
`;
const StyledListElement = styled.li`
  position: relative;
  float: left;
  list-style: none;
  margin-right: 15px;
  padding: 5px 10px;
  border-bottom: transparent;
  .is-active {
    color: black;
    font-weight: bold;
    line-height: 16px;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: rgba(194, 216, 45, 0.8);
    }
  }
`;

class MainMenu extends Component {
  render() {
    const { isAuthenticated, login, logout, userHasScopes } = this.props.auth;

    return (
      <StyledWrapper>
        <StyledList>
          <StyledListElement>
            <NavLink to="/admin" activeClassName="is-active">
              Home
            </NavLink>
          </StyledListElement>
          <StyledListElement>
            <NavLink to="/admin/profile" activeClassName="is-active">
              Profile
            </NavLink>
          </StyledListElement>
          <StyledListElement>
            <NavLink to="/admin/public" activeClassName="is-active">
              Public
            </NavLink>
          </StyledListElement>
          {isAuthenticated() && (
            <StyledListElement>
              <NavLink to="/admin/private" activeClassName="is-active">
                Private
              </NavLink>
            </StyledListElement>
          )}
          {isAuthenticated() && userHasScopes(["read:courses"]) && (
            <StyledListElement>
              <NavLink to="/admin/course" activeClassName="is-active">
                Courses
              </NavLink>
            </StyledListElement>
          )}
          <StyledListElement>
            <button onClick={isAuthenticated() ? logout : login}>
              {" "}
              {isAuthenticated() ? "Log Out" : "Log In"}{" "}
            </button>{" "}
          </StyledListElement>
        </StyledList>
      </StyledWrapper>
    );
  }
}

export default MainMenu;
