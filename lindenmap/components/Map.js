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
import MapMenue from "./MapMenue";

export default function Map() {
  const [markers, setMarkers] = useState([
    { geocode: [6.002, -58.302], popup: "Marker 1" },
    { geocode: [6.005, -58.305], popup: "Marker 2" },
    { geocode: [6.008, -58.31], popup: "Marker 3" },
  ]);

  function createMarker(latlng) {
    setMarkers((prev) => [
      ...prev,
      {
        geocode: [latlng.lat, latlng.lng],
        popup: `Marker ${prev.length + 1}`,
      },
    ]);
  }

  return (
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

      <MapMenue />

      <DetectClick onMapClick={createMarker} />

      {markers.map((marker) => (
        <Marker position={marker.geocode}></Marker>
      ))}
    </MapContainer>
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
