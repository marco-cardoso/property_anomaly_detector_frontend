import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {useStyles} from './style'

import TitleBar from '../../components/parts/TitleBar'
import Footer from '../../components/parts/Footer'


export default function Dashboard({ title = 'Dashboard', mainPanel}) {


    const classes = useStyles();

    useEffect(() => {
    }, []);


    return (
    <Grid container   className={classes.root}>
            <Grid item xs={12} style={{height : '10%'}}>
                <TitleBar title={title}/>
            </Grid>

            <Grid item style={{height : '80%'}} container xs={12} >
                {mainPanel()}
            </Grid>

            <Grid item xs={12} style={{height : '10%'}}>
                <Footer/>
            </Grid>

            
    </Grid>
    )
};
