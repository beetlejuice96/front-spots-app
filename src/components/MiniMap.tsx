import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Box } from '@chakra-ui/react'

interface MiniMapProps {
  latitude: number
  longitude: number
}

const MiniMap: React.FC<MiniMapProps> = ({ latitude, longitude }) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/biteljuis/cmbayb12z001001s1ewcu7w2n',
      center: [longitude, latitude],
      zoom: 2,
    })

    map.current.addControl(new mapboxgl.NavigationControl())

    map.current.on('load', () => {
      setMapLoaded(true)
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (!map.current || !mapLoaded) return

    new mapboxgl.Marker({
      color: '#FF6B6B',
    })
      .setLngLat([longitude, latitude])
      .addTo(map.current)

    map.current.setCenter([longitude, latitude])
    map.current.setZoom(15)
  }, [mapLoaded])

  return (
    <>
      <div
        ref={mapContainer}
        style={{
          height: '100%',
          width: '100%',
          border: '3px solid var(--chakra-colors-brand-border)',
        }}
      />
      {!mapLoaded && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="white"
          p="4"
          border="3px solid"
          borderColor="brand.border"
          boxShadow="5px 5px 0px var(--chakra-colors-brand-border)"
          fontFamily="mono"
          fontWeight="bold"
        >
          Loading map...
        </Box>
      )}
    </>
  )
}

export default MiniMap
