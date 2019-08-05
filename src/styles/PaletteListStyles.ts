import {createStyles} from "@material-ui/styles";

export default createStyles({
  root: {
    alignItems: "flex-start",
    backgroundColor: "blue",
    display: "flex",
    height: "100vh",
    justifyContent: "center"
  },
  container: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "50%"
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
    gridGap: "5%",
    gridTemplateColumns: "repeat(3, 30%)",
    width: "100%"
  }
});
