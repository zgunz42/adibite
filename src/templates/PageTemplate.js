import React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { graphql } from "gatsby";

import { setNavigatorPosition, setNavigatorShape } from "../state/createStore";
import { moveNavigatorAside } from "../utils/shared";
import Main from "../components/Main/";
import Page from "../components/Page/";
import Footer from "../components/Footer/";
import Seo from "../components/Seo";

class PageTemplate extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.moveNavigatorAside = moveNavigatorAside.bind(this);
  }

  componentDidMount() {
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside();
    }
  }

  render() {
    const { data } = this.props;
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;

    return (
      <Main>
        <Page page={data.page} />
        <Footer footnote={data.footnote} />
        <Seo data={data.post} facebook={facebook} />
      </Main>
    );
  }
}

PageTemplate.propTypes = {
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

// eslint-disable-next-line react/prop-types
// const HocPageTemplate = ({ children, ...props }) => {
//   const passProps = { ...props, data };
//   return <PageTemplate {...passProps}>{children}</PageTemplate>;
// };

export default connect(mapStateToProps, mapDispatchToProps)(PageTemplate);

export const pageQuery = graphql`
  query PageByPath($slug: String) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
    footnote: markdownRemark(fields: { slug: { regex: "/footnote/" } }) {
      id
      html
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
