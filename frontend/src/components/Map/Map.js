import React, { useEffect } from 'react';
import L from 'leaflet';
import './Map.css'
import 'leaflet/dist/leaflet.css';
export default function Map() {
    useEffect(() => {
        // create map
        L.map('map', {
          center: [-23.5967045, -46.6485564],
          zoom: 20,
          layers: [
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
              attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }),
          ]
        });
      }, []);

  return <div id="map"></div>
}

