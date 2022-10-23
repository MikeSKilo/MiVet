import React, { useState,useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker  } from '@react-google-maps/api';
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { useEffect } from 'react';

function PracticeMap({latlng, name}) {
    const _logger = debug.extend("Practices Map")
    const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const containerStyle = {
        width: 'auto',
        height: '450px'
    }
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    })
    const [center, setCenter] = useState({lat:0, lng:0})
    
    useEffect(() => {
        if (latlng.lat) {
            
            setCenter(prevState => {
                return {
                    ...prevState,
                    ...latlng
                }
            })
        }
    }, [latlng])

  const [map, setMap] = useState(null);
    _logger(map)
    const onLoad = useCallback(function callback(map) {
        setMap(map)
    }, [])
  
    const onUnmount = useCallback(function callback(map) {
        _logger("unmount", map);

        setMap(null)
    }, [])
    const onLoadMarker = marker => {
        _logger("marker", marker);
    }
    if (center !== (null||undefined) ) {
        
        return isLoaded ? (
              
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
                onLoad={onLoad}
                onUnmount={onUnmount}            
            >     
                <Marker
                    position={center}
                    label={name}
                    onLoad={onLoadMarker}            
                >           
                </Marker>
            </GoogleMap>        
        ) : <></>
    }
    
}
export default PracticeMap

PracticeMap.propTypes = {

    latlng: PropTypes.PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    name: PropTypes.string

}