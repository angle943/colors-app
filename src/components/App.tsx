import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
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
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList {...routeProps} palettes={seedColors} />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId"
        render={routeProps => {
          const palette = findPalette(routeProps.match.params.paletteId);
          const paletteWithLevels = palette
            ? generatePalette(palette)
            : generatePalette(seedColors[0]);
          return <Palette palette={paletteWithLevels} />;
        }}
      />
      <Route
        path="/palette/:paletteId/:colorId"
        render={routeProps => {
          const {colorId, paletteId} = routeProps.match.params;
          const palette = findPalette(paletteId);
          const paletteWithLevels = palette
            ? generatePalette(palette)
            : generatePalette(seedColors[0]);
          return <SingleColorPalette colorId={colorId} palette={paletteWithLevels} />;
        }}
      />
    </Switch>
  );
};

export default App;
