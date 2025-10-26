"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
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
    </MapContainer>
  );
}
