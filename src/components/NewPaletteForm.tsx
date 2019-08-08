import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { arrayMove } from "react-sortable-hoc";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import DraggableColorList from "./DraggableColorList";
import ColorPickerForm, { INewColor } from "./ColorPickerForm";
import PaletteFormNav from "./PaletteFormNav";

import useStyles from '../styles/NewPaletteFormStyles';
import seedColors, { IColor, ISeedColor } from "../seedColors";
import { PaletteMetaFormData } from "./PaletteMetaForm";




interface ParentProps {
  maxColors?: number;
  palettes: ISeedColor[];
  savePalette(newPalette: ISeedColor): void;
}

type NewPaletteForm = ParentProps & RouteComponentProps;

const NewPaletteForm: React.FC<NewPaletteForm> = props => {
  const { history, maxColors = 20, palettes, savePalette } = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [colors, setColors] = useState<INewColor[]>(seedColors[0].colors);
  const paletteIsFull = colors.length >= maxColors;

  const handleDelete = (colorName: string): void => {
    setColors(colors.filter(({ name }) => name !== colorName));
  };

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }): void => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const handleSubmit = (newPalette: PaletteMetaFormData): void => {
    const paletteToSubmit = {
      ...newPalette,
      id: newPalette.paletteName.toLowerCase().replace(/ /g, "-"),
      colors
    };
    savePalette(paletteToSubmit);
    history.push("/");
  };

  const addNewColor = (newColor: INewColor): void => {
    setColors([...colors, newColor]);
  };

  const clearColors = (): void => {
    setColors([]);
  };

  const addRandomColor = (): void => {
    const allColors: IColor[] = palettes.map(p => p.colors).flat();
    let rand: number;
    let randomColor: IColor;
    let isUniqueColor = false;
    do {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isUniqueColor = colors.every(({ name }) => name !== randomColor.name);
    } while (!isUniqueColor);
    setColors([...colors, allColors[rand]]);
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={paletteIsFull}
              onClick={addRandomColor}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            addNewColor={addNewColor}
            colors={colors}
            paletteIsFull={paletteIsFull}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          axis="xy"
          colors={colors}
          distance={20}
          handleDelete={handleDelete}
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
};

export default NewPaletteForm;
