import React from "react";

// eslint-disable-next-line require-jsdoc
export default function asyncComponent(getComponent, loadingComponent) {
  // eslint-disable-next-line require-jsdoc
  class AsyncComponent extends React.Component {
    state = { Component: null };

    // eslint-disable-next-line require-jsdoc
    componentDidMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          this.setState({ Component });
        });
      }
    }
    // eslint-disable-next-line require-jsdoc
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return loadingComponent ? loadingComponent : <div>Loading...</div>;
    }
  }
  return AsyncComponent;
}
