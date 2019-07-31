import React from "react";
import Palette from "./Palette";
import seedColors from "../seedColors";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div>
      <Palette {...seedColors[4]} />
    </div>
  );
};

export default App;
