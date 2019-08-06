import { createStyles} from "@material-ui/styles";


const drawerWidth = 400;

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
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
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
    }
  },
  button: {
    margin: "0 0.5rem"
  }
});
