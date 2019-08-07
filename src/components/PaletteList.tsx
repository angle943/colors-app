import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import {WithStyles, withStyles} from "@material-ui/styles";
import { ISeedColor } from "../seedColors";
import styles from "../styles/PaletteListStyles";

interface PaletteListProps extends RouteComponentProps, WithStyles<typeof styles> {
  deletePalette(id: string): void;
  palettes: ISeedColor[];
}

const PaletteList: React.FC<PaletteListProps> = props => {
  const { classes, deletePalette, history, palettes } = props;

  const goToPalette = (id: string): void => {
    history.push(`/palette/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette handleDelete={deletePalette} key={palette.id} {...palette} handleClick={goToPalette} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
