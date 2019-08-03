import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import chroma from "chroma-js";
import {
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/styles";

import "./ColorBox.scss";

interface ParentProps {
  background: string;
  moreUrl?: string;
  name: string;
}

const styles = createStyles({
  ColorBox: {
    display: "inline-block",
    height: (props: ParentProps) => (props.moreUrl ? "25%" : "50%"),
    margin: "0 auto -3.6px",
    position: "relative",
    width: "20%",
    "&:hover button": {
      opacity: 1,
      transition: ".5s"
    }
  },
  copyText: {
    color: (props: ParentProps) =>
      chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,.6)" : "white"
  },
  colorName: {
    color: (props: ParentProps) =>
      chroma(props.background).luminance() <= 0.08 ? "white" : "black"
  },
  seeMore: {
    color: (props: ParentProps) =>
      chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,.6)" : "white",
    background: "rgba(255, 255, 255, 0.3)",
    border: "none",
    bottom: "0",
    height: "30px",
    lineHeight: "30px",
    position: "absolute",
    right: "0",
    textAlign: "center",
    textTransform: "uppercase",
    width: "60px",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.6)",
      transition: "0.5s"
    }
  },
  copyButton: {
    background: "rgba(255, 255, 255, 0.3)",
    border: "none",
    color: (props: ParentProps) =>
      chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,.6)" : "white",
    cursor: "pointer",
    display: "inline-block",
    fontSize: "1rem",
    height: "30px",
    left: "50%",
    lineHeight: "30px",
    opacity: 0,
    outline: "none",
    position: "absolute",
    textAlign: "center",
    textDecoration: "none",
    textTransform: "uppercase",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "100px",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.6)"
    }
  },
  boxContent: {
    bottom: 0,
    color: "black",
    fontSize: "12px",
    left: 0,
    letterSpacing: "1px",
    padding: "10px",
    position: "absolute",
    textTransform: "uppercase",
    width: "100%"
  },
  copyOverlay: {
    height: "100%",
    opacity: 0,
    transform: "scale(0.1)",
    transition: "transform 0.6s ease-in-out",
    width: "100%",
    zIndex: 0
  },
  showOverlay: {
    opacity: 1,
    position: "absolute",
    transform: "scale(50)",
    zIndex: 1
  },
  copyMessage: {
    alignItems: "center",
    bottom: 0,
    color: (props: ParentProps) =>
      chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,.6)" : "white",
    display: "flex",
    flexDirection: "column",
    fontSize: "4rem",
    justifyContent: "center",
    left: 0,
    opacity: 0,
    position: "fixed",
    right: 0,
    top: 0,
    transform: "scale(0.1)",
    "& h1": {
      background: "rgba(255, 255, 255, 0.2)",
      fontWeight: 400,
      marginBottom: 0,
      padding: "1rem",
      textAlign: "center",
      textShadow: "1px 2px black",
      textTransform: "uppercase",
      width: "100%"
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: 300
    }
  },
  showCopyMessage: {
    opacity: 1,
    transform: "scale(1)",
    transitionDelay: "0.3s",
    transition: "all 0.4s ease-in-out",
    zIndex: 2
  }
});

type ColorBoxProps = ParentProps & WithStyles<typeof styles>;

const ColorBox: React.FC<ColorBoxProps> = props => {
  const { background, classes, moreUrl, name } = props;
  const [copied, setCopied] = useState<boolean>(false);
  const [isDarkColor, setIsDarkColor] = useState<boolean>(
    chroma(background).luminance() <= 0.08
  );
  const [isLightColor, setIsLightColor] = useState<boolean>(
    chroma(background).luminance() > 0.08
  );

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }, [copied]);

  useEffect(() => {
    setIsDarkColor(chroma(background).luminance() <= 0.08);
    setIsLightColor(chroma(background).luminance() > 0.07);
  }, [background]);

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
