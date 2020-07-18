import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid"

import BarPlot from '../plots/anomalies/BarPlot.js'
import AnomaliesMap from '../plots/anomalies/AnomaliesMap.js'
import AnomaliesTable from '../tables/AnomaliesTable.js'

import AnomaliesForm from '../forms/AnomaliesForm.js'

export default function AnomaliesPanel(){

    const [filters, setFilters] = useState({});

    return(
        <React.Fragment>


                <Grid container xs={6}>
                    {/* <Grid item xs={12} style={{height : '20%'}}>
                       <AnomaliesForm filters={filters} setFilters={setFilters}/>
                    </Grid> */}
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

        </React.Fragment>
    )
}