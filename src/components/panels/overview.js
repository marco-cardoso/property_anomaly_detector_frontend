import React from 'react';
import Grid from "@material-ui/core/Grid";

export default function OverviewPanel(){
    return(
        <React.Fragment>


                <Grid container xs={7}>
                    <Grid style={{height : '10%'}} item xs={12}>
                        <h2>Filters </h2>
                    </Grid>
                    <Grid  style={{height : '40%'}} item xs={12}>
                        <h2>Heatmap</h2>
                    </Grid>
                    <Grid  style={{height : '40%'}} item xs={12}>
                        <h2>Bar plot</h2>
                    </Grid>
                </Grid>

                <Grid container xs={5}>
                    <Grid item xs={12}>
                        <h2>Price hist</h2>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid xs={8}>
                            <h2>Property type prices</h2>
                        </Grid>
                        <Grid xs={4}>
                            <h2>Price ECDF</h2>
                        </Grid>
                    </Grid>
                </Grid>

        </React.Fragment>
    )
}