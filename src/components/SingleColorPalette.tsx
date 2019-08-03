import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import { IColorWithLevels, ISeedColorWithLevels } from "../colorHelpers";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from '../styles/PaletteStyles';

interface ParentProps {
  colorId: string;
  palette: ISeedColorWithLevels;
}

type SingleColorPaletteProps = ParentProps & WithStyles<typeof styles>;

const SingleColorPalette: React.FC<SingleColorPaletteProps> = props => {
  const { colorId, classes, palette } = props;
  const { emoji, id, paletteName } = palette;
  const [format, setFormat] = useState<"hex" | "rgb" | "rgba">("hex");
  const [shades, setShades] = useState<IColorWithLevels[]>([]);

  useEffect(() => {
    const gatherShades = (): void => {
      const shadesToBeAdded: IColorWithLevels[] = [];
      const allColors = palette.colors;
      for (const level in allColors) {
        shadesToBeAdded.push(
          ...allColors[level].filter(color => color.id === colorId)
        );
      }
      setShades(shadesToBeAdded.slice(1));
    };

    gatherShades();
  }, [colorId, palette.colors]);

  const changeFormat = (format: "hex" | "rgb" | "rgba") => {
    setFormat(format);
  };

  const renderColorBoxes = (): React.ReactNode => {
    return shades.map(color => (
      <ColorBox key={color.name} name={color.name} background={color[format]} />
    ));
  };

  return (
    <div className={classes.Palette}>
      <Navbar handleChange={changeFormat} />
      <div className={classes.colors}>
        {shades.length && renderColorBoxes()}
        <div className={classes.goBack}>
          <Link to={`/palette/${id}`}>go back</Link>
        </div>
      </div>
      <PaletteFooter emoji={emoji} paletteName={paletteName} />
    </div>
  );
};

export default withStyles(styles)(SingleColorPalette);
