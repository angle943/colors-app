import React from "react";
import { WithStyles, withStyles } from "@material-ui/styles";
import styles from "../styles/PaletteFooterStyles";

interface ParentProps {
  emoji: string;
  paletteName: string;
}

type PaletteFooterProps = ParentProps & WithStyles<typeof styles>;

const PaletteFooter: React.FC<PaletteFooterProps> = props => {
  const { classes, emoji, paletteName } = props;
  return (
    <footer className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
};

export default withStyles(styles)(PaletteFooter);
