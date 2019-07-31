import React from "react";
import ColorBox from "./ColorBox";
import { ISeedColor } from "../seedColors";

import "./Palette.scss";

interface PaletteProps extends ISeedColor {}

const Palette: React.FC<PaletteProps> = props => {
  const { colors, emoji, id, paletteName } = props;

  const renderColorBoxes = (): React.ReactNode => {
    return colors.map(color => <ColorBox background={color.color} name={color.name} />);
  };

  return (
    <div className="Palette">
      <div className="Palette-colors">
        {renderColorBoxes()}
      </div>
    </div>
  );
};

export default Palette;
