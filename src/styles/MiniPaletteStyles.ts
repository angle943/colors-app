import {createStyles} from "@material-ui/styles";

export default createStyles({
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    overflow: "hidden",
    padding: ".5rem",
    position: "relative",
    "&:hover": {
      cursor: "pointer"
    }
  },
  colors: {
    backgroundColor: "#dae1e4",
    borderRadius: "5px",
    height: "150px",
    overflow: "hidden",
    width: "100%"
  },
  title: {
    alignItems: "center",
    color: "black",
    display: "flex",
    fontSize: "1rem",
    justifyContent: "space-between",
    margin: "0",
    paddingTop: ".5rem",
    position: "relative"
  },
  emoji: {
    fontSize: "1.5rem",
    marginLeft: ".5rem"
  },
  miniColor: {
    display: "inline-block",
    height: "25%",
    margin: "0 auto",
    marginBottom: "-3.5px",
    position: "relative",
    width: "20%"
  }
});
