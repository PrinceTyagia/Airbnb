import React, { useState } from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
const Map = ({ serachResults }) => {
  const [selectedlLocation, setSelectedLocation] = useState({});
  //   Transform the search result object into the longitude or latitude

  const coordinates = serachResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(coordinates);

  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <>
      <ReactMapGl
        mapStyle="mapbox://styles/princetyagia/cl9c96uz3002115pu4ql0d2x5"
        mapboxAccessToken={process.env.mapbox_key}
        {...viewport}
        width="50%"
        height="100% "
        onMove={(evt) => setViewPort(evt.viewState)}
      >
        {serachResults.map((result) => (
          <div key={result.lat}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <p
                onClick={() => setSelectedLocation(result)}
                className="cursor-pointer text-xl animate-bounce"
                aria-label="push-pin"
                role="img"
              >
                📌
              </p>
            </Marker>
          </div>
        ))}

        {/* 
       this is markup popup */}
        {/* {
        selectedlLocation.long === result.long ? (
            <Popup
            onClose={() => setSelectedLocation({})}
            closeOnClick={true}
            latitude={result.lat}
            longitude={result.long}
            >
              {result.title}
            </Popup>
        ): false
       } */}
      </ReactMapGl>
    </>
  );
};

export default Map;
