import React, { useState } from "react";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import { ISeedColorWithLevels } from "../colorHelpers";

import "./Palette.scss";

interface PaletteProps {
  palette: ISeedColorWithLevels;
}

const Palette: React.FC<PaletteProps> = props => {
  const { palette } = props;
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
    <div className="Palette">
      <Navbar
        changeLevel={changeLevel}
        level={level}
        handleChange={changeFormat}
      />
      <div className="Palette-colors">{renderColorBoxes()}</div>
      <PaletteFooter emoji={emoji} paletteName={paletteName} />
    </div>
  );
};

export default Palette;
