import React from "react";
import styled from "styled-components";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

const StyledWrapper = styled.div`
  width: 100%;
  margin: 40px auto;
  text-align: center;
  overflow: auto;
  @media screen and (min-width: 992px) {
    width: 992px;
  }

  h4 {
    color: #aaa;
    font-size: 1.2rem;
    margin-right: 10px;
    display: inline-block;
  }
  > div {
    width: 20px;
    margin-right: 10px;
    display: inline-block;
    cursor: pointer;
    &.facebook {
      svg {
        color: #3b5999;
      }
    }
    &.twitter {
      svg {
        color: #1da1f2;
      }
    }
  }
  button {
    font-size: 14px;
  }
`;

export const SocialButtons = (props) => {
  let url = `http://localhost:3002/catalog/${props.id}`;

  return (
    <StyledWrapper>
      <h4> Share: </h4>{" "}
      <FacebookShareButton
        className="facebook"
        children={<FontAwesomeIcon icon={faFacebook} />}
        url={url}
        btnType="fbShare"
      />
      <TwitterShareButton
        className="twitter"
        children={<FontAwesomeIcon icon={faTwitter} />}
        url={url}
        btnType="fbShare"
      />
    </StyledWrapper>
  );
};
