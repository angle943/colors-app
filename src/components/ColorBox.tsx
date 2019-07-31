import React from "react";

import "./ColorBox.scss";

interface ColorBox {
  background: string;
  name: string;
}

const ColorBox: React.FC<any> = props => {
  const { background, name } = props;

  return (
    <div className="ColorBox" style={{ background: background }}>
      <span>{name}</span>
      <span>MORE</span>
    </div>
  );
};

export default ColorBox;
