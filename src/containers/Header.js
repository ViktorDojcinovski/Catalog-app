import React from "react";

import Logo from "../components/Logo";
import MainSearch from "../components/MainSearch";
import MainMenu from "../components/MainMenu";

class Header extends React.Component {
  render() {
    return (
      <div>
        <Logo />
        <MainSearch />
        <MainMenu />
      </div>
    );
  }
}

export default Header;
