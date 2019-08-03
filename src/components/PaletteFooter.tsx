import React from 'react';

const PaletteFooter: React.FC<any> = props => {
  const {emoji, paletteName} = props;
  return (
    <footer className="Palette-footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  )
}

export default PaletteFooter;
