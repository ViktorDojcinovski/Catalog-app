import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Input } from 'reactstrap';
import styled from 'styled-components';

const StyledInputGroup = styled(InputGroup)`
  float: left;
  width: 100%;
  height: 40px;
  margin-right: 0;
  input {
    text-align: center;
    font-size: 12px;
    height: 38px;
    border-radius: 0;
    border: 3px solid #cee057;
  }
`;

export function MainSearch(props) {
  return (
    <StyledInputGroup>
      <Input placeholder='rapid filter' onChange={props.onSearchChange} />{' '}
    </StyledInputGroup>
  );
}

MainSearch.propTypes = {
  onSearchChange: PropTypes.func.isRequired
};
