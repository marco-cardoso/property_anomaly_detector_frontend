import React, {useContext, useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet'

import {AnomalyContext} from '../../../contexts/anomalies';


export default function AnomaliesMap() {

    const { anomalies, position,currentMarker, zoom, changeTableProps, changeBarValues } = useContext(AnomalyContext);

    const [colors, setColors] = useState([]);
    const [radius, setRadius] = useState([]);


    function handleMarkerClick(index){
        changeTableProps(index);
        changeBarValues(index);
        changeMarkerColors(index);
    }

    function changeMarkerColors(index){
        var c = [];
        var r = [];

        anomalies.map(() => {
            c.push("red");
            r.push(100);
        })

        if(index != null){
            c[index] = "yellow";
            r[index] = 200;
        }

        setColors(c);
        setRadius(r);
    }

    useEffect(() => {
        
        changeMarkerColors(null);

    }, [anomalies]);


    useEffect(() => {
        
        if(currentMarker != null){
            changeMarkerColors(currentMarker);
        }

    }, [currentMarker]);


    return (
        <>
            <Map center={position} zoom={zoom} style={{ height : '95%', width : '95%'}}>
                <TileLayer
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                {anomalies.map((anomaly, i) => (
                     <Circle key={i} onClick={() => handleMarkerClick(i) } color={colors[i]} radius={radius[i]} center={[anomaly['latitude'], anomaly['longitude']]}/>
                ))}

            </Map>

                
               
                
        </>
    )
}
