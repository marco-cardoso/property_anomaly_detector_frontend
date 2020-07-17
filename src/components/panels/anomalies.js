import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";

export default function AnomaliesPanel(){

    const [filters, setFilters] = useState({});

    return(
        <React.Fragment>


                <Grid container xs={6}>
                    <Grid item xs={12} style={{height : '20%'}}>
                       {/* TODO implement the filters  */}
                        <h2>Filters</h2>
                    </Grid>
                    <Grid item xs={12} style={{height : '80%'}}>
                        <h2>Table</h2>
                    </Grid>
                </Grid>

                <Grid container xs={6}>
                    <Grid item xs={12}>
                        <h2>Map</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Bar plot</h2>
                    </Grid>
                </Grid>

        </React.Fragment>
    )
}