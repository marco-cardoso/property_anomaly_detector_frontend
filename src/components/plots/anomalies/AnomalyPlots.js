import React, {useContext} from 'react';
import Plot from 'react-plotly.js';

import {AnomalyContext} from '../../../contexts/anomalies';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ScoreCard from '../../parts/ScoreCard';

export default function AnomalyPlots() {

    const { barValues } = useContext(AnomalyContext);

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
      },
    }));

    const layout = {
        autosize: true,
        plot_bgcolor:"#232629",
        paper_bgcolor:"#232629",
        transition: {
          duration: 500,
          easing: "cubic-in-out"
        },
        yaxis: {
          nticks: 10,
          range: [0, 1500],
          tickcolor: 'white',
          gridcolor: '#232629',
        },
        font : {
          color : 'white',
          size : 16
        },
        title: {
          color : 'white',
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
