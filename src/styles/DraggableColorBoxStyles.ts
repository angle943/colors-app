import { createStyles } from "@material-ui/styles";
import sizes from "../utils/sizes";

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
    [sizes.down('lg')]: {
      width: "25%",
      height: "20%"
    },
    [sizes.down('md')]: {
      width: "50%",
      height: "10%"
    },
    [sizes.down('sm')]: {
      width: "100%",
      height: "5%"
    },
  },
  boxContent: {
    bottom: 0,
    color: "rgba(0,0,0,.5)",
    display: "flex",
    fontSize: "12px",
    justifyContent: "space-between",
    left: 0,
    letterSpacing: "1px",
    padding: "10px",
    position: "absolute",
    textTransform: "uppercase",
    width: "100%",
  },
  deleteIcon: {
    transition: "all .3s ease-in-out",
    "&:hover": {
      transform: "scale(1.5)"
    }
  }
});
