import React from "react";
import { Link } from "react-router-dom";
import { ISeedColor } from "../seedColors";

interface PaletteListProps {
  palettes: ISeedColor[];
}

const PaletteList: React.FC<PaletteListProps> = props => {
  const { palettes } = props;

  return (
    <div>
      <h1>React Colors</h1>
      {palettes.map(palette => (
        <p>
          <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        </p>
      ))}
    </div>
  );
};

export default PaletteList;
