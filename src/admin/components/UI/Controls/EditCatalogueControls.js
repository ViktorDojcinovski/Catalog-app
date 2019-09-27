import React from 'react';
import styled from 'styled-components';

import ControlIcon from './ControlIcon/ControlIcon';

const StyledWrapper = styled.section`
  & > div {
    margin: 5px 0 0 10px;
    float: right;
    font-size: 14px;
  }
`;

const components = [
  {
    label: 'Trash',
    icon: 'trash',
    type: 'trash'
  },
  {
    label: 'Edit',
    icon: 'edit',
    type: 'edit'
  }
];

const editControls = props => {
  return (
    <StyledWrapper>
      <div>
        {components.map(comp => {
          return (
            <ControlIcon
              key={comp.label}
              label={comp.label}
              icon={comp.icon}
              type={comp.type}
              clicked={
                comp.type === 'edit' ? props.editHandler : props.deleteHandler
              }
            />
          );
        })}
      </div>
    </StyledWrapper>
  );
};

export default editControls;
