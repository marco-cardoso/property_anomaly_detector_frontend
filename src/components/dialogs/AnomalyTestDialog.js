import React, {useState, useContext, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CoordinatesPickerMap from '../plots/CoordinatePickerMap'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});



const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AnomaliesFilterDialog({status, toggle}) {

  const londonCoordinates = [51.505, -0.09];

  const [pickerPosition, setPickerPosition] = useState(londonCoordinates);
  async function setCategoricalFilters(){
       
  }

  useEffect(() => {

      setCategoricalFilters();

  }, [])


  return (
    <div>
      <Dialog style={{zIndex : 5}} onClose={toggle} aria-labelledby="customized-dialog-title" open={status}>
        <DialogTitle id="customized-dialog-title" onClose={toggle}>
            Insert the property data below
        </DialogTitle>
        <DialogContent dividers>
          <CoordinatesPickerMap 
            center={londonCoordinates} 
            pickerPos={pickerPosition} 
            setPickerPos={setPickerPosition}
            zoom={13}
          />
          <p>Latitude : {pickerPosition[0].toFixed(3)} Longitude : {pickerPosition[1].toFixed(3)} </p>
        </DialogContent>
        <DialogActions>
          <Button autoFocus  color="primary">
            Get the anomaly score
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
