import React, {useEffect, useState, useContext} from "react";
import Grid from "@material-ui/core/Grid";
import {useStyles} from './style'

import TitleBar from '../../components/parts/TitleBar'
import Footer from '../../components/parts/Footer'

import {PageSelectorContext} from '../../contexts/PageSelector'

export default function Dashboard({mainPanel}) {


    const classes = useStyles();
    const {test} = useContext(PageSelectorContext);

    useEffect(() => {
    }, []);


    return (
    <Grid container   className={classes.root}>
            <Grid item xs={12} style={{height : '7%'}}>
                <h1>{test}</h1>
                <TitleBar/>
            </Grid>

            <Grid item style={{height : '82%', backgroundColor : '#16181a' , paddingBottom : '20px'}} container xs={12} >
                {mainPanel()}
            </Grid>
            
            <Grid item xs={12} style={{height : '10%'}}>
                <Footer/>
            </Grid>

            
    </Grid>
    )
};
