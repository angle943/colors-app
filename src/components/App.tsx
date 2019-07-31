import React from "react";
import Palette from "./Palette";
import seedColors from "../seedColors";

const App: React.FC = () => {
  return (
    <div>
      <Palette {...seedColors[4]} />
    </div>
  );
};

export default App;
