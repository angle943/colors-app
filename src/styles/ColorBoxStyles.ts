import {createStyles} from "@material-ui/styles";
import chroma from "chroma-js";
import sizes from "../utils/sizes";

export interface ParentProps {
  background: string;
  moreUrl?: string;
  name: string;
}

export default createStyles({
  ColorBox: {
    display: "inline-block",
    height: (props: ParentProps) => (props.moreUrl ? "25%" : "50%"),
    margin: "0 auto -3.6px",
    position: "relative",
    width: "20%",
    "&:hover button": {
      opacity: 1,
      transition: ".5s"
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: (props: ParentProps) => (props.moreUrl ? "20%" : "33.3333%")
    },
    [sizes.down("md")]: {
      width: "50%",
      height: (props: ParentProps) => (props.moreUrl ? "10%" : "20%")
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: (props: ParentProps) => (props.moreUrl ? "5%" : "10%")
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
      width: "100%",
      [sizes.down("xs")]: {
        fontSize: "6rem"
      }
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
