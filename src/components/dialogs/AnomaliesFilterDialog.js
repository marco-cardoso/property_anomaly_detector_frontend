import React, {useState, useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
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
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {AnomalyContext} from '../../contexts/anomalies';
import colors from '../../colors';
import {getAnomalies} from '../../services/requests';

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

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));


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

  const classes = useStyles();

  const [flat, setFlat] = useState(true);
  const [studio, setStudio] = useState(true);
  const [otherPropTypes, setOtherPropTypes] = useState(false);

  const [furnished, setFurnished] = useState(true);
  const [unfurnished, setUnfurnished] = useState(true);
  const [otherFurnished, setOtherFurnished] = useState(false);

  const [shared, setShared] = useState(true);
  const [notShared, setNotShared] = useState(false);

  const [amtBedrooms, setAmtBedrooms] = useState([0, 5]);
  const [amtBathrooms, setAmtBathrooms] = useState([0, 5]);
  const [amtRecepts, setAmtRecepts] = useState([0, 5]);

  const {updateAnomalies} = useContext(AnomalyContext);


  async function filter(){

        var params = {}

        const furnishedStates = [[furnished, 'furnished'], [unfurnished, 'unfurnished', [otherFurnished, 'others']]]
        const pptStates = [[flat, "Flat"], [studio, "Studio"], [otherPropTypes, "others"]]
        const sharedState = [[shared, "Y"], [notShared, "N"]]

        params['furnished_state'] = furnishedStates.map((state) => {
          if((state[0] != null)  && (state[0] === true)){
            return state[1]
          }
          else {
            return -1
          }
      })

      params['property_type'] = pptStates.map((state) => {
        if((state[0] != null)  && (state[0] === true)){
          return state[1]
        }
        else {
          return -1
        }
      })

      params['shared_occupancy'] = sharedState.map((state) => {
        if((state[0] != null)  && (state[0] === true)){
          return state[1]
        }
        else {
          return -1
        }
      })

      params['num_bedrooms_min'] = amtBedrooms[0]
      params['num_bedrooms_max'] = amtBedrooms[1]

      params['num_bathrooms_min'] = amtBathrooms[0]
      params['num_bathrooms_max'] = amtBathrooms[1]

      params['num_recepts_min'] = amtRecepts[0]
      params['num_recepts_max'] = amtRecepts[1]

      const responseSuccess = await updateAnomalies(params)   
      if(responseSuccess)
      {
        toggle()
      }
  }
  

  return (
    <div>
      <Dialog style={{zIndex : 5}} onClose={toggle} aria-labelledby="customized-dialog-title" open={status}>
        <DialogTitle id="customized-dialog-title" onClose={toggle}>
            Anomalies Filter
        </DialogTitle>
        <DialogContent dividers>

        <span>Shared occupancy</span>

        <FormGroup row>
           
            <FormControlLabel
              control={
              <Checkbox 
              onClick={() => setShared(!shared)}
              checked={shared}  
              color="primary"
              />
            }
              label="Y"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => setNotShared(!notShared)}
                  checked={notShared}
                  color="primary"
                />
              }
              label="N"
            />
        </FormGroup>

        <span>Furnished state</span>

        <FormGroup row>
           
            <FormControlLabel
              control={
              <Checkbox 
              onClick={() => setFurnished(!furnished)}
              checked={furnished}  
              color="primary"
              />
            }
              label="Furnished"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => setUnfurnished(!unfurnished)}
                  checked={unfurnished}
                  color="primary"
                />
              }
              label="Unfurnished"
            />

        </FormGroup>



        <span>Property types</span>

        <FormGroup row>
           
            <FormControlLabel
              control={
              <Checkbox 
              onClick={() => setFlat(!flat)}
              checked={flat}  
              color="primary"
              />
            }
              label="Flat"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => setStudio(!studio)}
                  checked={studio}
                  color="primary"
                />
              }
              label="Studio"
            />
        </FormGroup>

        <span>Amount of bedrooms</span>

        <FormGroup row>

              <Slider
                value={amtBedrooms}
                style={{marginTop : '40px', color : 'red', marginRight : '55px', marginLeft : '10px'}}
                onChange={(event, newValue) => setAmtBedrooms(newValue)}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                min={0}
                max={20}
              />
           
            
        </FormGroup>

        <span>Amount of bathrooms</span>

        <FormGroup row>

              <Slider
                value={amtBathrooms}
                style={{marginTop : '40px', color : 'red', marginRight : '55px', marginLeft : '10px'}}
                onChange={(event, newValue) => setAmtBathrooms(newValue)}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                min={0}
                max={20}
              />
           
            
        </FormGroup>

        <span>Amount of recepts</span>

        <FormGroup row>
           
              <Slider
                value={amtRecepts}
                style={{marginTop : '40px',color : 'red', marginRight : '55px', marginLeft : '10px'}}
                onChange={(event, newValue) => setAmtRecepts(newValue)}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                min={0}
                max={20}
              />
            
        </FormGroup>


        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={filter} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
