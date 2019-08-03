import {createStyles} from "@material-ui/styles";

export default createStyles({
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  colors: {
    height: "90%"
  },
  goBack: {
    backgroundColor: "black",
    display: "inline-block",
    height: "50%",
    margin: "0 auto -3.6px",
    opacity: 1,
    position: "relative",
    width: "20%",
    "& a": {
      background: "rgba(255, 255, 255, 0.3)",
      border: "none",
      color: "white",
      cursor: "pointer",
      display: "inline-block",
      fontSize: "1rem",
      height: "30px",
      left: "50%",
      lineHeight: "30px",
      outline: "none",
      position: "absolute",
      textAlign: "center",
      textDecoration: "none",
      textTransform: "uppercase",
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: "100px",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.6)",
        transition: ".5s"
      }
    }
  }
});
