import React, { useState } from "react";
import { WithStyles, withStyles } from "@material-ui/styles";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

import { ISeedColorWithLevels } from "../colorHelpers";
import styles from '../styles/PaletteStyles';

interface ParentProps {
  palette: ISeedColorWithLevels;
}

type PaletteProps = ParentProps & WithStyles<typeof styles>;

const Palette: React.FC<PaletteProps> = props => {
  const { classes, palette } = props;
  const { colors, emoji, id, paletteName } = palette;
  const [format, setFormat] = useState<"hex" | "rgb" | "rgba">("hex");
  const [level, setLevel] = useState<number>(500);

  const renderColorBoxes = (): React.ReactNode => {
    return colors[level].map(color => {
      return (
        <ColorBox
          background={color[format]}
          key={color.id}
          moreUrl={`/palette/${id}/${color.id}`}
          name={color.name}
        />
      );
    });
  };

  const changeFormat = (format: "hex" | "rgb" | "rgba") => {
    setFormat(format);
  };

  const changeLevel = (newLevel: number): void => {
    setLevel(newLevel);
  };

  return (
    <div className={classes.Palette}>
      <Navbar
        changeLevel={changeLevel}
        level={level}
        handleChange={changeFormat}
      />
      <div className={classes.colors}>{renderColorBoxes()}</div>
      <PaletteFooter emoji={emoji} paletteName={paletteName} />
    </div>
  );
};

export default withStyles(styles)(Palette);
