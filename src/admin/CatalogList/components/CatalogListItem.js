import React from 'react';
import styled from 'styled-components';

import { EditCatalogControls } from '../../components/UI/Controls/EditCatalogControls';

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

export const CatalogListItem = props => {
  return (
    <StyledListItem>
      <div className='admin-area-content-section'>
        <div className='list_item_name' onClick={props.editCatalog}>
          {' '}
          {props.name}{' '}
        </div>{' '}
        <div className='catalogControls'>
          <EditCatalogControls
            deleteHandler={props.deleteCatalog}
            editHandler={props.editCatalog}
          />{' '}
        </div>{' '}
      </div>{' '}
    </StyledListItem>
  );
};
