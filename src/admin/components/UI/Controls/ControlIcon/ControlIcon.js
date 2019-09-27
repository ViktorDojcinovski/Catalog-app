import React, { Component } from 'react';
import styled from 'styled-components';

import FontAwesomeIco from '../../FontAwesome/FontAwesomeIcon';

const StyledWrapper = styled.section`
  float: left;
  text-align: center;
  padding: 5px;
  margin: 0px 5px;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  .Edit,
  .Trash {
    float: right;
    color: #ccc;
    width: 100%;
    height: 100%;
  }
`;

class ControlIcon extends Component {
  onDragStart = event => {
    event.dataTransfer.setData('type', this.props.type);
  };

  render() {
    return (
      <StyledWrapper>
        <div
          draggable
          onClick={this.props.clicked}
          className={this.props.label}
          onDragStart={e => this.onDragStart(e)}
        >
          <FontAwesomeIco icon={this.props.icon} />
        </div>
      </StyledWrapper>
    );
  }
}

export default ControlIcon;
