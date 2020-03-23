import React from "react";
import { graphql } from "gatsby";
import * as PropTypes from "prop-types";
import Main from "../components/Main/";
import { connect } from "react-redux";
require("prismjs/themes/prism-okaidia.css");

import { setNavigatorPosition, setNavigatorShape } from "../state/createStore";
import { moveNavigatorAside } from "../utils/shared";
import Post from "../components/Post/";
import Footer from "../components/Footer/";
import Seo from "../components/Seo";
import Layout from "../layouts";

class PostTemplate extends React.Component {
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
    const { data, pageContext } = this.props;
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;

    return (
      <Layout>
        <Main>
          <Post post={data.post} slug={pageContext.slug} author={data.author} facebook={facebook} />
          <Footer footnote={data.footnote} />
          <Seo data={data.post} facebook={facebook} />
        </Main>
      </Layout>
    );
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(PostTemplate);

export const pageQuery = graphql`
  query PostBySlug($slug: String) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      htmlAst
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        subTitle
        cover {
          childImageSharp {
            resize(width: 300) {
              src
            }
          }
        }
      }
    }
    author: markdownRemark(fields: { slug: { regex: "/author/" } }) {
      id
      html
    }
    footnote: markdownRemark(fields: { slug: { regex: "/author/" } }) {
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
