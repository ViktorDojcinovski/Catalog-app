import React, { Component } from 'react';
import styled from 'styled-components';

import { EditCatalogControl } from '../../components/UI/Controls/EditCatalogControl';

const StyledListItem = styled.section`
  & > div {
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    border: 1px solid #eee;
    border-radius: 4px;
    margin: 5px;
    padding: 5px 10px;
    transition: all 0.1s;
    &:hover {
      width: 100%;
      height: 56px;
      box-sizing: border-box;
      background-color: #eee;
      border: 1px solid #ccc;
      .catalogControls {
        display: block;
      }
    }
  }
  .list_item_name {
    float: left;
    font-size: 30px;
    font-weight: bold;
    color: #444;
    cursor: pointer;
  }
  .catalogControls {
    display: none;
  }
`;

export class CatalogListItem extends Component {
  render() {
    return (
      <StyledListItem>
        <div className='admin-area-content-section'>
          <div className='list_item_name' onClick={this.props.editCatalog}>
            {' '}
            {this.props.name}{' '}
          </div>{' '}
          <div className='catalogControls'>
            <EditCatalogControl
              deleteHandler={this.props.deleteCatalog}
              editHandler={this.props.editCatalog}
            />{' '}
          </div>{' '}
        </div>{' '}
      </StyledListItem>
    );
  }
}
