import React, {useEffect, useState, useContext} from "react";
import Grid from "@material-ui/core/Grid";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useStyles} from './style'

import TitleBar from '../../components/parts/TitleBar'
import Footer from '../../components/parts/Footer'
import CustomSnackbar from '../../components/parts/Snackbar'

import {PageSelectorContext} from '../../contexts/PageSelector'
import {SnackbarContext} from '../../contexts/SnackbarContext'

import colors from '../../colors'

export default function Dashboard({mainPanel}) {


    const classes = useStyles();
    const {test} = useContext(PageSelectorContext);

    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState("success");

    const [backdropStatus, setBackdropStatus] = useState(false);

    useEffect(() => {
    }, []);


    return (
        <SnackbarContext.Provider value={{snackbarStatus, setSnackbarStatus, setBackdropStatus,  snackbarType, setSnackbarType, snackbarMessage, setSnackbarMessage}}>
            <Grid container   className={classes.root}>
                <Grid item xs={12} style={{height : '7%'}}>
                    <h1>{test}</h1>
                    <TitleBar/>
                </Grid>

                <Grid item style={{height : '82%', backgroundColor : colors['secondary_color'] , paddingBottom : '20px'}} container xs={12} >
                    {mainPanel()}
                </Grid>
                
                <Grid item xs={12} style={{height : '10%'}}>
                    <Footer/>
                </Grid>

                <CustomSnackbar/>
                <Backdrop className={classes.backdrop} open={backdropStatus} onClick={() => setBackdropStatus(!backdropStatus)}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Grid>
        </SnackbarContext.Provider>
       
    )
};
