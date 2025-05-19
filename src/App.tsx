import { useEffect } from 'react'
import { useSpotStore } from './store/useSpotStore'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import MapView from '@/views/MapView/MapView'
import Navigation from '@/components/Navigation'
import ListView from './views/ListView/ListView'
import DetailView from './views/DetailView/DetailView'

function App() {
  const {
    fetchSpots,
    fetchFilterOptions,
    viewMode,
    isLoading,
    error,
    applyFilters,
  } = useSpotStore()

  //FIXME: try to replace useEffecto with other thing
  useEffect(() => {
    const initializeApp = async () => {
      await fetchSpots()
      await fetchFilterOptions()
      applyFilters()
    }
    initializeApp()
  }, [fetchSpots, fetchFilterOptions, applyFilters])

  return (
    <Flex direction="column" h="100vh">
      <Box
        as="header"
        bg="brand.primary"
        p={4}
        borderBottom="3px solid"
        borderColor="brand.border"
      >
        <Heading as="h1" size="lg" color="white" letterSpacing="tight">
          SKATE SPOT FINDER
        </Heading>
      </Box>
      <Box as="main" flex="1" overflow="hidden" position="relative" p={2}>
        {isLoading && (
          <Flex
            position="absolute"
            inset="0"
            alignItems="center"
            justifyContent="center"
            bg="white"
            // bgOpacity={0.8}
            opacity={0.8}
            zIndex={50}
          >
            <Box
              animation="bounce 1s infinite"
              bg="brand.primary"
              p={4}
              border="3px solid"
              borderColor="brand.border"
            >
              <Text fontWeight="bold" color="white">
                LOADING...
              </Text>
            </Box>
          </Flex>
        )}
        {error && (
          <Box
            p={4}
            bg="brand.primary"
            color="white"
            m={4}
            border="3px solid"
            borderColor="brand.border"
          >
            <Text fontWeight="bold" as="span">
              ERROR:
            </Text>{' '}
            {error}
          </Box>
        )}

        <Box h="full">
          {viewMode === 'map' && <MapView />}
          {viewMode === 'list' && <ListView />}
          {viewMode === 'detail' && <DetailView />}
        </Box>
      </Box>
      <Navigation />
    </Flex>
  )
}

export default App
