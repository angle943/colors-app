import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors, { ISeedColor } from "../seedColors";
import { generatePalette } from "../colorHelpers";

import "./App.scss";

const App: React.FC = () => {
  const [palettes, setPalettes] = useState<ISeedColor[]>(seedColors);

  useEffect(() => {
    const palettesFromLocalStorage = window.localStorage.getItem("palettes");
    const savedPalettes = palettesFromLocalStorage
      ? JSON.parse(palettesFromLocalStorage)
      : null;
    if (savedPalettes) {
      setPalettes(savedPalettes);
    }
  }, []);

  const deletePalette = (id: string): void => {
    const paletteToBeSaved = palettes.filter(palette => palette.id !== id);
    setPalettes(paletteToBeSaved);
    syncLocalStorage(JSON.stringify(paletteToBeSaved));
  };

  const findPalette = (id: string): ISeedColor | undefined => {
    return palettes.find(palette => palette.id === id);
  };
  const savePalette = (newPalette: ISeedColor): void => {
    const paletteToBeSaved = [...palettes, newPalette];
    setPalettes(paletteToBeSaved);
    syncLocalStorage(JSON.stringify(paletteToBeSaved));
  };

  const syncLocalStorage = (palettes: string): void => {
    window.localStorage.setItem("palettes", palettes);
  };

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={routeProps => (
          <NewPaletteForm
            {...routeProps}
            savePalette={savePalette}
            palettes={palettes}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList {...routeProps} deletePalette={deletePalette} palettes={palettes} />
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
