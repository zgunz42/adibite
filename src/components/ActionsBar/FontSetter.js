import { withStyles } from "@material-ui/core/styles";
import * as PropTypes from "prop-types";
import React from "react";

// import { MenuItem, MenuList } from "@material-ui/core/Menu";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import { FormatSize } from "@material-ui/icons";
import { Popper } from "@material-ui/core";

const styles = theme => ({
  fontSizeSetter: {
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
function FontSetter({ classes, ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleSetting = e => {
    const val = e.target.innerText.replace("%", "");
    const factor = +val / 100;
    props.increaseFont(factor);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className={classes.fontSizeSetter}>
      <IconButton
        aria-label="Increase font size"
        aria-owns={anchorEl ? "long-menu" : null}
        aria-haspopup="true"
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        title="Change font size"
        className={classes.open}
      >
        <FormatSize />
      </IconButton>
      <Popper
        id={id}
        open={open}
        placement="bottom-end"
        anchorEl={anchorEl}
        className={classNames({ [classes.popperClose]: !open })}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Grow in={open} id="font-menu-list" style={{ transformOrigin: "0 0 0" }}>
            <Paper>
              <MenuList role="menu">
                <MenuItem onClick={handleSetting}>150%</MenuItem>
                <MenuItem onClick={handleSetting}>125%</MenuItem>
                <MenuItem onClick={handleSetting}>100%</MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        </ClickAwayListener>
      </Popper>
    </nav>
  );
}

FontSetter.propTypes = {
  classes: PropTypes.object.isRequired,
  increaseFont: PropTypes.func.isRequired
};

export default withStyles(styles)(FontSetter);
