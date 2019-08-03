import React from "react";
import { RouteComponentProps } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import {WithStyles, withStyles} from "@material-ui/styles";
import { ISeedColor } from "../seedColors";
import styles from "../styles/PaletteListStyles";

interface PaletteListProps extends RouteComponentProps, WithStyles<typeof styles> {
  palettes: ISeedColor[];
}

const PaletteList: React.FC<PaletteListProps> = props => {
  const { classes, history, palettes } = props;

  const goToPalette = (id: string): void => {
    history.push(`/palette/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette key={palette.id} {...palette} handleClick={goToPalette} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
