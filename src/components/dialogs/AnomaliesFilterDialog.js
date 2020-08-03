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
import {AnomalyContext} from '../../contexts/anomalies';
import {getCategoricalFilters} from '../../services/requests'

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


  const [amtBedrooms, setAmtBedrooms] = useState([0, 5]);
  const [amtBathrooms, setAmtBathrooms] = useState([0, 5]);
  const [amtRecepts, setAmtRecepts] = useState([0, 5]);

  const [furnishedStates, setFurnishedStates] = useState([]);
  const [furnishedCategories, setFurnishedCategories] = useState([]);

  const [sharedOccupancyStates, setSharedOccupancyStates] = useState([]);
  const [sharedOccupancyCategories, setSharedOccupancyCategories] = useState([]);

  const [propertyTypeStates, setPropertyTypeStates] = useState([]);
  const [propertyTypeCategories, setPropertyTypeCategories] = useState([]);

  const {updateAnomalies} = useContext(AnomalyContext);

  async function setCategoricalFilters(){
        const response = await getCategoricalFilters();
        const categoricalFilters = await response.json();

        setFurnishedCategories(categoricalFilters['furnished_state']);
        setFurnishedStates(categoricalFilters['furnished_state'].map(() => {
          return false;
        }))

        setSharedOccupancyCategories(categoricalFilters['shared_occupancy']);
        setSharedOccupancyStates(categoricalFilters['shared_occupancy'].map(() => {
          return false;
        }))

        setPropertyTypeCategories(categoricalFilters['property_type']);
        setPropertyTypeStates(categoricalFilters['property_type'].map(() => {
          return false;
        }))
  }

  useEffect(() => {

      setCategoricalFilters();

  }, [])


  function changeSharedOccupancy(idx){
    const so = [...sharedOccupancyStates];
    so[idx] = !so[idx]
    setSharedOccupancyStates(so);
  }

  function changeFurnished(idx){
    const so = [...furnishedStates];
    so[idx] = !so[idx]
    setFurnishedStates(so);
  }

  function changePropertyType(idx){
    const so = [...propertyTypeStates];
    so[idx] = !so[idx]
    setPropertyTypeStates(so);
  }

  async function filter(){

        var params = {}

      //   const furnishedStates = [[furnished, 'furnished'], [unfurnished, 'unfurnished', [otherFurnished, 'others']]]
      //   const pptStates = [[flat, "Flat"], [studio, "Studio"], [otherPropTypes, "others"]]
      //   const sharedState = [[shared, "Y"], [notShared, "N"]]

      //   params['furnished_state'] = furnishedStates.map((state) => {
      //     if((state[0] != null)  && (state[0] === true)){
      //       return state[1]
      //     }
      //     else {
      //       return -1
      //     }
      // })

      // params['property_type'] = pptStates.map((state) => {
      //   if((state[0] != null)  && (state[0] === true)){
      //     return state[1]
      //   }
      //   else {
      //     return -1
      //   }
      // })

      // params['shared_occupancy'] = sharedState.map((state) => {
      //   if((state[0] != null)  && (state[0] === true)){
      //     return state[1]
      //   }
      //   else {
      //     return -1
      //   }
      // })

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

        <Typography variant="h6" component="h3">
          Shared occupancy
        </Typography>

        <FormGroup row>
            {sharedOccupancyStates.map((state, idx) => {
                 return <FormControlLabel
                    control={
                        <Checkbox 
                        onChange={() =>  changeSharedOccupancy(idx)}
                        checked={sharedOccupancyStates[idx]}  
                        color="primary"
                        />
                  }
                    label={sharedOccupancyCategories[idx]}
               />
                })
            }            
        </FormGroup>

        <Typography variant="h6" component="h3">
          Furnished state
        </Typography>

        <FormGroup row>
            {furnishedStates.map((state, idx) => {
                 return <FormControlLabel
                    control={
                        <Checkbox 
                        onChange={() =>  changeFurnished(idx)}
                        checked={furnishedStates[idx]}  
                        color="primary"
                        />
                  }
                    label={furnishedCategories[idx]}
               />
                })
            }            
        </FormGroup>


        <Typography variant="h6" component="h3">
          Property types
        </Typography>

        <FormGroup row>
            {propertyTypeStates.map((state, idx) => {
                 return <FormControlLabel
                    control={
                        <Checkbox 
                        onChange={() =>  changePropertyType(idx)}
                        checked={propertyTypeStates[idx]}  
                        color="primary"
                        />
                  }
                    label={propertyTypeCategories[idx]}
               />
                })
            }            
        </FormGroup>

        <Typography variant="h6" component="h3">
          Amount of bedrooms
        </Typography>

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

        <Typography variant="h6" component="h3">
          Amount of bathrooms
        </Typography>

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

        <Typography variant="h6" component="h3">
          Amount of recepts
        </Typography>

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
