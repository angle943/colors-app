import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import "./ColorBox.scss";

interface ColorBox {
  background: string;
  name: string;
}

const ColorBox: React.FC<ColorBox> = props => {
  const { background, name } = props;
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }, [copied]);

  return (
    <div className="ColorBox" style={{ background: background }}>
      <div className={`copy-overlay ${copied && 'show'}`} style={{ background: background }} />
      <div className={`copy-msg ${copied && 'show'}`}>
        <h1>copied!</h1>
        <p>{background}</p>
      </div>
      <div className="copy-container">
        <div className="box-content">
          <span>{name}</span>
        </div>
        <CopyToClipboard text={background} onCopy={() => setCopied(true)}>
          <button className="copy-button">Copy</button>
        </CopyToClipboard>
      </div>
      <span className="see-more">More</span>
    </div>
  );
};

export default ColorBox;
