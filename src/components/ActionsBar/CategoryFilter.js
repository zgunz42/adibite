import React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import classNames from "classnames";

const styles = theme => ({
  fontSizeSetter: {
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {}
  },
  open: {
    color: theme.bars.colors.icon
  },
  popperClose: {
    pointerEvents: "none"
  },
  popper: {
    zIndex: 1
  }
});

// eslint-disable-next-line require-jsdoc
function CategoryFilter({ classes, categories, filterCategory }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleFiltering = e => {
    const category = e.target.innerText.trim();
    filterCategory(category);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className={classes.fontSizeSetter}>
      <IconButton
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        className={classes.open}
      >
        <FilterList />
      </IconButton>
      <Popper
        id={id}
        open={open}
        placement="bottom-end"
        anchorEl={anchorEl}
        className={`${classNames({ [classes.popperClose]: !open })} ${classes.popper}`}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Grow in={open} id="cat-menu-list" style={{ transformOrigin: "0 0 0" }}>
            <Paper>
              <MenuList role="menu">
                <MenuItem key="all" onClick={handleFiltering}>
                  all posts
                </MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} onClick={handleFiltering}>
                    {category}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Grow>
        </ClickAwayListener>
      </Popper>
    </nav>
  );
}

CategoryFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  filterCategory: PropTypes.func.isRequired
};

export default withStyles(styles)(CategoryFilter);
