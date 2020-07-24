import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {SnackbarContext} from '../../contexts/SnackbarContext'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomSnackbar() {
  const classes = useStyles();

  const {snackbarStatus, setSnackbarStatus, snackbarType, snackbarMessage} = useContext(SnackbarContext);
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarStatus(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={snackbarStatus} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}