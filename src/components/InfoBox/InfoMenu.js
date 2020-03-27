import React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "gatsby";

const styles = theme => ({
  infoMenu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    width: "100%"
  },
  link: {
    padding: ".5em",
    fontWeight: 300,
    textTransform: "lowercase",
    color: theme.info.colors.menuLink,
    "&:hover": {
      color: theme.info.colors.menuLinkHover
    }
  }
});

const InfoMenu = props => {
  const { classes, menu, linkOnClick } = props;

  return (
    <nav className={classes.infoMenu}>
      {menu.map(({ slug, menuTitle }) => {
        return (
          <Link
            key={slug}
            to={slug}
            onClick={linkOnClick}
            className={classes.link}
            data-shape="closed"
          >
            {menuTitle}
          </Link>
        );
      })}
    </nav>
  );
};

InfoMenu.propTypes = {
  menu: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  linkOnClick: PropTypes.func.isRequired
};

export default withStyles(styles)(InfoMenu);
