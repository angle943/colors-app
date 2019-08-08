import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { WithStyles, withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "../styles/DraggableColorBoxStyles";

export interface ParentProps {
  color: string;
  handleDelete(colorName: string): void;
  name: string;
}

type DraggableColorBoxStyles = ParentProps & WithStyles<typeof styles>;

const DraggableColorBox: React.FC<DraggableColorBoxStyles> = props => {
  const { classes, color, handleDelete, name } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={() => handleDelete(name)}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(SortableElement(DraggableColorBox));
