import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { WithStyles, withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

import styles from "../styles/ColorPickerFormStyles";

export interface INewColor {
  color: string;
  name: string;
}

interface ParentProps {
  addNewColor(newColor: INewColor): void;
  colors: INewColor[];
  paletteIsFull: boolean;
}

type ColorPickerFormStyles = ParentProps & WithStyles<typeof styles>;

const ColorPickerForm: React.FC<ColorPickerFormStyles> = props => {
  const { addNewColor, classes, colors, paletteIsFull } = props;
  const [currentColor, setCurrentColor] = useState<string>("teal");
  const [newColorName, setNewColorName] = useState<string>("");

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

  const handleNameChange = (e: any): void => {
    setNewColorName(e.target.value);
  };

  const handleSubmit = (): void => {
    const newColor = {
      color: currentColor,
      name: newColorName
    };
    addNewColor(newColor);
    setNewColorName("");
  };

  return (
    <div>
      <ChromePicker
        className={classes.picker}
        color={currentColor}
        onChangeComplete={newColor => setCurrentColor(newColor.hex)}
      />
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <TextValidator
          className={classes.colorNameInput}
          placeholder="Color Name"
          onChange={handleNameChange}
          variant="filled"
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          margin="normal"
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
          className={classes.addColor}
          disabled={paletteIsFull}
          style={{ backgroundColor: !paletteIsFull ? currentColor : "grey" }}
          type="submit"
          variant="contained"
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default withStyles(styles)(ColorPickerForm);
