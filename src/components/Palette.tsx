import React, { useState } from "react";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import {ISeedColorWithLevels} from "../colorHelpers";

import "./Palette.scss";

interface PaletteProps {
  palette: ISeedColorWithLevels;
}

const Palette: React.FC<PaletteProps> = props => {
  const { palette } = props;
  const [format, setFormat] = useState<"hex" | "rgb" | "rgba">("hex");
  const [level, setLevel] = useState<number>(500);

  const renderColorBoxes = (): React.ReactNode => {
    return palette.colors[level].map((color) => {
      console.log("COLOR", color);
      return (
      <ColorBox key={color.hex} background={color[format]} name={color.name} />
    )});
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
    </div>
  );
};

export default Palette;
