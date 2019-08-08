import { createStyles } from "@material-ui/styles";
import sizes from "../utils/sizes";
import chroma from "chroma-js";
import { ParentProps } from "../components/DraggableColorBox";

export default createStyles({
  root: {
    cursor: "pointer",
    display: "inline-block",
    height: "25%",
    margin: "0 auto -3.6px",
    position: "relative",
    width: "20%",
    "&:hover svg": {
      color: "white"
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%"
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5%"
    }
  },
  boxContent: {
    bottom: 0,
    color: (props: ParentProps) =>
      chroma(props.color).luminance() <= 0.08
        ? "rgba(255,255,255,.8)"
        : "rgba(0,0,0,.6)",
    display: "flex",
    fontSize: "12px",
    justifyContent: "space-between",
    left: 0,
    letterSpacing: "1px",
    padding: "10px",
    position: "absolute",
    textTransform: "uppercase",
    width: "100%"
  },
  deleteIcon: {
    transition: "all .3s ease-in-out",
    "&:hover": {
      transform: "scale(1.5)"
    }
  }
});
