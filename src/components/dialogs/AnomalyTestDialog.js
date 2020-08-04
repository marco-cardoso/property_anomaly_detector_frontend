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
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import CoordinatesPickerMap from '../plots/CoordinatePickerMap'
import {getCategoricalFilters} from '../../services/requests'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

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

  const [furnishedCategories, setFurnishedCategories] = useState([]);
  const [sharedOccupancyCategories, setSharedOccupancyCategories] = useState([]);
  const [propertyTypeCategories, setPropertyTypeCategories] = useState([]);

  const [furnished, setFurnished] = useState("");
  const [shared, setShared] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [amtBedrooms, setAmtBedrooms] = useState(1);
  const [amtBathrooms, setAmtBathrooms] = useState(1);
  const [amtRecepts, setAmtRecepts] = useState(1);
  const [price, setPrice] = useState(0);
  
  async function setCategoricalFilters(){
    const response = await getCategoricalFilters();
    const categoricalFilters = await response.json();

    setFurnishedCategories(categoricalFilters['furnished_state']);
    setSharedOccupancyCategories(categoricalFilters['shared_occupancy']);
    setPropertyTypeCategories(categoricalFilters['property_type']);
}


  useEffect(() => {
      setCategoricalFilters();
  }, [])


  return (
    <div>
      <Dialog style={{zIndex : 5}} onClose={toggle} aria-labelledby="classify-anomaly-dialog" open={status}>
        <DialogTitle id="classify-anomaly-dialog" onClose={toggle}>
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

          <FormGroup>
          <FormControl style={{ minWidth: 200, marginTop : 20}}>
            <InputLabel id="furnished-category-select-label">Furnished state</InputLabel>
            <Select
              labelId="furnished-category-select-label"
              id="furnished-category-select"
              onChange={(event) => setFurnished(event.target.value)}
              value={furnished}
            >
              {furnishedCategories.map((category, idx) => {
                  return <MenuItem value={idx}>{category}</MenuItem>
              })}
            </Select>
          </FormControl>
          {"\n"}


          <FormControl style={{ minWidth: 200, marginTop : 20}}>
            <InputLabel id="property-type-select-label">Property type</InputLabel>
            <Select
              labelId="property-type-select-label"
              id="property-type-select"
              onChange={(event) => setPropertyType(event.target.value)}
              value={propertyType}
            >
              {propertyTypeCategories.map((category, idx) => {
                  return <MenuItem value={idx}>{category}</MenuItem>
              })}
            </Select>
          </FormControl>
          {"\n"}
  

          <FormControl style={{ minWidth: 200, marginTop: 20}}>
            <InputLabel id="shared-occupancy-select-label">Shared occupancy</InputLabel>
            <Select
              labelId="shared-occupancy-select-label"
              id="shared-occupancy-select"
              onChange={(event) => setShared(event.target.value)}
              value={shared}
            >
              {sharedOccupancyCategories.map((category, idx) => {
                  return <MenuItem value={idx}>{category}</MenuItem>
              })}
            </Select>
          </FormControl>

          <TextField
            label="Amount of bedrooms"
            id="amt-bedrooms"
            type="number"
            value={amtBedrooms}
            style={{marginTop : 20}}
            onChange={(event) => setAmtBedrooms(event.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Amount of bathrooms"
            id="amt-bathrooms"
            type="number"
            value={amtBathrooms}
            style={{marginTop : 20}}
            onChange={(event) => setAmtBathrooms(event.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Amount of recepts"
            id="amt-recepts"
            type="number"
            value={amtRecepts}
            style={{marginTop : 20}}
            onChange={(event) => setAmtRecepts(event.value)}    
            InputLabelProps={{
              shrink: true,
            }}        
          />

          <TextField
            label="Property price"
            id="ppt-price"
            type="number"
            value={price}
            style={{marginTop : 20}}
            onChange={(event) => setPrice(event.value)} 
            InputLabelProps={{
              shrink: true,
            }}           
          />

          </FormGroup>
        
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
