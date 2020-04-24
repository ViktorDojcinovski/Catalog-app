import React, { useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const StyledWrapper = styled.div`
  width: 100%;
  margin-left: 0;
  @media screen and (min-width: 992px) {
    text-align: center;
    padding: 10px 10px 0 10px;
    width: 500px;
    margin-left: auto;
    text-align: center;
  }
`;

const StyledList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.4);
  width: 95vw;
  padding: 0;
  display: none;
  &.show {
    display: flex;
  }
  @media screen and (min-width: 992px) {
    display: flex;
    overflow: auto;
    clear: both;
    flex-direction: row;
    flex-flow: row wrap;
    justify-content: center;
    overflow: auto;
    width: 100%;
  }
`;
const StyledListElement = styled.li`
  position: relative;
  float: left;
  list-style: none;
  margin-right: 15px;
  padding: 5px 10px;
  border-bottom: transparent;
  a {
    color: black;
    text-decoration: none;
  }
  .is-active {
    color: black;
    font-weight: bold;
    line-height: 16px;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: rgba(194, 216, 45, 0.8);
    }
  }
`;

const Bars = styled.li`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  @media screen and (min-width: 992px) {
    display: none;
  }
`;

export function MainMenu() {
  const links = useRef();

  const onClick = () => {
    console.log(links.current);
    links.current.classList.toggle("show");
  };

  return (
    <StyledWrapper>
      <StyledList ref={links}>
        <StyledListElement>
          <NavLink to="/" exact activeClassName="is-active">
            Latest Catalogs
          </NavLink>
        </StyledListElement>
        <StyledListElement>
          <NavLink to="/magazines" activeClassName="is-active">
            Magazines
          </NavLink>
        </StyledListElement>
        <StyledListElement> About </StyledListElement>
        <StyledListElement> Contact </StyledListElement>
      </StyledList>
      <Bars onClick={onClick}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </Bars>
    </StyledWrapper>
  );
}
