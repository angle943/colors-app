import { createStyles } from "@material-ui/styles";
import { DRAWER_WIDTH } from "../utils/constants";
import sizes from "../utils/sizes";

export default createStyles({
  root: {
    display: "flex"
  },
  appBar: {
    flexDirection: "row",
    height: "64px",
    justifyContent: "space-between",
    alignItems: "center"
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH
  },
  menuButton: {
    marginRight: "5px"
  },
  hide: {
    display: "none"
  },
  navBtns: {
    marginRight: "1rem",
    "& a": {
      textDecoration: "none"
    },
    [sizes.down("xs")]: {
      marginRight: "0.5rem"
    }
  },
  button: {
    margin: "0 0.5rem",
    [sizes.down("xs")]: {
      margin: "0 0.2rem",
      padding: "0.3rem"
    }
  }
});
