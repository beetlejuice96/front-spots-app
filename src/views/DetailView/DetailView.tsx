import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Badge,
} from '@chakra-ui/react'
import { useSpotStore } from '@/store/useSpotStore'
import { supabase } from '@/lib/supabase'

const DetailView = () => {
  const { selectedSpot, setViewMode } = useSpotStore()
  const [primaryPhotoUrl, setPrimaryPhotoUrl] = useState<string | null>(null)
  const [photoUrls, setPhotoUrls] = useState<string[]>([])

  useEffect(() => {
    if (!selectedSpot?.photos || !selectedSpot.photos.length) return

    const loadPhotos = async () => {
      // Find primary photo
      const primaryPhoto = selectedSpot.photos
        ? selectedSpot.photos.find((p) => p.is_primary)
        : undefined
      const otherPhotos = selectedSpot.photos
        ? selectedSpot.photos.filter((p) => !p.is_primary)
        : []

      // Load primary photo
      if (primaryPhoto) {
        const { data: primaryData } = supabase.storage
          .from('photos')
          .getPublicUrl(primaryPhoto.storage_path)

        if (primaryData) {
          setPrimaryPhotoUrl(primaryData.publicUrl)
        }
      }

      // Load other photos
      const urls = await Promise.all(
        otherPhotos.map(async (photo) => {
          const { data } = supabase.storage
            .from('photos')
            .getPublicUrl(photo.storage_path)
          return data?.publicUrl || ''
        }),
      )

      setPhotoUrls(urls.filter(Boolean))
    }

    loadPhotos()
  }, [selectedSpot])

  if (!selectedSpot) return null

  return (
    <Box h="full" overflow="auto" bg="brand.background">
      <Box position="relative">
        {primaryPhotoUrl ? (
          <Box position="relative">
            <Image
              src={primaryPhotoUrl || '/placeholder.svg'}
              alt={selectedSpot.name}
              w="full"
              h="56"
              objectFit="cover"
              borderBottom="3px solid"
              borderColor="brand.border"
            />
            <Box
              position="absolute"
              inset="0"
              border="3px solid"
              borderColor="brand.border"
              pointerEvents="none"
            ></Box>
          </Box>
        ) : (
          <Flex
            w="full"
            h="56"
            bg="brand.primary"
            alignItems="center"
            justifyContent="center"
            border="3px solid"
            borderColor="brand.border"
          >
            <Heading as="h1" size="xl" color="white" fontFamily="mono">
              {selectedSpot.name}
            </Heading>
          </Flex>
        )}

        <Button
          onClick={() => setViewMode('map')}
          position="absolute"
          top="4"
          left="4"
          bg="white"
          p="3"
          border="3px solid"
          borderColor="brand.border"
          boxShadow="5px 5px 0px var(--chakra-colors-brand-border)"
          _hover={{
            transform: 'translate(2px, 2px)',
            boxShadow: '3px 3px 0px var(--chakra-colors-brand-border)',
          }}
          transition="all 0.2s"
          borderRadius="0"
        >
          <Box
            as="svg"
            xmlns="http://www.w3.org/2000/svg"
            h="6"
            w="6"
            color="black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </Box>
        </Button>
      </Box>

      <Box p="4">
        <Flex justify="space-between" align="center" mb="4">
          <Heading as="h1" size="xl" fontFamily="mono">
            {selectedSpot.name}
          </Heading>
          {selectedSpot.difficulty_level && (
            <Badge variant="secondary" px="3" py="1">
              {selectedSpot.difficulty_level.name}
            </Badge>
          )}
        </Flex>

        <Text
          color="black"
          mb="6"
          border="3px solid"
          borderColor="brand.border"
          bg="white"
          p="4"
          boxShadow="5px 5px 0px var(--chakra-colors-brand-border)"
          transform="rotate(-0.5deg)"
        >
          {selectedSpot.description}
        </Text>

        <SimpleGrid columns={2} spacing="4" mb="6">
          <Box
            bg="white"
            p="3"
            border="3px solid"
            borderColor="brand.border"
            boxShadow="5px 5px 0px var(--chakra-colors-brand-border)"
            transform="rotate(0.5deg)"
          >
            <Text
              fontSize="sm"
              fontWeight="bold"
              fontFamily="mono"
              textTransform="uppercase"
              mb="1"
            >
              Type
            </Text>
            <Text fontWeight="bold">
              {selectedSpot.spot_type?.name || 'Unknown'}
            </Text>
          </Box>

          <Box
            bg="white"
            p="3"
            border="3px solid"
            borderColor="brand.border"
            boxShadow="5px 5px 0px var(--chakra-colors-brand-border)"
            transform="rotate(-0.5deg)"
          >
            <Text
              fontSize="sm"
              fontWeight="bold"
              fontFamily="mono"
              textTransform="uppercase"
              mb="1"
            >
              Surface
            </Text>
            <Text fontWeight="bold">
              {selectedSpot.surface_type?.name || 'Unknown'}
            </Text>
          </Box>

          <Box
            bg="white"
            p="3"
            border="3px solid"
            borderColor="brand.border"
            boxShadow="5px 5px 0px var(--chakra-colors-brand-border)"
            transform="rotate(-0.75deg)"
          >
            <Text
              fontSize="sm"
              fontWeight="bold"
              fontFamily="mono"
              textTransform="uppercase"
              mb="1"
            >
              Best Time
            </Text>
            <Text fontWeight="bold">{selectedSpot.best_time || 'Anytime'}</Text>
          </Box>

          <Box
            bg="white"
            p="3"
            border="3px solid"
            borderColor="brand.border"
            boxShadow="5px 5px 0px var(--chakra-colors-brand-border)"
            transform="rotate(0.75deg)"
          >
            <Text
              fontSize="sm"
              fontWeight="bold"
              fontFamily="mono"
              textTransform="uppercase"
              mb="1"
            >
              Tranquility
            </Text>
            <Text fontWeight="bold">
              {selectedSpot.tranquility_level
                ? `${selectedSpot.tranquility_level}/10`
                : 'Unknown'}
            </Text>
          </Box>
        </SimpleGrid>

        <Box mb="6">
          <Heading as="h2" size="md" fontFamily="mono" mb="3">
            FEATURES
          </Heading>
          <Flex flexWrap="wrap" gap="2">
            {selectedSpot.has_water && (
              <Badge variant="accent" px="3" py="2">
                Water Available
              </Badge>
            )}
            {selectedSpot.has_security && (
              <Badge variant="warning" px="3" py="2">
                Security Present
              </Badge>
            )}
            {selectedSpot.is_public && (
              <Badge variant="success" px="3" py="2">
                Public Access
              </Badge>
            )}
          </Flex>
        </Box>

        {selectedSpot &&
          selectedSpot.obstacles &&
          selectedSpot.obstacles.length > 0 && (
            <Box mb="6">
              <Heading as="h2" size="md" fontFamily="mono" mb="3">
                OBSTACLES
              </Heading>
              <Box
                bg="white"
                border="3px solid"
                borderColor="brand.border"
                boxShadow="8px 8px 0px var(--chakra-colors-brand-border)"
              >
                {selectedSpot.obstacles.map((obstacle, index) => (
                  <Box
                    key={obstacle.id}
                    p="4"
                    borderBottom={
                      //FIXME: refactor this,this is not a good way to do it
                      index !== (selectedSpot.obstacles?.length ?? 0) - 1
                        ? '3px solid'
                        : 'none'
                    }
                    borderColor="brand.border"
                  >
                    <Heading as="h3" size="sm" fontFamily="mono">
                      {obstacle.name}
                    </Heading>
                    {obstacle.notes && <Text mt="1">{obstacle.notes}</Text>}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

        {photoUrls.length > 0 && (
          <Box mb="6">
            <Heading as="h2" size="md" fontFamily="mono" mb="3">
              PHOTOS
            </Heading>
            <SimpleGrid columns={2} spacing="3">
              {photoUrls.map((url, index) => (
                <Box
                  key={index}
                  border="3px solid"
                  borderColor="brand.border"
                  boxShadow="5px 5px 0px var(--chakra-colors-brand-border)"
                  transform={`rotate(${index % 2 === 0 ? '1' : '-1'}deg)`}
                >
                  <Image
                    src={url || '/placeholder.svg'}
                    alt={`${selectedSpot.name} photo ${index + 1}`}
                    w="full"
                    h="32"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}

        <Box mb="6">
          <Heading as="h2" size="md" fontFamily="mono" mb="3">
            LOCATION
          </Heading>
          <Box
            bg="white"
            p="4"
            border="3px solid"
            borderColor="brand.border"
            boxShadow="8px 8px 0px var(--chakra-colors-brand-border)"
          >
            <Text fontWeight="bold">
              {[
                selectedSpot.address,
                selectedSpot.city,
                selectedSpot.province,
                selectedSpot.country,
              ]
                .filter(Boolean)
                .join(', ')}
            </Text>
            <Box
              mt="3"
              h="40"
              bg="brand.background"
              border="3px solid"
              borderColor="brand.border"
            >
              {/* Mini map would go here */}
              <Flex h="full" alignItems="center" justifyContent="center">
                <Text fontFamily="mono" fontWeight="bold">
                  {selectedSpot.latitude}, {selectedSpot.longitude}
                </Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DetailView
