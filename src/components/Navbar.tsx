import React from 'react';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import "./Navbar.scss";

interface NavbarProps {
  changeLevel(newLevel: number): void;
  level: number;
}

const Navbar: React.FC<NavbarProps> = props => {
  const {changeLevel, level} = props;

  return (
    <header className="Navbar">
      <div className="logo">
        <a href="/">reactcolorpicker</a>
      </div>
      <div className="slider-container">
        <span>Level: {level}</span>
        <div className="slider">
          <Slider
            defaultValue={level}
            max={900}
            min={100}
            onAfterChange={changeLevel}
            step={100}
          />
        </div>

      </div>
    </header>
  )
}

export default Navbar;
