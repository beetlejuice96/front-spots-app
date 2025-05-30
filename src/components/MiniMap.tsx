import React, { useRef } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MiniMapProps {
  latitude: number
  longitude: number
}

const MiniMap: React.FC<MiniMapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<L.Map | null>(null)

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
      ref={mapRef}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        key={`${latitude}${longitude}`}
        position={[latitude, longitude]}
      />
    </MapContainer>
  )
}

export default MiniMap
