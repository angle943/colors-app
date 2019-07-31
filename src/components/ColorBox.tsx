import React from "react";

import "./ColorBox.scss";

interface ColorBox {
  background: string;
  name: string;
}

const ColorBox: React.FC<ColorBox> = props => {
  const { background, name } = props;

  return (
    <div className="ColorBox" style={{ background: background }}>
      <div className="copy-container">
        <div className="box-content">
          <span>{name}</span>
        </div>
        <button className="copy-button">Copy</button>
      </div>
      <span className='see-more'>More</span>
    </div>
  );
};

export default ColorBox;
