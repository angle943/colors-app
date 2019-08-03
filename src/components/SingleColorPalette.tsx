import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import ColorBox from "./ColorBox";
import { IColorWithLevels, ISeedColorWithLevels } from "../colorHelpers";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

interface SingleColorPaletteProps {
  colorId: string;
  palette: ISeedColorWithLevels;
}

const SingleColorPalette: React.FC<SingleColorPaletteProps> = props => {
  const { colorId, palette } = props;
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
    <div className="SingleColorPalette Palette">
      <Navbar handleChange={changeFormat} />
      <div className="Palette-colors">
        {shades.length && renderColorBoxes()}
        <div className="ColorBox go-back">
          <Link to={`/palette/${id}`} className="back-button">go back</Link>
        </div>
      </div>
      <PaletteFooter emoji={emoji} paletteName={paletteName} />
    </div>
  );
};

export default SingleColorPalette;
