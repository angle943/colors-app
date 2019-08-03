import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { WithStyles, withStyles } from "@material-ui/styles";
import styles, { ParentProps } from "../styles/ColorBoxStyles";

type ColorBoxProps = ParentProps & WithStyles<typeof styles>;

const ColorBox: React.FC<ColorBoxProps> = props => {
  const { background, classes, moreUrl, name } = props;
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }, [copied]);

  return (
    <div className={classes.ColorBox} style={{ background: background }}>
      <div
        className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
        style={{ background: background }}
      />
      <div
        className={`${classes.copyMessage} ${copied &&
          classes.showCopyMessage}`}
      >
        <h1>copied!</h1>
        <p className={classes.copyText}>{background}</p>
      </div>
      <div>
        <div className={classes.boxContent}>
          <span className={classes.colorName}>{name}</span>
        </div>
        <CopyToClipboard text={background} onCopy={() => setCopied(true)}>
          <button className={classes.copyButton}>Copy</button>
        </CopyToClipboard>
      </div>
      {moreUrl && (
        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
          <span className={classes.seeMore}>more</span>
        </Link>
      )}
    </div>
  );
};

export default withStyles(styles)(ColorBox);
