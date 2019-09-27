import React, { Component } from 'react';
import styled from 'styled-components';

import Logo from '../../components/Logo';
import MainAdminMenu from './MainAdminMenu';

const StyledWrapper = styled.div`
  text-align: center;
  padding: 10px 10px 0 10px;
  width: 100%;
  margin-left: auto;
  text-align: center;
`;

const MenuHolder = styled.div`
  max-width: 1210px;
  margin: 0 auto;
`;

const LogoHolder = styled.div`
  overflow: visible;
  clear: both;
  width: 200px;
  margin: 0 auto;
`;

class AdminHeader extends Component {
  render() {
    return (
      <StyledWrapper>
        <MenuHolder>
          <MainAdminMenu auth={this.props.auth} />
        </MenuHolder>
        <LogoHolder>
          <Logo />
          <div style={{ clear: 'both' }} />
        </LogoHolder>
      </StyledWrapper>
    );
  }
}

export default AdminHeader;
