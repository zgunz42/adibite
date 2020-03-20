import { withStyles } from "@material-ui/core/styles";
import * as PropTypes from "prop-types";
import React from "react";

// import { MenuItem, MenuList } from "@material-ui/core/Menu";
import { Manager, Reference, Popper } from "react-popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import FormatSizeIcon from "@material-ui/icons/FormatSize";

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
class FontSetter extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };

  // eslint-disable-next-line require-jsdoc
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSetting = this.handleSetting.bind(this);
  }

  // eslint-disable-next-line require-jsdoc
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  // eslint-disable-next-line require-jsdoc
  handleClick() {
    this.setState({ open: !this.state.open });
  }

  // eslint-disable-next-line require-jsdoc
  handleClose() {
    if (!this.state.open) {
      return;
    }

    this.timeout = setTimeout(() => {
      this.setState({ open: false });
    });
  }

  // eslint-disable-next-line require-jsdoc
  handleSetting(e) {
    const val = e.target.innerText.replace("%", "");
    const factor = +val / 100;
    this.props.increaseFont(factor);
    this.handleClose();
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;

    return (
      <nav className={classes.fontSizeSetter}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <IconButton
                ref={ref}
                aria-label="Increase font size"
                aria-owns={anchorEl ? "long-menu" : null}
                aria-haspopup="true"
                onClick={this.handleClick.bind(this)}
                title="Change font size"
                className={classes.open}
              >
                <FormatSizeIcon />
              </IconButton>
            )}
          </Reference>
          <Popper
            placement="bottom-end"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleClose.bind(this)}>
              <Grow in={open} id="font-menu-list" style={{ transformOrigin: "0 0 0" }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={this.handleSetting.bind(this)}>150%</MenuItem>
                    <MenuItem onClick={this.handleSetting.bind(this)}>125%</MenuItem>
                    <MenuItem onClick={this.handleSetting.bind(this)}>100%</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </nav>
    );
  }
}

FontSetter.propTypes = {
  classes: PropTypes.object.isRequired,
  increaseFont: PropTypes.func.isRequired
};

export default withStyles(styles)(FontSetter);
