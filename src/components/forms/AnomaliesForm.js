import React from 'react'
import Grid from "@material-ui/core/Grid"
import Slider from '@material-ui/core/Slider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import HelpIcon from '@material-ui/icons/Help';

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
            
            <Grid container xs={12}>
                <List style={{
                     display: 'flex',
                     flexDirection: 'row',
                     padding: 0,
                }}>
                    <ListItem>
                        <FilterListIcon/>
                    </ListItem>
                    <ListItem>
                        <HelpIcon/>
                    </ListItem>
                </List>
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