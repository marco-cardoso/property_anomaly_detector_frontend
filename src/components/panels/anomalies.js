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

    const [position, setPosition] = useState([51.505, -0.09]);
    const [zoom, setZoom] = useState(6);
    const [barValues, setBarValues] = useState({
        'data_median' : 0,
        'anomaly' : 0,
        'district_median' : 0
    });
    const [anomalies, setAnomalies] = useState([])

    useEffect(() => {
        async function fetchMyAPI() {
          let response = await fetch("http://0.0.0.0:5000/anomalies?shared_occupancy=['Y']")
          response = await response.json()
          console.log(response)

          setBarValues({
              'data_median' : 700,
              'anomaly' : 0,
              'district_median' : 0
          })

          setAnomalies(response['anomalies'])
        }
    
        fetchMyAPI()
      }, [])

 
    return(
        <React.Fragment>
                
                <AnomalyContext.Provider value={{anomalies, setAnomalies, position, setPosition, zoom, setZoom, barValues, setBarValues}}>
                    <Grid container xs={6}>
                        {/* <Grid item xs={12} style={{height : '20%'}}>
                        <AnomaliesForm filters={filters} setFilters={setFilters}/>
                        </Gr                        id> */}
                        <Grid item xs={12}>
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