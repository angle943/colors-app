import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Avatar from "@material-ui/core/Avatar";
import blue from "@material-ui/core/colors/blue";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import red from "@material-ui/core/colors/red";
import { WithStyles, withStyles } from "@material-ui/styles";

import MiniPalette from "./MiniPalette";
import { ISeedColor } from "../seedColors";
import styles from "../styles/PaletteListStyles";

interface PaletteListProps
  extends RouteComponentProps,
    WithStyles<typeof styles> {
  deletePalette(id: string): void;
  palettes: ISeedColor[];
}

const PaletteList: React.FC<PaletteListProps> = props => {
  const { classes, deletePalette, history, palettes } = props;
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string>("");

  const goToPalette = (id: string): void => {
    history.push(`/palette/${id}`);
  };

  const deleteSelectedPalette = (): void => {
    if (deletingId) {
      deletePalette(deletingId);
    }
    setDeleteDialogIsOpen(false);
  };

  const openDialog = (id: string): void => {
    setDeleteDialogIsOpen(true);
    setDeletingId(id);
  };

  const closeDialog = (): void => {
    setDeleteDialogIsOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map(palette => (
            <CSSTransition classNames="fade" key={palette.id} timeout={500}>
              <MiniPalette
                openDialog={openDialog}
                {...palette}
                handleClick={goToPalette}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={deleteDialogIsOpen}
        aria-labelledby="delete-dialog-title"
        onClose={closeDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
        <List>
          <ListItem button onClick={deleteSelectedPalette}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
