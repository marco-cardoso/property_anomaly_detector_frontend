import React from 'react'
import Grid from "@material-ui/core/Grid"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import HelpIcon from '@material-ui/icons/Help';


export default function AnomaliesForm({filters, setFilters}){



    return (
        <>
            
            <Grid container xs={12}>
                <List style={{
                     display: 'flex',
                     flexDirection: 'row',
                     padding: 0,
                     marginLeft : '25px',
                     marginBottom : '10px'
                }}>
                    <ListItem>
                        <FilterListIcon/>
                    </ListItem>
                    <ListItem>
                        <HelpIcon/>
                    </ListItem>
                </List>
            </Grid>

        </>
    )
}