import React, {useContext, useEffect} from 'react';
import Plot from 'react-plotly.js';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet'

import {AnomalyContext} from '../../../contexts/anomalies';


export default function AnomaliesMap() {

    const { anomalies, position, zoom } = useContext(AnomalyContext);

    return (
        <>
            <Map center={position} zoom={zoom} style={{ height : '95%', width : '95%'}}>
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
