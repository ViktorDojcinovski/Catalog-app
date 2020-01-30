import React, { Component } from 'react';
import styled from 'styled-components';

import { Logo } from '../../common/Logo';
import { MainAdminMenu } from './MainAdminMenu';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  width: 220px;
  height: 100vh;
  margin: 0;
  padding-top: 20px;
  float: left;
  background-color: #242e42;
`;

const MenuHolder = styled.div`
  text-align: center;
  padding: 10px 10px 0 10px;
  width: 100%;
  height: 90%;
  margin-left: auto;
`;

const LogoHolder = styled.div`
  overflow: visible;
  clear: both;
  width: 200px;
  margin: 0 auto;
`;

export class Dashboard extends Component {
  render() {
    return (
      <StyledWrapper>
        <LogoHolder>
          <Logo />
          <div style={{ clear: 'both' }} />{' '}
        </LogoHolder>{' '}
        <MenuHolder>
          <MainAdminMenu />
        </MenuHolder>{' '}
      </StyledWrapper>
    );
  }
}
