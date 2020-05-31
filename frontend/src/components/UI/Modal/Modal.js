import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '90vw',
    maxWidth: 1000,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    overflow: 'scroll',
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
  image: {
    maxWidth: 800,
    width: '90%',
    margin: '20px',
  },
  typo: {
    fontWeight: 'bold',
    '&:hover': {
      color: '#b71c1c',
    }
  },
  text: {
    width: '100%',
    padding: '20px',
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography type="button" underline='hover' className={classes.typo} onClick={handleOpen}>
        {props.children}
      </Typography>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <h2>{props.modalTitle}</h2>
          <img className={classes.image} src={props.modalImage} alt=""/>
          <div className={classes.text}>
            {props.modalContent}
          </div>
        </div>
      </Modal>
    </div>
  );
}
