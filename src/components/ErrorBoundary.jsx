import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, color: "#991b1b" }}>
          <h3>Something went wrong on this page</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{String(this.state.error.message)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}