import React from "react";
import {WithStyles, withStyles} from "@material-ui/styles";
import { ISeedColor } from "../seedColors";
import styles from '../styles/MiniPaletteStyles';

interface MiniPaletteProps extends ISeedColor, WithStyles<typeof styles> {
  handleClick(id: string): void;
}

const MiniPalette: React.FC<MiniPaletteProps> = props => {
  const { colors, classes, emoji, id, handleClick, paletteName } = props;

  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      key={color.name}
      style={{ backgroundColor: color.color }}
    />
  ));
  return (
    <div className={classes.root} onClick={() => handleClick(id)}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default withStyles(styles)(MiniPalette);
