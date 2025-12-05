//create function that handles placing markers on the map
//the fuction should: get on click coordinates
// place marker on coordinates

//Plan
//create react state as an empty array to hold markers
//add coordinates from get coordinates to the array

"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useEffect } from "react";
import MapMenue from "./MapMenue";
import "./components.css";

export default function Map() {
  const [markers, setMarkers] = useState([]);

  const [clickCoords, setClickCoords] = useState(null);
  const [isMenueOpen, setIsMenueOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/markers")
      .then((data) => data.json())
      .then((data) => {
        setMarkers(data);
      })
      .catch((error) => {
        setMarkers([]); // fallback to empty array on error
        console.error("Failed to fetch markers:", error);
      });
  }, []);

  function getclickCoords(latlng) {
    setClickCoords(latlng);
  }

  const MapMenueButton = !isMenueOpen ? (
    <button className="btn" type="button" onClick={() => setIsMenueOpen(true)}>
      Open Menue
    </button>
  ) : (
    <MapMenue
      clickCoords={clickCoords}
      setMarkers={setMarkers}
      setIsMenueOpen={setIsMenueOpen}
    />
  );

  return (
    <div className="page">
      <div>{MapMenueButton}</div>
      <MapContainer
        center={[6, -58.3]}
        zoom={13}
        maxZoom={16}
        minZoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="http://localhost:3001/tiles/{z}/{x}/{y}.png"
          attribution="&copy; Linden Map"
        />

        <DetectClick onMapClick={getclickCoords} />

        {markers.map((marker) => (
          <Marker
            position={marker.geocode}
            key={Math.random(marker.ID)}
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function DetectClick({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick?.(e.latlng);
      console.log(e);
    },
  });
  return null;
}
