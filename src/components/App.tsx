import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors, { ISeedColor } from "../seedColors";
import { generatePalette } from "../colorHelpers";

import "./App.scss";

const App: React.FC = () => {
  const findPalette = (id: string): ISeedColor | undefined => {
    console.log(seedColors.find(palette => palette.id === id));
    return seedColors.find(palette => palette.id === id);
  };
  return (
    <Switch>
      <Route exact path="/" render={() => <PaletteList palettes={seedColors} />} />
      <Route
        exact
        path="/palette/:id"
        render={routeProps => {
          const palette = findPalette(routeProps.match.params.id);
          const paletteWithLevels = palette
            ? generatePalette(palette)
            : generatePalette(seedColors[0]);
          return <Palette palette={paletteWithLevels} />;
        }}
      />
    </Switch>
  );
};

export default App;
