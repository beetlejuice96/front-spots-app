import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { useSpotStore } from '@/store/useSpotStore'

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: `${window.location.origin}/images/leaflet/marker-icon.png`,
  iconRetinaUrl: `${window.location.origin}/images/leaflet/marker-icon-2x.png`,
  shadowUrl: `${window.location.origin}/images/leaflet/marker-shadow.png`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const mapStyles = `
  .leaflet-container {
    height: 100%;
    width: 100%;
    border: 3px solid var(--chakra-colors-brand-border);
  }
  
  .leaflet-popup-content-wrapper {
    border-radius: 0 !important;
    border: 3px solid var(--chakra-colors-brand-border) !important;
    box-shadow: 5px 5px 0px var(--chakra-colors-brand-border) !important;
    font-family: "Work Sans", sans-serif !important;
  }
  
  .leaflet-popup-tip {
    border: 2px solid var(--chakra-colors-brand-border) !important;
    background-color: white !important;
  }
  
  .leaflet-control-zoom {
    border: 3px solid var(--chakra-colors-brand-border) !important;
    box-shadow: 5px 5px 0px var(--chakra-colors-brand-border) !important;
    border-radius: 0 !important;
  }
  
  .leaflet-control-zoom a {
    border-radius: 0 !important;
    font-family: "Space Mono", monospace !important;
    font-weight: bold !important;
  }
`

const MapView = () => {
  const { filteredSpots, selectSpot } = useSpotStore()
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (mapRef.current && filteredSpots.length > 0) {
      const bounds = L.latLngBounds(
        filteredSpots.map((spot) => [spot.latitude, spot.longitude]),
      )
      mapRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [filteredSpots])

  const handleMarkerClick = (spotId: string) => {
    selectSpot(spotId)
  }

  return (
    <Box h="full" w="full" position="relative" zIndex="0" p="2">
      <style>{mapStyles}</style>
      <Box
        h="full"
        w="full"
        border="3px solid"
        borderColor="brand.border"
        boxShadow="8px 8px 0px var(--chakra-colors-brand-border)"
      >
        <MapContainer
          center={[0, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredSpots.map((spot) => (
            <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
              <Popup>
                <Box fontFamily="body">
                  <Heading as="h3" size="md" fontFamily="mono">
                    {spot.name}
                  </Heading>
                  <Text fontSize="sm" my="2">
                    {spot.description}
                  </Text>
                  <Button
                    mt="2"
                    px="3"
                    py="2"
                    bg="brand.primary"
                    color="white"
                    border="2px solid"
                    borderColor="brand.border"
                    fontWeight="bold"
                    fontFamily="mono"
                    textTransform="uppercase"
                    fontSize="sm"
                    onClick={() => handleMarkerClick(spot.id)}
                    borderRadius="0"
                  >
                    View Details
                  </Button>
                </Box>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  )
}

export default MapView
