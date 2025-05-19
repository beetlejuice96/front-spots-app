import { useSpotStore } from '../store/useSpotStore'
import { Box, Button, Flex } from '@chakra-ui/react'

const Navigation = () => {
  const { viewMode, setViewMode } = useSpotStore()

  // Don't show navigation when in detail view
  if (viewMode === 'detail') return null

  return (
    <Box
      position="fixed"
      bottom="6"
      left="0"
      right="0"
      display="flex"
      justifyContent="center"
      zIndex={10}
    >
      <Flex
        bg="white"
        border="3px solid"
        borderColor="brand.border"
        p="1"
        boxShadow="5px 5px 0px var(--chakra-colors-brand-border)"
      >
        <Button
          px="6"
          py="2"
          fontWeight="bold"
          fontFamily="mono"
          textTransform="uppercase"
          fontSize="sm"
          variant={viewMode === 'map' ? 'primary' : 'unstyled'}
          onClick={() => setViewMode('map')}
          borderRadius="0"
          _hover={{ bg: viewMode === 'map' ? 'brand.primary' : 'gray.100' }}
        >
          Map
        </Button>
        <Button
          px="6"
          py="2"
          fontWeight="bold"
          fontFamily="mono"
          textTransform="uppercase"
          fontSize="sm"
          variant={viewMode === 'list' ? 'primary' : 'unstyled'}
          onClick={() => setViewMode('list')}
          borderRadius="0"
          _hover={{ bg: viewMode === 'list' ? 'brand.primary' : 'gray.100' }}
        >
          List
        </Button>
      </Flex>
    </Box>
  )
}

export default Navigation
