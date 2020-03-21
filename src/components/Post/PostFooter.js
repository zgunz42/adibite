import React, { Suspense, lazy } from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import asyncComponent from "../common/AsyncComponent/";
import PostAuthor from "./PostAuthor";
import PostComments from "./PostComments";
import Loading from "../common/Loading/Loading";
import theme from "../../styles/theme";

const styles = theme => ({
  footer: {
    color: theme.main.colors.footer,
    fontSize: `${theme.main.fonts.footer.size}em`,
    lineHeight: theme.main.fonts.footer.lineHeight,
    "& p": {
      margin: 0
    }
  }
});

const PostShare = lazy(() => import("./PostShare"));

const PostFooter = ({ classes, author, post, slug, facebook }) => {
  return (
    <footer className={classes.footer}>
      <Suspense fallback={<Loading afterRight={true} />}>
        <PostShare post={post} slug={slug} />
      </Suspense>
      <PostAuthor author={author} />
      <PostComments post={post} slug={slug} facebook={facebook} />
    </footer>
  );
};

PostFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired
};

export default withStyles(styles)(PostFooter);
