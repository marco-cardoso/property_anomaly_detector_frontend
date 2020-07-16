import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {useStyles} from './style'
import TitleBar from '../../components/parts/TitleBar'

export const Dashboard = () => {


    const classes = useStyles();

    useEffect(() => {
    }, []);


    return (
    <Grid container   className={classes.root}>
            <Grid item xs={12} style={{height : '10%'}}>
                <TitleBar/>
            </Grid>

            <Grid style={{height : '80%'}} container xs={12} >

                <Grid container xs={6}>
                    <Grid item xs={12} style={{height : '20%'}}>
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

            </Grid>

            <Grid item xs={12} style={{height : '10%'}}>
                <h2> Footer</h2>
            </Grid>

            
    </Grid>
    )
};
