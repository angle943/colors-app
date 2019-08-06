import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { arrayMove } from "react-sortable-hoc";
import clsx from "clsx";
import DraggableColorList from "./DraggableColorList";
import ColorPickerForm, { INewColor } from "./ColorPickerForm";
import PaletteFormNav from "./PaletteFormNav";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { IColor, ISeedColor } from "../seedColors";
import { PaletteMetaFormData } from "./PaletteMetaForm";

const drawerWidth = 400;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      display: "flex",
      alignItems: "center"
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    },
    content: {
      flexGrow: 1,
      height: "calc(100vh - 64px)",
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      flexDirection: "column",
      width: "90%"
    },
    buttons: {
      width: "100%"
    },
    button: {
      width: "50%"
    }
  })
);

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
  const [colors, setColors] = useState<INewColor[]>(palettes[0].colors);
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
    do {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
    } while (!colors.every(({ name }) => name !== randomColor.name));
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
          handleDelete={handleDelete}
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
};

export default NewPaletteForm;
