import React from "react";
import {createStyles, WithStyles, withStyles} from "@material-ui/styles";
import { ISeedColor } from "../seedColors";

const styles = createStyles({
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    overflow: "hidden",
    padding: ".5rem",
    position: "relative",
    "&:hover": {
      cursor: "pointer"
    }
  },
  colors: {
    backgroundColor: "#dae1e4",
    borderRadius: "5px",
    height: "150px",
    overflow: "hidden",
    width: "100%"
  },
  title: {
    alignItems: "center",
    color: "black",
    display: "flex",
    fontSize: "1rem",
    justifyContent: "space-between",
    margin: "0",
    paddingTop: ".5rem",
    position: "relative"
  },
  emoji: {
    fontSize: "1.5rem",
    marginLeft: ".5rem"
  },
  miniColor: {
    display: "inline-block",
    height: "25%",
    margin: "0 auto",
    marginBottom: "-3.5px",
    position: "relative",
    width: "20%"
  }
});

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