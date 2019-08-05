import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {WithStyles} from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ISeedColor } from "../seedColors";

interface ParentProps {
  classes: any;
  handleDrawerOpen(): void;
  handleSubmit(newPaletteName: string): void;
  open: boolean;
  palettes: ISeedColor[];
}

type PaletteFormNav = ParentProps & WithStyles<any>;

const PaletteFormNav: React.FC<PaletteFormNav> = props => {
  const {classes, handleDrawerOpen, handleSubmit, open, palettes} = props;
  const [newPaletteName, setNewPaletteName] = useState<string>("");

  useEffect(()=>{
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  },[palettes]);

  const handlePaletteNameChange = (e: any): void => {
    setNewPaletteName(e.target.value);
  };

  return (
    <div>
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
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
            <TextValidator
              label="Palette Name"
              name="newPaletteName"
              onChange={handlePaletteNameChange}
              value={newPaletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
            <Link to="/">
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PaletteFormNav;
