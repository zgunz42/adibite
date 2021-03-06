import React from "react";
import { connect } from "react-redux";
import { graphql } from "gatsby";
import * as PropTypes from "prop-types";

import { setNavigatorPosition, setNavigatorShape } from "../state/createStore";
import { featureNavigator } from "../utils/shared";
import Seo from "../components/Seo";
import Layout from "../layouts";

class Index extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.featureNavigator = featureNavigator.bind(this);
  }

  componentDidMount() {
    if (this.props.navigatorPosition !== "is-featured") {
      this.props.setNavigatorPosition("is-featured");
    }
  }

  render() {
    const { data } = this.props;
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;

    return (
      <Layout>
        <Seo facebook={facebook} />
      </Layout>
    );
  }
}

Index.propTypes = {
  data: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  setNavigatorPosition: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
