import React from "react";
import { ISeedColor } from "../seedColors";

interface PaletteProps extends ISeedColor {}

const Palette: React.FC<any> = props => {
  console.log(props);
  return (
    <div className="Palette">
      <div className="Palette-colors"></div>
    </div>
  );
};

export default Palette;
