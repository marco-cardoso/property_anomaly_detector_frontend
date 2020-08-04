import React, {useContext, useEffect, useState} from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet';

export default function CoordinatesPickerMap({center, pickerPos, setPickerPos, zoom}) {

    const defaultPicker = L.icon({
        iconUrl: "/blue_marker.png",
        iconSize: [40,40],
        iconAnchor: [32, 32],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    const selectedPicker = L.icon({
        iconUrl: "/red_marker.png",
        iconSize: [40,40],
        iconAnchor: [32, 32],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });


    const [picker, setPicker] = useState(defaultPicker);
    const [frozenPicker, setFrozenPicker] = useState(false);

    function showPicker(event){
        if(frozenPicker === false){
            const {lat, lng} = event.latlng;
            setPickerPos([lat, lng]);
        }
        
    }


    function freezePicker(event){
        setFrozenPicker(!frozenPicker);
        if(frozenPicker === true){
            setPicker(defaultPicker);
        }
        else {
            setPicker(selectedPicker);
        }
    }

    return (
        <>
            <p style={{textAlign : 'center'}}>Click somewhere in the map below to get the property coordinates</p>
            <Map center={center} 
                zoom={zoom} 
                onMousemove={showPicker}
                onClick={freezePicker}
                style={{ height : '300px', 
                zIndex: 3, 
                width : '95%'}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                 <Marker position={pickerPos} icon={picker} />
            </Map>
        </>
    )
}
