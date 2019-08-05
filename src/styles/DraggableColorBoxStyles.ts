import { createStyles } from "@material-ui/styles";

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
    }
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
