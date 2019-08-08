import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PaletteMetaForm, {PaletteMetaFormData} from "./PaletteMetaForm";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { WithStyles, withStyles } from "@material-ui/styles";

import { ISeedColor } from "../seedColors";
import styles from "../styles/PaletteFormNavStyles";

interface ParentProps {
  handleDrawerOpen(): void;
  handleSubmit(newPalette: PaletteMetaFormData): void;
  open: boolean;
  palettes: ISeedColor[];
}

type PaletteFormNav = ParentProps & WithStyles<typeof styles>;

const PaletteFormNav: React.FC<PaletteFormNav> = props => {
  const { classes, handleDrawerOpen, handleSubmit, open, palettes } = props;

  const [formShowing, setFormShowing] = useState<boolean>(false);

  const showForm = (): void => {
    setFormShowing(true);
  };

  const hideForm = (): void => {
    setFormShowing(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        color="default"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to="/">
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
            >
              Go Back
            </Button>
          </Link>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={showForm}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          handleSubmit={handleSubmit}
          palettes={palettes}
          hideForm={hideForm}
        />
      )}
    </div>
  );
};

export default withStyles(styles)(PaletteFormNav);
