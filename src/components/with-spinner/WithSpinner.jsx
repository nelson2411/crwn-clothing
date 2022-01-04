import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./withSpinner.styles";

const WithSpinner =
  (wrappedComponent) =>
  ({ isloading, ...otherProps }) => {
    return isloading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <wrappedComponent {...otherProps} />
    );
  };

export default WithSpinner;
