import { useState } from 'react'

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSpotStore } from '@/store/useSpotStore'
import type { Filters } from '@/types'

const FilterPanel = () => {
  const {
    filters,
    setFilter,
    resetFilters,
    applyFilters,
    spotTypes,
    difficultyLevels,
    surfaceTypes,
  } = useSpotStore()

  const [isOpen, setIsOpen] = useState(false)

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilter(key, value)
  }

  const handleApplyFilters = () => {
    applyFilters()
    setIsOpen(false)
  }

  const handleResetFilters = () => {
    resetFilters()
    setIsOpen(false)
  }

  const isFiltersApplied = Object.values(filters).some(
    (value) => value !== null && value !== undefined && value !== '',
  )

  return (
    <Box position="relative" zIndex={1000}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        position="fixed"
        top="20"
        right="4"
        bg="white"
        p="3"
        border="3px solid"
        borderColor="brand.border"
        boxShadow="5px 5px 0px var(--chakra-colors-brand-border)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={1000}
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
          h="5"
          w="5"
          color="black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </Box>
        {isFiltersApplied && (
          <Flex
            position="absolute"
            top="-2"
            right="-2"
            bg="brand.primary"
            color="white"
            fontSize="xs"
            fontWeight="bold"
            w="6"
            h="6"
            alignItems="center"
            justifyContent="center"
            border="2px solid"
            borderColor="brand.border"
          >
            !
          </Flex>
        )}
      </Button>

      {isOpen && (
        <Box
          position="fixed"
          inset="0"
          bg="blackAlpha.500"
          zIndex={1001}
          onClick={() => setIsOpen(false)}
        >
          <Box
            position="absolute"
            right="4"
            top="4"
            bottom="4"
            w="80"
            bg="white"
            border="3px solid"
            borderColor="brand.border"
            boxShadow="8px 8px 0px var(--chakra-colors-brand-border)"
            p="4"
            overflow="auto"
            zIndex={1002}
            onClick={(e) => e.stopPropagation()}
            transform="rotate(1deg)"
          >
            <Flex justify="space-between" align="center" mb="6">
              <Heading as="h2" size="lg" fontFamily="mono">
                FILTERS
              </Heading>
              <Button
                onClick={() => setIsOpen(false)}
                p="2"
                border="2px solid"
                borderColor="brand.border"
                _hover={{ bg: 'gray.100' }}
                variant="unstyled"
              >
                <Box
                  as="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  h="5"
                  w="5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </Box>
              </Button>
            </Flex>

            <VStack spacing="5">
              {/* Search */}
              <FormControl>
                <FormLabel
                  htmlFor="search"
                  fontSize="sm"
                  fontWeight="bold"
                  fontFamily="mono"
                  textTransform="uppercase"
                >
                  Search
                </FormLabel>
                <Input
                  id="search"
                  placeholder="Search spots..."
                  value={filters.searchTerm || ''}
                  onChange={(e) =>
                    handleFilterChange('searchTerm', e.target.value || null)
                  }
                  transform="rotate(-1deg)"
                />
              </FormControl>

              {/* Spot Type */}
              <FormControl>
                <FormLabel
                  htmlFor="spotType"
                  fontSize="sm"
                  fontWeight="bold"
                  fontFamily="mono"
                  textTransform="uppercase"
                >
                  Spot Type
                </FormLabel>
                <Select
                  id="spotType"
                  value={filters.spotTypeId || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'spotTypeId',
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  transform="rotate(0.5deg)"
                >
                  <option value="">All Types</option>
                  {spotTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Difficulty Level */}
              <FormControl>
                <FormLabel
                  htmlFor="difficulty"
                  fontSize="sm"
                  fontWeight="bold"
                  fontFamily="mono"
                  textTransform="uppercase"
                >
                  Difficulty Level
                </FormLabel>
                <Select
                  id="difficulty"
                  value={filters.difficultyId || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'difficultyId',
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  transform="rotate(-0.5deg)"
                >
                  <option value="">All Difficulties</option>
                  {difficultyLevels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Surface Type */}
              <FormControl>
                <FormLabel
                  htmlFor="surface"
                  fontSize="sm"
                  fontWeight="bold"
                  fontFamily="mono"
                  textTransform="uppercase"
                >
                  Surface Type
                </FormLabel>
                <Select
                  id="surface"
                  value={filters.surfaceTypeId || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'surfaceTypeId',
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  transform="rotate(0.75deg)"
                >
                  <option value="">All Surfaces</option>
                  {surfaceTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Checkboxes */}
              <VStack spacing="3" mt="4" align="stretch">
                <Checkbox
                  id="hasWater"
                  isChecked={filters.hasWater === true}
                  onChange={(e) =>
                    handleFilterChange(
                      'hasWater',
                      e.target.checked ? true : null,
                    )
                  }
                >
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    fontFamily="mono"
                    textTransform="uppercase"
                  >
                    Has Water
                  </Text>
                </Checkbox>

                <Checkbox
                  id="isPublic"
                  isChecked={filters.isPublic === true}
                  onChange={(e) =>
                    handleFilterChange(
                      'isPublic',
                      e.target.checked ? true : null,
                    )
                  }
                >
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    fontFamily="mono"
                    textTransform="uppercase"
                  >
                    Public Access
                  </Text>
                </Checkbox>

                <Checkbox
                  id="hasSecurity"
                  isChecked={filters.hasSecurity === true}
                  onChange={(e) =>
                    handleFilterChange(
                      'hasSecurity',
                      e.target.checked ? true : null,
                    )
                  }
                >
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    fontFamily="mono"
                    textTransform="uppercase"
                  >
                    Has Security
                  </Text>
                </Checkbox>
              </VStack>

              <Flex gap="3" pt="6">
                <Button
                  onClick={handleApplyFilters}
                  flex="1"
                  variant="primary"
                  py="3"
                  px="4"
                  transform="rotate(-1deg)"
                >
                  Apply
                </Button>
                <Button
                  onClick={handleResetFilters}
                  flex="1"
                  variant="neobrutalism"
                  py="3"
                  px="4"
                  transform="rotate(1deg)"
                >
                  Reset
                </Button>
              </Flex>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default FilterPanel
