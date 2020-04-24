import React, { Component } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../Auth/AuthContext";
import withDashboard from "../../hoc/withDashboard";

class Home extends Component {
  static contextType = AuthContext;

  render() {
    const { isEnabled, login } = this.context;
    return (
      <div>
        <h1> Home </h1>{" "}
        {isEnabled() ? (
          <Link to="/admin/profile"> View profile </Link>
        ) : (
          <button onClick={login}> Log In </button>
        )}{" "}
      </div>
    );
  }
}

export default withDashboard(Home);
