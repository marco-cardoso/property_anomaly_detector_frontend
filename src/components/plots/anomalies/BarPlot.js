import React, {useContext} from 'react';
import Plot from 'react-plotly.js';

import {AnomalyContext} from '../../../contexts/anomalies';


export default function BarPlot() {

    const { barValues } = useContext(AnomalyContext);


    const layout = {
        autosize: true,
        transition: {
          duration: 500,
          easing: "cubic-in-out"
        },
        title: {
          font: {
            family: "Lato, sans-serif"
          }
        }
      };

    return (
        <>
             <Plot
                config = {{responsive: true}}

                data={[
                    {
                        type: 'bar', 
                        x: ['Anomaly', 'Neighbors', 'London'], 
                        y: [
                          barValues['anomaly'], 
                          barValues['district_median'], 
                          barValues['data_median']
                        ]
                    },
                ]}

                useResizeHandler={true}
                style = {{width: "95%", height: "100%"}}

                layout={ layout }/>

                
               
                
        </>
    )
}
