import React from "react";
import styled from "styled-components";

import ad_bg from "../../assets/bright-squares.png";

const StyledWrapper = styled.div`
  position: relative;
  border: 1px dashed #ccc;
  opacity: 0.7;
  &:after {
    content: "";
    background-image: url(${ad_bg});
    opacity: 0.4;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
  h2 {
    font-size: 20px;
    font-family: "Franklin Gothic Narrow", "Arial Narrow", Arial, sans-serif;
    font-weight: normal;
    color: rgba(20, 20, 20, 0.4);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    strong {
      font-size: 24px;
      font-weight: bold;
      color: white;
      background-color: rgba(136, 109, 177, 0.65);
      padding: 2px 20px;
      border-bottom-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
  &#top_ad {
    width: 100%;
    height: 100px;
  }
  &#filters_ad {
    width: 100%;
    height: 260px;
    h2 {
      strong {
        padding: 2px 10px;
      }
    }
  }
`;

export const Ad = (props) => {
  return (
    <StyledWrapper id={props.id}>
      <h2>
        PLACE FOR <br />
        <strong> YOUR AD </strong> <br />
        HERE{" "}
      </h2>{" "}
    </StyledWrapper>
  );
};
