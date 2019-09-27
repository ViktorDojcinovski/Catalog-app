import React from 'react';
import styled from 'styled-components';

import EditCatalogueControls from '../../../components/UI/Controls/EditCatalogueControls';

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
      .catalogueControls {
        display: block;
      }
    }
  }
  .list_item_name {
    float: left;
    font-size: 30px;
    font-weight: bold;
    color: #ccc;
  }
  .catalogueControls {
    display: none;
  }
`;

const catalogueListItem = props => {
  return (
    <StyledListItem>
      <div>
        <div className='list_item_name'>{props.name}</div>
        <div className='catalogueControls'>
          <EditCatalogueControls
            deleteHandler={props.deleteCatalogue}
            editHandler={props.editCatalogue}
          />
        </div>
      </div>
    </StyledListItem>
  );
};

export default catalogueListItem;
