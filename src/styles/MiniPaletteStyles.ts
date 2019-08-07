import {createStyles} from "@material-ui/styles";

export default createStyles({
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    overflow: "hidden",
    padding: ".5rem",
    position: "relative",
    cursor: "pointer",
    "&:hover $deleteIcon": {
      opacity: 1
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
  },
  deleteIcon: {
    backgroundColor: "#eb3d30",
    color: "white",
    height: "40px",
    opacity: 0,
    padding: "10px",
    position: "absolute",
    right: "0px",
    top: "0px",
    transition: "all .3s ease-in-out",
    width: "40px",
    zIndex: 10,
  }
});
