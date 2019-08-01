import React from "react";
import Palette from "./Palette";
import seedColors from "../seedColors";
import { generatePalette } from "../colorHelpers";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div>
      <Palette palette={generatePalette(seedColors[4])} />
    </div>
  );
};

export default App;
