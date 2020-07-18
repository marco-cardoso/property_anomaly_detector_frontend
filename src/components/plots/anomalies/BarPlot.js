import React from 'react';
import Plot from 'react-plotly.js';

export default function BarPlot() {


    return (
        <>
             <Plot
                config = {{responsive: true}}

                data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },
                {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}

                useResizeHandler={true}
                style = {{width: "95%", height: "100%"}}

                layout={ {autosize: true, title: 'A Fancy Plot'} }/>

                
               
                
        </>
    )
}
