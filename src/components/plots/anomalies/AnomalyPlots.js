import React, {useContext} from 'react';
import Plot from 'react-plotly.js';

import {AnomalyContext} from '../../../contexts/anomalies';
import { Grid } from '@material-ui/core';

import ScoreCard from '../../parts/ScoreCard';
import colors from '../../../colors'

export default function AnomalyPlots() {

    const { barValues } = useContext(AnomalyContext);

    const layout = {
        autosize: true,
        plot_bgcolor: colors['terciary_color'],
        paper_bgcolor: colors['terciary_color'],
        transition: {
          duration: 500,
          easing: "cubic-in-out"
        },
        yaxis: {
          nticks: 10,
          range: [0, 2500],
          tickcolor: 'white',
          gridcolor: colors['terciary_color'],
        },
        font : {
          color : colors['primary_text_color'],
          size : 16
        },
        title: {
          color : colors['terciary_color'],
          text : "Price comparison",
          font: {
            family: "Lato, sans-serif"
          }
        }
      };

    return (
        <>

           <Grid container xs={12} style={{height : '100%'}}>

           <Grid  item xs={7} style={{paddingLeft : '100px'}}>
                <Plot
                        config = {{responsive: true}}
                        data={[
                            {
                                width : 0.3,
                                type: 'bar', 
                                marker : {
                                  color : ['red', '#037bfc', 'blue']
                                },
                                x: ['Anomaly', 'Neighbors', 'London'], 
                                y: [
                                  barValues['anomaly'], 
                                  barValues['district_median'], 
                                  barValues['data_median']
                                ]
                            },
                        ]}
                        
                        useResizeHandler={true}
                        style = {{width: "80%", height: "90%", paddingTop : '40px'}}

                        layout={ layout }/>    
            </Grid> 

            <Grid item  xs={5}>
                  <ScoreCard  
                        score={barValues['outlier_score']} 
                        title="Anomaly score" 
                        color="white"
                        backgroundImage='linear-gradient(to bottom right, red , #f55742)'
                        height="90%"
                        width="90%"
                        
                    />
            </Grid>
           </Grid>
   
        </>
    )
}
