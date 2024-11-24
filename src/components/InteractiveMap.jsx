// components/InteractiveMap.js
"use client"
import React, { Suspense } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import { useRouter } from 'next/navigation';

import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

// Import the GeoJSON data with center coordinates for each region
import ethiopiaRegions from "../data/ethiopiaRegions.json";

// Custom object for region descriptions
const regionDescriptions = {
  "Oromia": "Oromia is the largest region by population in Ethiopia, rich in natural resources and diverse cultures.",
  "Amara": "Amhara is known for its historical sites, including the famous Lalibela rock churches.",
  "Tigray": "Tigray is renowned for its ancient history and archaeological sites.",
  "SNNP": "SNNP-Sidama Region: Sidama is celebrated for its coffee production, lush landscapes, and the vibrant lakeside city of Hawassa.•  Southern Region (SNNPR): Known for its ethnic diversity and the scenic Omo Valley, SNNPR is a cultural and eco-tourism hub.• South West Ethiopia Region: This region is rich in forests, biodiversity, and coffee cultivation, with a unique mix of cultures.•  Central Ethiopia: Central Ethiopia combines urban energy with historical sites and highland beauty",
  "Afar": "Afar is known for its unique culture, including the Afar people's pastoralist lifestyle and their traditional music and dance.",
  "Somali": "Somali is the largest region by size in Ethiopia, and known for its unique culture, including the Somali people's pastoralist lifestyle and their traditional music and dance.",
  "Diredewa": "Diredewa is a region in Ethiopia known for its unique culture and traditional music and dance."
  // Add more regions and their descriptions as needed
};

export default function InteractiveMap() {
  const router = useRouter();
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // This effect will run only once when the component mounts
      // Cleanup function to ensure the map is destroyed when the component unmounts
      if (typeof window !== "undefined") {

      const mapContainer = document.querySelector('.leaflet-container');
      if (mapContainer) {
        mapContainer._leaflet_id = null;
      }
    }
  }, []);

  const defaultStyle = {
    color: "#293745",
    weight: 0.5,
    fillOpacity: 0.2,
  };

  const hoverStyle = {
    color: "#FF4719",
    weight: 2,
    fillOpacity: 0.4,
  };

  const onEachRegion = (region, layer) => {
    layer.setStyle(defaultStyle);

    layer.on({
      mouseover: (e) => {
        const targetLayer = e.target;
        setHoveredRegion(region.properties.name);
        setPosition({ x: e.originalEvent.pageX, y: e.originalEvent.pageY });
        targetLayer.setStyle({ color: "#FFFFFF", weight: 3, fillColor: "#FF4719", fillOpacity: 10 });
      },
      mouseout: (e) => {
        const targetLayer = e.target;
        setHoveredRegion(null);
        targetLayer.setStyle({ color: "#FFFFFF", weight: 3, fillColor: "transparent", fillOpacity: 0 });
      },
      click: () => {
        const regionName = region.properties.name;
        if (regionName === "Oromia") {
          router.push('/oromia');
        } else if (regionName === "Amara") {
          router.push('/amara');
        } else if (regionName === "Tigray") {
          router.push('/tigray');
        } else if (regionName === "SNNP") {
          router.push('/south_area');
        } else if (regionName === "Somali" || regionName === "Diredewa") {
          router.push('/east_area');
        } else if (regionName === "Afar") {
          router.push('/afar');
        }
      },
    });
  };

  return (
    <div className="relative flex flex-col items-center">
      <Suspense fallback={<div>Loading map...</div>}>
        <MapContainer center={[9.145, 40.489673]} zoom={6} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON data={ethiopiaRegions} style={defaultStyle} onEachFeature={onEachRegion} />

          {/* Add markers using the center coordinates from the JSON data */}
          {ethiopiaRegions.features.map((feature, index) => {
            const position = feature.properties.center; // Use the new center property

            if (!position) return null; // Skip if center is missing

            return (
              <Marker
                key={index}
                position={position}
                // Optional: custom icon if desired
              >
                <Popup>
                  <h4>{feature.properties.name}</h4>
                  <p>Details about the projects in {feature.properties.name}...</p>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </Suspense>

      {hoveredRegion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white rounded-lg shadow-md p-4 w-64 absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <div className="relative z-50">
            <h4 className="font-bold">{hoveredRegion}</h4>
            <p>{regionDescriptions[hoveredRegion] || "No description available."}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
