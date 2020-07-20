import React from 'react'
import Grid from "@material-ui/core/Grid"
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
    return `${value}°C`;
  }

export default function AnomaliesForm({filters, setFilters}){

    const [value, setValue] = React.useState([0, 20]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <h3>Filters</h3>
            <Grid container xs={12}>
                {/* <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={0}
                    max={20}
                /> */}
                
            </Grid>

        </>
    )
}