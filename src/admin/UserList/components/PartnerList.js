import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../../Auth/AuthContext";

import "./PartnerList.scss";

function UserList({ partners, onChange }) {
  const a = useContext(AuthContext);

  return a.isEnabled() ? (
    <>
      {partners.map((partner) => {
        return (
          <li key={partner._id}>
            <h2>{partner.email}</h2>
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e) => onChange(partner._id, e)}
                checked={partner.isEnabled}
              />
              <span className="slider"></span>
            </label>
          </li>
        );
      })}
    </>
  ) : (
    <Redirect to={"/admin"} />
  );
}

UserList.propTypes = {
  partners: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UserList;
