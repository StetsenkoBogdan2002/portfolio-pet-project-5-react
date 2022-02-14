import React, { Component } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };
  }
  componentDidCatch = (err, info) => {
    this.setState({ error: true });
  };
  render() {
    if (this.state.error) {
      return <ErrorMessage/>
    }
    return this.props.children;
  }
}
