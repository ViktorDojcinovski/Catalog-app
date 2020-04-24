import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Header } from "../core/Header";
import { Footer } from "../core/Footer";

const StyledContent = styled.div`
  height: calc(60vh - 235px);
  width: 992px;
  margin: 20vh auto;
  text-align: center;
`;

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return (
        <>
          <Header />
          <StyledContent>
            <div>
              <h1> Something went wrong. </h1>{" "}
              <details style={{ whiteSpace: "pre-wrap" }}></details>{" "}
            </div>{" "}
            <Link to={"/"}> Home </Link>{" "}
          </StyledContent>{" "}
          <Footer />
        </>
      );
    }

    return this.props.children;
  }
}
