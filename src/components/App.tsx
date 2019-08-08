import React, { useEffect, useState } from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import NewPaletteForm from "./NewPaletteForm";
import Page from "./Page";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";

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
    <Route
      render={({ location }: RouteComponentProps) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={routeProps => (
                  <Page>
                    <NewPaletteForm
                      {...routeProps}
                      savePalette={savePalette}
                      palettes={palettes}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/"
                render={routeProps => (
                  <Page>
                    <PaletteList
                      {...routeProps}
                      deletePalette={deletePalette}
                      palettes={palettes}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId"
                render={routeProps => {
                  const palette = findPalette(
                    routeProps.match.params.paletteId
                  );
                  const paletteWithLevels = palette
                    ? generatePalette(palette)
                    : generatePalette(seedColors[0]);
                  return (
                    <Page>
                      <Palette palette={paletteWithLevels} />
                    </Page>
                  );
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
                    <Page>
                      <SingleColorPalette
                        colorId={colorId}
                        palette={paletteWithLevels}
                      />
                    </Page>
                  );
                }}
              />
              <Route
                render={routeProps => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default App;
