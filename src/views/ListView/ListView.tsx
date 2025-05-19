import { useSpotStore } from '@/store/useSpotStore'
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Badge,
} from '@chakra-ui/react'

const ListView = () => {
  const { filteredSpots, selectSpot } = useSpotStore()

  return (
    <Box p={4} overflow="auto" h="full">
      <Heading as="h2" size="xl" mb={6} fontFamily="mono">
        SKATE SPOTS
      </Heading>

      {filteredSpots.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          py={8}
          border="3px solid"
          borderColor="brand.border"
          bg="white"
          p={6}
          boxShadow="8px 8px 0px var(--chakra-colors-brand-border)"
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            NO SPOTS MATCH YOUR FILTERS
          </Text>
          <Button
            onClick={() => useSpotStore.getState().resetFilters()}
            variant="primary"
            px={6}
            py={3}
          >
            Reset Filters
          </Button>
        </Flex>
      ) : (
        <VStack spacing={6} align="stretch">
          {filteredSpots.map((spot) => (
            <Box
              key={spot.id}
              bg="white"
              border="3px solid"
              borderColor="brand.border"
              boxShadow="8px 8px 0px var(--chakra-colors-brand-border)"
              overflow="hidden"
              transition="all 0.2s"
              _hover={{
                transform: 'translate(2px, 2px)',
                boxShadow: '6px 6px 0px var(--chakra-colors-brand-border)',
              }}
              cursor="pointer"
              onClick={() => selectSpot(spot.id)}
            >
              <Box p={4}>
                <Flex justify="space-between" align="start" mb={2}>
                  <Heading as="h3" size="md" fontFamily="mono">
                    {spot.name}
                  </Heading>
                  {spot.difficulty_level && (
                    <Badge variant="secondary" px={3} py={1}>
                      {spot.difficulty_level.name}
                    </Badge>
                  )}
                </Flex>

                <Text color="gray.800" mb={4} noOfLines={2}>
                  {spot.description}
                </Text>

                <Flex align="center" fontSize="sm" mb={3} fontFamily="mono">
                  <Box
                    as="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    h="4"
                    w="4"
                    mr="1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </Box>
                  <Text fontWeight="bold">
                    {spot.city || 'Unknown location'}
                  </Text>
                </Flex>

                <Flex flexWrap="wrap" gap={2}>
                  {spot.spot_type && (
                    <Badge variant="accent" px={2} py={1}>
                      {spot.spot_type.name}
                    </Badge>
                  )}
                  {spot.surface_type && (
                    <Badge variant="success" px={2} py={1}>
                      {spot.surface_type.name}
                    </Badge>
                  )}
                  {spot.has_security && (
                    <Badge variant="warning" px={2} py={1}>
                      Security
                    </Badge>
                  )}
                </Flex>
              </Box>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  )
}

export default ListView
