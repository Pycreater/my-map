"use client";

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define marker data type
interface MarkerData {
  position: [number, number];
  label: string;
}

const markers: MarkerData[] = [
  { position: [28.6139, 77.209], label: "New Delhi" },
  { position: [19.076, 72.8777], label: "Mumbai" },
  { position: [13.0827, 80.2707], label: "Chennai" },
  { position: [22.5726, 88.3639], label: "Kolkata" },
  { position: [12.9716, 77.5946], label: "Bangalore" },
];

function CenterMap({ position }: { position: [number, number] }) {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
}

const MyMap: React.FC = () => {
  const [center, setCenter] = useState<[number, number]>([28.6139, 77.209]); // Initial center
  const [zoom, setZoom] = useState<number>(5); // Initial zoom level

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 1, 18)); // Max zoom level is 18
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 1, 1)); // Min zoom level is 1
  };

  return (
    <div style={{ position: "relative", height: "640px", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            eventHandlers={{
              click: () => {
                setCenter(marker.position);
              },
            }}
          >
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}
        <CenterMap position={center} />
        <ZoomControl position="topright" />
      </MapContainer>
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <button onClick={handleZoomIn} style={{ margin: "0 5px" }}>
          Zoom In
        </button>
        <button onClick={handleZoomOut} style={{ margin: "0 5px" }}>
          Zoom Out
        </button>
      </div>
    </div>
  );
};

export default MyMap;
