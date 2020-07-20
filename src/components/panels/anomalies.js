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

    const [anomalies, setAnomalies] = useState([])

    useEffect(() => {
        async function fetchMyAPI() {
          let response = await fetch("http://0.0.0.0:5000/anomalies?shared_occupancy=['Y']")
          response = await response.json()
          console.log(response)
          setAnomalies(response)
        }
    
        fetchMyAPI()
      }, [])

 
    return(
        <React.Fragment>
                
                <AnomalyContext.Provider value={{anomalies, setAnomalies}}>
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