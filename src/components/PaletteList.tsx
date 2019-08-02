import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { createStyles, withStyles } from "@material-ui/styles";
import { ISeedColor } from "../seedColors";

const styles = createStyles({
  root: {
    alignItems: "flex-start",
    backgroundColor: "blue",
    display: "flex",
    height: "100vh",
    justifyContent: "center"
  },
  container: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "50%"
  },
  nav: {
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  palettes: {
    display: "grid",
    gridGap: "5%",
    gridTemplateColumns: "repeat(3, 30%)",
    width: "100%"
  }
});

interface PaletteListProps {
  classes: {
    root: string;
    container: string;
    nav: string;
    palettes: string;
  };
  palettes: ISeedColor[];
}

const PaletteList: React.FC<PaletteListProps> = props => {
  const { classes, palettes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette {...palette} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
