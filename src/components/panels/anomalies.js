import React, {useState, useEffect, useContext} from 'react'
import Grid from "@material-ui/core/Grid"

import AnomalyPlots from '../plots/anomalies/AnomalyPlots.js'
import AnomaliesMap from '../plots/anomalies/AnomaliesMap.js'
import AnomaliesTable from '../tables/AnomaliesTable.js'
import AnomaliesForm from '../forms/AnomaliesForm.js'
import {AnomalyContext} from '../../contexts/anomalies'
import {SnackbarContext} from '../../contexts/SnackbarContext'
import {getAnomalies} from '../../services/requests';


export default function AnomaliesPanel(){

    const [filters, setFilters] = useState({});

    // Map attributes
    const [position, setPosition] = useState([51.505, -0.09]);
    const [zoom, setZoom] = useState(6);
    const [currentMarker, setCurrentMarker] = useState(null);

    // Bar plot attributes
    const [barValues, setBarValues] = useState({
        'outlier_score' : 0,
        'data_median' : 0,
        'anomaly' : 0,
        'district_median' : 0
    });

    // Table attributes
    const [anomalies, setAnomalies] = useState([]);
    const [tableIndex, setTableIndex] = useState(null);

    // General attributes
    const [lastUpdateDate, setlastUpdateDate] = useState(null);


    const {setSnackbarType, setSnackbarMessage, setSnackbarStatus, setBackdropStatus} = useContext(SnackbarContext);

    function changeBarValues(index){
        if(index != null){
            const anomaly = anomalies[index];
            var current_values = barValues;
            current_values['anomaly'] = anomaly['monthly_rental_price'];
            current_values['district_median'] = anomaly['neighbors_median'];
            current_values['outlier_score'] = anomaly['outlier_score'];

            setBarValues(current_values);
        }
    }

    function changeMap(index){

        const anomaly = anomalies[index];
        if(index != null)
        {
            setZoom(12);
            setPosition([anomaly.latitude, anomaly.longitude]);
            setCurrentMarker(index);
        }

    }

    function changeTableProps(index){
        setTableIndex(index)
    }

    function displaySnackbarError(){
        setSnackbarType("error")
        setSnackbarMessage("Invalid data parameters !") 
        setSnackbarStatus(true)   
    }

    function displaySnackbarSuccess(){
        setSnackbarType("success")
        setSnackbarMessage("Anomalies successfully updated !") 
        setSnackbarStatus(true)   
    }

     async function updateAnomalies(){
        setBackdropStatus(true);
        try {
            const response =  await getAnomalies()
            if(response.status === 200){

                const responseResult = await response.json()
    
                setAnomalies(responseResult['anomalies'])  
                setlastUpdateDate(responseResult['last_update_date'])
                
                displaySnackbarSuccess()
                setBackdropStatus(false);
                return true;
                
            }
            else 
            {
                displaySnackbarError()
            }
        }
        catch (e){
            console.log(e)
            displaySnackbarError()
        }  
        setBackdropStatus(false);
        return false;
    }

    useEffect(() => {
        updateAnomalies();
      }, [])


 
    return(
        <React.Fragment>
                
                <AnomalyContext.Provider value={{anomalies, setAnomalies, updateAnomalies, lastUpdateDate, currentMarker, changeMap,position, zoom,  barValues, changeBarValues, tableIndex, setTableIndex, changeTableProps}}>
                    <Grid container xs={7}>
                        <Grid item xs={12} style={{height : '95%'}}>
                            <AnomaliesForm filters={filters} setFilters={setFilters}/>
                            <AnomaliesTable/>
                        </Grid>
                    </Grid>

                    <Grid container xs={5}>
                        <Grid item xs={12} style={{height : '50%' }}>
                            <AnomaliesMap/>
                        </Grid>
                        <Grid item xs={12} style={{height : '50%'}}>
                            <AnomalyPlots/>
                        </Grid>
                    </Grid>
                </AnomalyContext.Provider>
               

        </React.Fragment>
    )
}