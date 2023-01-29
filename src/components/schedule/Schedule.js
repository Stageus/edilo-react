import React from "react";
import styled from "styled-components";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { Div } from "../../styles/style";

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Schedule = () => {
  
  return (
    <React.Fragment>
       <LoadScript googleMapsApiKey="AIzaSyDRilWm6AVPev1kjm1e7A06UdSUUESsyOw">
       <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
       </LoadScript>
    </React.Fragment>
  )

}

export default Schedule