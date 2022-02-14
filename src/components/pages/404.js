import React from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";
function Page404(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Please try to reload the page!</h1>
      <ErrorMessage />
      <Link style={{ fontSize: "50px" }} to="/">Go Back!</Link>
    </div>
  );
}

export default Page404;
