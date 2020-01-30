import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContent = styled.div`
  height: calc(60vh - 235px);
  width: 900px;
  margin: 20vh auto;
  text-align: center;
`;

function Page404() {
  return (
    <>
      <StyledContent>
        <div>
          <h1> 404 Page </h1>{' '}
          <h4>
            Maybe somehow you lost your way!Let 's start from the beggining!{' '}
          </h4>{' '}
        </div>{' '}
        <Link to={'/'}> Home </Link>{' '}
      </StyledContent>{' '}
    </>
  );
}

export default Page404;
