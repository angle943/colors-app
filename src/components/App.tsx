import React, {useState} from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm, {INewColorWithPaletteNameWithId} from "./NewPaletteForm";
import seedColors, { ISeedColor } from "../seedColors";
import { generatePalette } from "../colorHelpers";

import "./App.scss";

const App: React.FC = () => {
  const [palettes, setPalettes] = useState<ISeedColor[]>(seedColors);
  const findPalette = (id: string): ISeedColor | undefined => {
    return palettes.find(palette => palette.id === id);
  };
  const savePalette = (newPalette: INewColorWithPaletteNameWithId): void => {
    const paletteToAdd = {...newPalette, emoji: "💩"};
    setPalettes([...palettes, paletteToAdd]);
  };

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={(routeProps) => <NewPaletteForm {...routeProps} savePalette={savePalette} palettes={palettes} />}
      />
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList {...routeProps} palettes={palettes} />
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
          const { colorId, paletteId } = routeProps.match.params;
          const palette = findPalette(paletteId);
          const paletteWithLevels = palette
            ? generatePalette(palette)
            : generatePalette(palettes[0]);
          return (
            <SingleColorPalette colorId={colorId} palette={paletteWithLevels} />
          );
        }}
      />
    </Switch>
  );
};

export default App;
