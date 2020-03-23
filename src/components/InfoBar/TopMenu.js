import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import classNames from "classnames";
import { Link } from "gatsby";
import * as PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  topMenu: {
    float: "right",
    margin: "5px 10px 0 0",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {}
  },
  open: {
    color: theme.bars.colors.icon
  },
  popperClose: {
    pointerEvents: "none"
  }
});

// eslint-disable-next-line require-jsdoc
function TopMenu(props) {
  const { classes, pages } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav className={classes.topMenu}>
      <IconButton
        aria-label="More"
        aria-owns={anchorEl ? "long-menu" : null}
        aria-haspopup="true"
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        className={classes.open}
      >
        <MoreVert />
      </IconButton>
      <Popper
        id={id}
        open={open}
        placement="bottom-end"
        anchorEl={anchorEl}
        className={classNames({ [classes.popperClose]: !open })}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Grow in={open} id="menu-list" style={{ transformOrigin: "0 0 0" }}>
            <Paper>
              <MenuList role="menu">
                <MenuItem
                  onClick={e => {
                    props.homeLinkOnClick(e);
                    handleClose();
                  }}
                >
                  Home
                </MenuItem>
                {pages.map(page => {
                  const { fields, frontmatter } = page.node;

                  return (
                    <Link key={fields.slug} to={fields.slug} style={{ display: "block" }}>
                      <MenuItem
                        onClick={e => {
                          props.pageLinkOnClick(e);
                          handleClose();
                        }}
                      >
                        {frontmatter.menuTitle ? frontmatter.menuTitle : frontmatter.title}
                      </MenuItem>
                    </Link>
                  );
                })}
                <Link to="/contact/" style={{ display: "block" }}>
                  <MenuItem
                    onClick={e => {
                      props.pageLinkOnClick(e);
                      handleClose();
                    }}
                  >
                    Contact
                  </MenuItem>
                </Link>
              </MenuList>
            </Paper>
          </Grow>
        </ClickAwayListener>
      </Popper>
    </nav>
  );
}

TopMenu.propTypes = {
  pages: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  pageLinkOnClick: PropTypes.func.isRequired,
  homeLinkOnClick: PropTypes.func.isRequired
};

export default withStyles(styles)(TopMenu);
