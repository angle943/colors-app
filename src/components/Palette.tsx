import React, { useState } from "react";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import { ISeedColorWithLevels } from "../colorHelpers";

import "./Palette.scss";

interface PaletteProps {
  palette: ISeedColorWithLevels;
}

const Palette: React.FC<PaletteProps> = props => {
  const { palette } = props;
  const [level, setLevel] = useState<number>(500);

  const renderColorBoxes = (): React.ReactNode => {
    return palette.colors[level].map(color => (
      <ColorBox key={color.hex} background={color.hex} name={color.name} />
    ));
  };

  const changeLevel = (newLevel: number): void => {
    setLevel(newLevel);
  };

  return (
    <div className="Palette">
      <Navbar changeLevel={changeLevel} level={level} />
      <div className="Palette-colors">{renderColorBoxes()}</div>
    </div>
  );
};

export default Palette;
