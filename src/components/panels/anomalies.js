import React, {useState, useEffect} from 'react'
import Grid from "@material-ui/core/Grid"

import BarPlot from '../plots/anomalies/BarPlot.js'
import AnomaliesMap from '../plots/anomalies/AnomaliesMap.js'
import AnomaliesTable from '../tables/AnomaliesTable.js'
import AnomaliesForm from '../forms/AnomaliesForm.js'
import {AnomalyContext} from '../../contexts/anomalies'
import {getAmomalies} from '../../services/requests';


export default function AnomaliesPanel(){

    const [filters, setFilters] = useState({
        'test' : 'hello'
    });
    const [loading, setLoading] = useState(false);

    // Map attributes
    const [position, setPosition] = useState([51.505, -0.09]);
    const [zoom, setZoom] = useState(6);
    const [currentMarker, setCurrentMarker] = useState(null);

    // Bar plot attributes
    const [barValues, setBarValues] = useState({
        'data_median' : 0,
        'anomaly' : 0,
        'district_median' : 0
    });

    // Table attributes
    const [anomalies, setAnomalies] = useState([]);
    const [tableIndex, setTableIndex] = useState(0);

    function changeBarValues(index){
        if(index != null){
            const anomaly = anomalies[index];
            var current_values = barValues;
            current_values['anomaly'] = anomaly['monthly_rental_price'];
            current_values['district_median'] = anomaly['neighbors_median'];

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

    useEffect(() => {
        async function fetchMyAPI() {
          let response = await fetch("http://0.0.0.0:5000/anomalies?shared_occupancy=['Y']")
          response = await response.json()
          console.log(response)

          var bv = barValues;
          bv['data_median'] = response['data_median'];

          setBarValues(bv);
          setAnomalies(response['anomalies'])          
        }
    
        fetchMyAPI()
      }, [])

 
    return(
        <React.Fragment>
                
                <AnomalyContext.Provider value={{anomalies, setAnomalies, currentMarker, changeMap,position, zoom,  barValues, changeBarValues, tableIndex, changeTableProps}}>
                    <Grid container xs={6}>
                        <Grid item xs={12} style={{height : '20%'}}>
                            <AnomaliesForm filters={filters} setFilters={setFilters}/>
                        </Grid>
                        <Grid item xs={12} style={{height : '80%'}}>
                            <AnomaliesTable/>
                        </Grid>
                    </Grid>

                    <Grid container xs={6}>
                        <Grid item xs={12} style={{height : '50%' }}>
                        <AnomaliesMap/>
                        </Grid>
                        <Grid item xs={12} style={{height : '50%'}}>
                        <BarPlot/>
                        </Grid>
                    </Grid>
                </AnomalyContext.Provider>
               

        </React.Fragment>
    )
}