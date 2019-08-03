import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import {WithStyles, withStyles} from '@material-ui/styles';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "rc-slider/assets/index.css";
import styles from "../styles/NavbarStyles";

interface ParentProps {
  changeLevel?(newLevel: number): void;
  handleChange(format: string): void;
  level?: number;
}

type NavbarProps = ParentProps & WithStyles<typeof styles>;

const Navbar: React.FC<NavbarProps> = props => {
  const { changeLevel, classes, handleChange, level } = props;
  const [format, setFormat] = useState<string>("hex");
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void => {
    if (!e || !e.target) return;
    const value = e.target.value as string;
    setFormat(value);
    handleChange(value);
    setShowSnackbar(true);
  };

  const closeSnackbar = (): void => {
    setShowSnackbar(false);
  };

  return (
    <header className={classes.Navbar}>
      <div className={classes.logo}>
        <Link to="/">reactcolorpicker</Link>
      </div>
      {level && <div>
        <span>Level: {level}</span>
        <div className={classes.slider}>
          <Slider
            defaultValue={level}
            max={900}
            min={100}
            onAfterChange={changeLevel}
            step={100}
          />
        </div>
      </div>}
      <div className={classes.selectContainer}>
        <Select onChange={handleSelectChange} value={format}>
          <MenuItem value="hex">HEX - #FFFFFF</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgb(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={showSnackbar}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format Changed to {format.toUpperCase()}!</span>
        }
        ContentProps={{ "aria-describedby": "message-id" }}
        onClose={closeSnackbar}
        action={[
          <IconButton
            onClick={closeSnackbar}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </header>
  );
};

export default withStyles(styles)(Navbar);
