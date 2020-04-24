import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 260px);
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    margin-top: 150px;
  }
`;

export const Loader = props => <StyledWrapper></StyledWrapper>;
