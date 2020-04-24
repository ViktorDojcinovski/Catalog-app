import React, { Component } from "react";

import { Auth } from "../Auth/Auth";
import UserList from "./components/PartnerList";
import { Spinner } from "../components/UI/Spinner/Spinner";
import withDashboard from "../../hoc/withDashboard";

class UserListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(),
      loading: false,
      error: false,
      partners: [],
    };
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }
  componentDidMount() {
    this.setState({ loading: true });

    fetch(`${process.env.REACT_APP_API_URL}/admin/getPartners`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${this.state.auth.getAccessToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          error: false,
          loading: false,
          partners: data.filter((p) => !p.isSuperadmin),
        });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.error(error);
      });
  }
  onCheckboxChange(id, e) {
    fetch(`${process.env.REACT_APP_API_URL}/admin/changePartnerState`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${this.state.auth.getAccessToken()}`,
      },
      body: JSON.stringify({ id, isEnabled: e.target.checked }),
    })
      .then((response) => response.json())
      .then((partner) => {
        let updatedPartners = this.state.partners.map((p) => {
          if (p._id === partner._id) {
            return partner;
          } else {
            return p;
          }
        });
        this.setState({ partners: updatedPartners });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.error(error);
      });
  }
  render() {
    return (
      <>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <UserList {...this.state} onChange={this.onCheckboxChange} />
        )}
      </>
    );
  }
}

export default withDashboard(UserListContainer);
