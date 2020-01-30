import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../Auth/AuthContext';

const StyledWrapper = styled.div`
  padding: 10px 10px 0 10px;
  width: 100%;
  height: 100%;
  margin-left: auto;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;
  height: 100%;
  overflow: auto;
  justify-content: flex-start;
`;
const StyledListElement = styled.li`
  position: relative;
  float: left;
  list-style: none;
  margin-right: 15px;
  padding: 5px 10px;
  border-bottom: transparent;
  text-align: left;
  a {
    color: #fefefe;
    text-decoration: none;
  }
  .is-active {
    color: #888;
    font-size: 18px;
    padding-left: 5px;
    font-weight: bold;
    line-height: 16px;
  }
  :last-child {
    position: absolute;
    bottom: 40px;
    button {
      background-color: #f15a24;
      border: none;
      border-radius: 3px;
      color: white;
      padding: 10px 20px;
      font-weight: bold;
    }
  }
`;

export class MainAdminMenu extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated, login, logout, userHasScopes } = this.context;

    return (
      <StyledWrapper>
        <StyledList>
          <StyledListElement>
            <NavLink to='/admin' exact activeClassName='is-active'>
              Home{' '}
            </NavLink>{' '}
          </StyledListElement>{' '}
          <StyledListElement>
            <NavLink to='/admin/profile' activeClassName='is-active'>
              Profile{' '}
            </NavLink>{' '}
          </StyledListElement>{' '}
          {isAuthenticated() && (
            <StyledListElement>
              <NavLink to='/admin/new-catalog' activeClassName='is-active'>
                New Catalog{' '}
              </NavLink>{' '}
            </StyledListElement>
          )}{' '}
          {isAuthenticated() && (
            <StyledListElement>
              <NavLink to='/admin/catalog-list' activeClassName='is-active'>
                Catalog List{' '}
              </NavLink>{' '}
            </StyledListElement>
          )}{' '}
          {isAuthenticated() && userHasScopes(['read:courses']) && (
            <StyledListElement>
              <NavLink to='/admin/course' activeClassName='is-active'>
                Courses{' '}
              </NavLink>{' '}
            </StyledListElement>
          )}{' '}
          <StyledListElement>
            <button onClick={isAuthenticated() ? logout : login}>
              {' '}
              {isAuthenticated() ? 'Log Out' : 'Log In'}{' '}
            </button>{' '}
          </StyledListElement>{' '}
        </StyledList>{' '}
      </StyledWrapper>
    );
  }
}
