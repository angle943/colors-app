import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { DRAWER_WIDTH } from "../utils/constants";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
      display: "flex",
      alignItems: "center"
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
      width: "100%"
    },
    content: {
      flexGrow: 1,
      height: "calc(100vh - 64px)",
      padding: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -DRAWER_WIDTH
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      flexDirection: "column",
      width: "90%"
    },
    buttons: {
      width: "100%"
    },
    button: {
      width: "50%"
    }
  })
);
