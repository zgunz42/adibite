import React from "react";
import * as PropTypes from "prop-types";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { Comments, FacebookProvider } from "react-facebook";

import config from "../../../content/meta/config.json";

const styles = theme => ({
  postComments: {
    margin: "3em 0 0",
    padding: "3em 0 0",
    borderTop: "1px solid #ddd"
  }
});

const PostComments = props => {
  const { classes, slug, facebook } = props;
  const theme = useTheme();

  return (
    <div id="post-comments" className={classes.postComments}>
      <FacebookProvider appId={facebook}>
        <Comments
          href={`${config.siteUrl}${slug}`}
          width="100%"
          colorScheme={theme.main.colors.fbCommentsColorscheme}
        />
      </FacebookProvider>
    </div>
  );
};

PostComments.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired
};

export default withStyles(styles)(PostComments);
