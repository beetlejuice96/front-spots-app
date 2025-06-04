import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Box } from '@chakra-ui/react'
import { useSpotStore } from '@/store/useSpotStore'
import type { Spot } from '@/types'

// Configurar token de Mapbox
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

const mapStyles = `
  .mapboxgl-popup-content {
    border-radius: 0 !important;
    border: 3px solid var(--chakra-colors-brand-border) !important;
    box-shadow: 5px 5px 0px var(--chakra-colors-brand-border) !important;
    font-family: "Work Sans", sans-serif !important;
    padding: 0 !important;
  }
  
  .mapboxgl-popup-tip {
    border-top-color: var(--chakra-colors-brand-border) !important;
    border-width: 10px 10px 0 10px !important;
  }
  
  .mapboxgl-popup-close-button {
    font-size: 18px !important;
    font-weight: bold !important;
    color: var(--chakra-colors-brand-border) !important;
    padding: 0 5px !important;
  }
  
  .mapboxgl-ctrl-group {
    border: 3px solid var(--chakra-colors-brand-border) !important;
    box-shadow: 5px 5px 0px var(--chakra-colors-brand-border) !important;
    border-radius: 0 !important;
  }
  
  .mapboxgl-ctrl-zoom-in,
  .mapboxgl-ctrl-zoom-out {
    border-radius: 0 !important;
    font-family: "Space Mono", monospace !important;
    font-weight: bold !important;
    background-color: white !important;
  }
  
  .mapboxgl-ctrl-zoom-in:hover,
  .mapboxgl-ctrl-zoom-out:hover {
    background-color: var(--chakra-colors-gray-50) !important;
  }
  
  .custom-popup-content {
    padding: 16px;
    font-family: "Work Sans", sans-serif;
  }
  
  .custom-popup-title {
    font-family: "Space Mono", monospace;
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 8px 0;
    color: var(--chakra-colors-gray-800);
  }
  
  .custom-popup-description {
    font-size: 14px;
    margin: 8px 0;
    color: var(--chakra-colors-gray-600);
    line-height: 1.4;
  }
  
  .custom-popup-button {
    margin-top: 12px;
    padding: 8px 12px;
    background-color: var(--chakra-colors-brand-primary);
    color: white;
    border: 3px solid var(--chakra-colors-brand-border);
    font-weight: 600;
    font-family: "Space Mono", monospace;
    text-transform: uppercase;
    font-size: 12px;
    border-radius: 0;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    box-shadow: 5px 5px 0px var(--chakra-colors-brand-border);
  }
  
  .custom-popup-button:hover {
    background-color: var(--chakra-colors-brand-primary);
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px var(--chakra-colors-brand-border);
  }
  .custom-popup-button:active {
    transform: translate(5px, 5px);
    box-shadow: 0px 0px 0px var(--chakra-colors-brand-border) !important;
  }
`

const MapView = () => {
  const { filteredSpots, selectSpot } = useSpotStore()
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  // Inicializar mapa
  useEffect(() => {
    if (map.current || !mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/biteljuis/cmbayb12z001001s1ewcu7w2n',
      center: [0, 0],
      zoom: 2,
    })

    // Agregar controles
    map.current.addControl(new mapboxgl.NavigationControl())

    map.current.on('load', () => {
      setMapLoaded(true)
    })

    return () => {
      markers.current.forEach((marker) => marker.remove())
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Limpiar marcadores existentes
  const clearMarkers = () => {
    markers.current.forEach((marker) => marker.remove())
    markers.current = []
  }

  // Crear HTML del popup manteniendo el estilo original
  const createPopupHTML = (spot: Spot): string => {
    return `
      <div class="custom-popup-content">
        <h3 class="custom-popup-title">${spot.name}</h3>
        <p class="custom-popup-description">${spot.description}</p>
        <button 
          class="custom-popup-button" 
          onclick="window.handleSpotClick('${spot.id}')"
        >
          View Details
        </button>
      </div>
    `
  }

  // Exponer función global para manejar clicks
  useEffect(() => {
    ;(window as any).handleSpotClick = (spotId: string) => {
      selectSpot(spotId)
    }

    return () => {
      delete (window as any).handleSpotClick
    }
  }, [selectSpot])

  useEffect(() => {
    if (!map.current || !mapLoaded || !filteredSpots.length) return

    clearMarkers()

    filteredSpots.forEach((spot) => {
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        maxWidth: '300px',
      }).setHTML(createPopupHTML(spot))

      // Crear marcador personalizado si quieres mantener el estilo de Leaflet
      const markerElement = document.createElement('div')
      markerElement.style.width = '25px'
      markerElement.style.height = '41px'
      markerElement.style.backgroundImage =
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230EA5E9' stroke='white' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='10' r='8'/%3E%3Cpath d='M12 18L18 24H6L12 18Z'/%3E%3C/svg%3E\")"
      markerElement.style.backgroundSize = 'contain'
      markerElement.style.backgroundRepeat = 'no-repeat'
      markerElement.style.cursor = 'pointer'

      const marker = new mapboxgl.Marker({
        color: '#FF6B6B',
      })
        .setLngLat([spot.longitude, spot.latitude])
        .setPopup(popup)
        .addTo(map.current!)

      markers.current.push(marker)
    })

    if (filteredSpots.length > 1) {
      const bounds = new mapboxgl.LngLatBounds()
      filteredSpots.forEach((spot) => {
        bounds.extend([spot.longitude, spot.latitude])
      })

      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
      })
    } else if (filteredSpots.length === 1) {
      const spot = filteredSpots[0]
      map.current.flyTo({
        center: [spot.longitude, spot.latitude],
        zoom: 12,
      })
    }
  }, [filteredSpots, mapLoaded])

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
        <div
          ref={mapContainer}
          style={{
            height: '100%',
            width: '100%',
            border: '3px solid var(--chakra-colors-brand-border)',
          }}
        />
      </Box>
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
    </Box>
  )
}

export default MapView
