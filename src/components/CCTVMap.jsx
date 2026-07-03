import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function CCTVMap({ cameras, onPlayModal }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([-1.88, 103.65], 11);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      maxZoom: 19,
    }).addTo(map);

    const icon = L.divIcon({
      className: "custom-marker",
      html: `<div style="background:#e94560;width:12px;height:12px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 6px rgba(233,69,96,0.6);"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    const markers = [];
    cameras.forEach((cam) => {
      const marker = L.marker([cam.lat, cam.lon], { icon }).addTo(map);
      marker.bindPopup(`
        <div style="font-weight:600;color:#fff;margin-bottom:4px;">${cam.nama_segment}</div>
        <div style="font-size:0.8rem;margin-bottom:6px;">Status: <span style="color:#00c853">${cam.status}</span></div>
        <button onclick="window.__openModal('${cam.id}')" style="background:#e94560;color:#fff;padding:4px 12px;border-radius:6px;border:none;cursor:pointer;font-size:0.8rem;">
          <i class="fas fa-play"></i> Play
        </button>
      `);
      markers.push(marker);
    });

    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [cameras]);

  useEffect(() => {
    window.__openModal = (camId) => {
      const cam = cameras.find((c) => c.id === camId);
      if (cam) onPlayModal(cam);
    };
    return () => {
      delete window.__openModal;
    };
  }, [cameras, onPlayModal]);

  return <div ref={mapRef} className="w-full h-full" />;
}
