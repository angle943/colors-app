import chroma from "chroma-js";
import { ISeedColor } from "./seedColors";

export interface IColorWithLevels {
  name: string;
  id: string;
  hex: string;
  rgb: string;
  rgba: string;
}

export interface ISeedColorWithLevels {
  paletteName: string;
  id: string;
  emoji: string;
  colors: {
    [level: string]: IColorWithLevels[];
  };
}

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const getRange = (hexColor: string): string[] => {
  const end = "#fff";
  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    end
  ];
};

const generateScale = (hexColor: string, numberOfColors: number): string[] => {
  return chroma
    .scale(getRange(hexColor))
    .mode("lab")
    .colors(numberOfColors);
};

const generatePalette = (starterPalette: ISeedColor): ISeedColorWithLevels => {
  const newPalette: ISeedColorWithLevels = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {}
  };
  for (const level of levels) {
    newPalette.colors[level] = [];
  }
  for (const color of starterPalette.colors) {
    const scale = generateScale(color.color, 10).reverse();
    for (const i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)")
      });
    }
  }
  return newPalette;
};

export { generatePalette };
