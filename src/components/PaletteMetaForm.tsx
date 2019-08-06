import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {BaseEmoji, Picker} from "emoji-mart";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ISeedColor } from "../seedColors";
import "emoji-mart/css/emoji-mart.css";

export interface PaletteMetaFormData {
  paletteName: string;
  emoji: string;
}

interface ParentProps {
  handleSubmit(newPalette: PaletteMetaFormData): void;
  hideForm(): void;
  palettes: ISeedColor[];
}

type PaletteMetaFormProps = ParentProps;

const PaletteMetaForm: React.FC<PaletteMetaFormProps> = props => {
  const { handleSubmit, hideForm, palettes } = props;

  const [stage, setStage] = React.useState<"form" | "emoji">("form");
  const [newPaletteName, setNewPaletteName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }, [palettes]);

  const handlePaletteNameChange = (e: any) => {
    setNewPaletteName(e.target.value);
  };

  const showEmojiPicker = (): void => {
    setStage("emoji");
  };

  const savePalette = (emoji: BaseEmoji) => {
    handleSubmit({paletteName: newPaletteName, emoji: emoji.native})
  };

  return (
    <>
      <Dialog open={stage === 'emoji'}>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker title="Pick a Palette Emoji" onSelect={savePalette} />
      </Dialog>
      <Dialog
        open={stage === 'form'}
        onClose={hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique!
            </DialogContentText>
            <TextValidator
              errorMessages={["Enter Palette Name", "Name already used"]}
              fullWidth
              label="Palette Name"
              margin="normal"
              name="newPaletteName"
              onChange={handlePaletteNameChange}
              validators={["required", "isPaletteNameUnique"]}
              value={newPaletteName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
};

export default PaletteMetaForm;
