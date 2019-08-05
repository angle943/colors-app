import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ChromePicker } from "react-color";
import { arrayMove } from "react-sortable-hoc";
import clsx from "clsx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {IColor, ISeedColor} from "../seedColors";

const drawerWidth = 400;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
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
    }
  })
);

export interface INewColor {
  color: string;
  name: string;
}

export interface INewColorWithPaletteName {
  paletteName: string;
  colors: INewColor[];
}

export interface INewColorWithPaletteNameWithId
  extends INewColorWithPaletteName {
  id: string;
}

interface ParentProps {
  maxColors?: number;
  palettes: ISeedColor[];
  savePalette(newPalette: INewColorWithPaletteNameWithId): void;
}

type NewPaletteForm = ParentProps & RouteComponentProps;

const NewPaletteForm: React.FC<NewPaletteForm> = props => {
  const { history, maxColors = 20, palettes, savePalette } = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string>("teal");
  const [newColorName, setNewColorName] = useState<string>("");
  const [newPaletteName, setNewPaletteName] = useState<string>("");
  const [colors, setColors] = useState<INewColor[]>(palettes[0].colors);
  const paletteIsFull = colors.length >= maxColors;

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", () => {
      return colors.every(({ color }) => color !== currentColor);
    });
  }, [colors, currentColor]);

  const handleDelete = (colorName: string): void => {
    setColors(colors.filter(({ name }) => name !== colorName));
  };

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const handleNameChange = (e: any): void => {
    setNewColorName(e.target.value);
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

  const handleSubmit = (newPaletteName: string): void => {
    const newPalette: INewColorWithPaletteNameWithId = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors
    };
    savePalette(newPalette);
    setNewPaletteName("");
    history.push("/");
  };

  const addNewColor = (e: any): void => {
    const newColor = { color: currentColor, name: newColorName };
    setColors([...colors, newColor]);
    setNewColorName("");
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
      <PaletteFormNav classes={classes} open={open} palettes={palettes} handleDrawerOpen={handleDrawerOpen} handleSubmit={handleSubmit} />
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
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button variant="contained" color="primary" disabled={paletteIsFull} onClick={addRandomColor}>
            Random Color
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={newColor => setCurrentColor(newColor.hex)}
        />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            onChange={handleNameChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a color name",
              "Color name must be unique",
              "Color already used"
            ]}
            name="newColorName"
            value={newColorName}
          />
          <Button
            color="primary"
            disabled={paletteIsFull}
            style={{ backgroundColor: !paletteIsFull ? currentColor : "grey" }}
            type="submit"
            variant="contained"
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
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
