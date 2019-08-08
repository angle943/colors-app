import {createStyles} from "@material-ui/styles";
import sizes from "../utils/sizes";
import bg from "./bg.svg"

export default createStyles({
  "@global": {
    ".fade-exit": {
      opacity: 1
    },
    ".fade-exit-active": {
      opacity: 0.01,
      transition: "opacity 500ms ease-out"
    }
  },
  root: {
    alignItems: "flex-start",
    /* background by SVGBackgrounds.com */
    backgroundColor: "#e0bbff",
    backgroundImage: `url(${bg})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    overflow: "scroll"
  },
  heading: {
    fontSize: "2rem",
    margin: "1.5rem 0"
  },
  container: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "50%",
    [sizes.down('xl')]: {
      width: "80%"
    },
    [sizes.down('xs')]: {
      width: "75%"
    }
  },
  nav: {
    alignItems: "center",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    "& a": {
      color: "white"
    }
  },
  palettes: {
    display: "grid",
    gridGap: "1.5rem",
    gridTemplateColumns: "repeat(3, 30%)",
    width: "100%",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "100%",
      gridGap: "1.4rem"
    }
  }
});
