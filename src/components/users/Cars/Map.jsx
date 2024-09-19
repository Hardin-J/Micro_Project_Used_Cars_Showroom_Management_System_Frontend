// src/components/Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Replace these coordinates with the ones you want to use.
const locations = [
    {
        title: "BMW Service Center Madurai | KUN Exclusive",
        address1: "NH 7",
        address2: "Virudhunagar Road Survey No:82/9A2 - 12A Thoppur, Village, Madurai, Tamil Nadu 625008, India",
        coords: { lat: 9.874893408517268, lng: 78.02728133558196 },
        actions: [{ label: "Book appointment", defaultUrl: "/browseCars" }]
    },
    {
        title: "BMW KUN Motorrad - Madurai",
        address1: "Survey No. 82/9A2",
        address2: "National Highway 44, Virudhunagar Rd, Thoppur, Tamil Nadu 625008, India",
        coords: { lat: 9.875039866413118, lng: 78.0275735374344 }
    }
];

const Map = () => {
    const center = [9.874893408517268, 78.02728133558196]; // Center the map around the first location
    const zoom = 13; // Adjust zoom level as needed

    return (
        <MapContainer center={center} zoom={zoom} style={{ height: "300px", width: "100%", zIndex:"1" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => (
                <Marker key={index} position={[location.coords.lat, location.coords.lng]}>
                    <Popup>
                        <h3>{location.title}</h3>
                        <p>{location.address1}<br />{location.address2}</p>
                        {location.actions && location.actions.map((action, idx) => (
                            <a key={idx} href={action.defaultUrl} target="_blank" rel="noopener noreferrer">
                                {action.label}
                            </a>
                        ))}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
