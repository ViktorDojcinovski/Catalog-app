import React, { Component } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  > div {
    position: relative;
    box-sizing: border-box;
    margin: 20px;
    padding: 10px;
    width: auto;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    background-size: 40px 40px;
    background-position: center left;
    background-repeat: no-repeat;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    float: left;
    transition: all 0.1s;
    &:hover {
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.4);
      transform: scale(1.02);
      transition: all 0.1s;
    }
  }
  h2 {
    color: black;
    font-size: 16px;
    line-height: 20px;
    font-weight: bold;
    text-align: left;
    width: 100%;
    padding-left: 40px;
  }
`;

export class MagazineAbstract extends Component {
  header;
  background = '';

  render() {
    if (this.props) {
      this.header = !this.props.partner.prefferedName
        ? 'Test phase header'
        : this.props.partner.prefferedName;
    }
    if (this.props.partner.customAvatar) {
      this.background = `${process.env.REACT_APP_API_URL}/uploads/avatars/${this.props.partner.customAvatar}`;
    }
    return (
      <StyledWrapper>
        <div
          style={{
            backgroundImage: `url(${this.background})`
          }}
        >
          <h2> {this.header} </h2>
        </div>
      </StyledWrapper>
    );
  }
}
