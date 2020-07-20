import React, {useContext} from 'react';
import Plot from 'react-plotly.js';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet'

import {AnomalyContext} from '../../../contexts/anomalies';


export default function AnomaliesMap() {

    const position = [51.505, -0.09];

    const { anomalies } = useContext(AnomalyContext);

    return (
        <>
            <Map center={position} zoom={11} style={{ height : '95%', width : '95%'}}>
                <TileLayer
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                {anomalies.map(anomaly => (
                     <Circle color="red" radius={100} center={[anomaly['latitude'], anomaly['longitude']]}/>
                ))}

            </Map>

                
               
                
        </>
    )
}
