import React from "react";

import { Dashboard } from "../admin/core/Dashboard";

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => (
    <>
      <Dashboard />
      <WrappedComponent {...props} />
    </>
  );

  return hocComponent;
};
