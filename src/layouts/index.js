import React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";

import theme from "../styles/theme";

import { setFontSizeIncrease, setIsWideScreen } from "../state/createStore";

import Loading from "../components/common/Loading";
import Navigator from "../components/Navigator";
import ActionsBar from "../components/ActionsBar";
import InfoBar from "../components/InfoBar";
import LayoutWrapper from "../components/LayoutWrapper";

import { isWideScreen, timeoutThrottlerHandler } from "../utils/helpers";
import { graphql, useStaticQuery } from "gatsby";
import asyncComponent from "../components/common/AsyncComponent";

const InfoBox = asyncComponent(
  () =>
    import("../components/InfoBox")
      .then(module => {
        return module;
      })
      .catch(error => {}),
  <Loading
    overrides={{ width: `${theme.info.sizes.width}px`, height: "100vh", right: "auto" }}
    afterRight={true}
  />
);

// eslint-disable-next-line require-jsdoc
function Layout({ children, ...props }) {
  const data = useStaticQuery(guery);
  const timeouts = {};

  React.useEffect(() => {
    props.setIsWideScreen(isWideScreen());
    if (typeof window !== "undefined") {
      window.addEventListener("resize", resizeThrottler, false);
    }
    if (typeof localStorage !== "undefined") {
      const inLocal = +localStorage.getItem("font-size-increase");

      const inStore = props.fontSizeIncrease;

      if (inLocal && inLocal !== inStore && inLocal >= 1 && inLocal <= 1.5) {
        props.setFontSizeIncrease(inLocal);
      }
    }
  }, []);

  // eslint-disable-next-line require-jsdoc
  const getCategories = () => {
    return data.posts.edges.reduce((list, edge, i) => {
      const category = edge.node.frontmatter.category;
      if (category && !~list.indexOf(category)) {
        return list.concat(edge.node.frontmatter.category);
      } else {
        return list;
      }
    }, []);
  };

  const resizeThrottler = () => {
    return timeoutThrottlerHandler(timeouts, "resize", 500, resizeHandler);
  };

  const resizeHandler = () => {
    props.setIsWideScreen(isWideScreen());
  };
  // TODO: dynamic management of tabindexes for keyboard navigation
  return (
    <LayoutWrapper>
      {children}
      <Navigator posts={data.posts.edges} />
      <ActionsBar categories={getCategories()} />
      <InfoBar pages={data.pages.edges} parts={data.parts.edges} />
      {props.isWideScreen && (
        <InfoBox
          pages={data.pages.edges}
          parts={data.parts.edges}
        />
      )}
    </LayoutWrapper>
  );
}

Layout.propTypes = {
  data: PropTypes.object,
  children: PropTypes.any,
  setIsWideScreen: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  fontSizeIncrease: PropTypes.number.isRequired,
  setFontSizeIncrease: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    pages: state.pages,
    isWideScreen: state.isWideScreen,
    fontSizeIncrease: state.fontSizeIncrease
  };
};

const mapDispatchToProps = {
  setIsWideScreen,
  setFontSizeIncrease
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

// eslint-disable-next-line no-undef
const guery = graphql`
  query LayoutQuery {
    posts: allMarkdownRemark(
      filter: { fields: { group: { eq: "posts" } } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            subTitle
            category
            cover {
              children {
                ... on ImageSharp {
                  resolutions(width: 90, height: 90) {
                    ...GatsbyImageSharpResolutions_withWebp_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
    pages: allMarkdownRemark(
      filter: { fields: { group: { eq: "posts" }, prefix: { regex: "/^\\d+$/" } } }
      sort: { fields: [fields___prefix], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            menuTitle
          }
        }
      }
    }
    parts: allMarkdownRemark(filter: { fields: { group: { eq: "parts" } } }) {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
