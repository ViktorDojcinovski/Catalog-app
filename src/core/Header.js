import React, { Component } from 'react';
import styled from 'styled-components';

import { Logo } from '../common/Logo';
import { MainMenu } from '../common/MainMenu';

const StyledWrapper = styled.div`
  background-color: rgba(255, 255, 255, 1);
  padding: 10px 10px 0 10px;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  margin: 0 auto;
  overflow: auto;
  > div {
    width: 900px;
    margin: 0 auto;
  }
`;

const LogoHolder = styled.div`
  overflow: visible;
  width: 300px;
  float: left;
`;

const MenuHolder = styled.div`
  width: 600px;
  margin: 0 auto;
  float: left;
`;

export class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState({
      loading: false
    });
  }
  render() {
    return (
      <StyledWrapper>
        <div>
          <LogoHolder>
            <Logo />
            <div style={{ clear: 'both' }} />{' '}
          </LogoHolder>{' '}
          <MenuHolder>
            <MainMenu />
          </MenuHolder>{' '}
        </div>{' '}
      </StyledWrapper>
    );
  }
}
