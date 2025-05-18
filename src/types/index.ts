export interface Spot {
  id: string
  name: string
  description: string | null
  latitude: number
  longitude: number
  address: string | null
  city: string | null
  province: string | null
  country: string | null
  spot_type_id: number | null
  difficulty_id: number | null
  surface_type_id: number | null
  is_public: boolean | null
  has_security: boolean | null
  has_water: boolean | null
  tranquility_level: number | null
  best_time: string | null
  created_at: string
  updated_at: string | null
  spot_type?: SpotType
  difficulty_level?: DifficultyLevel
  surface_type?: SurfaceType
  photos?: Photo[]
  obstacles?: Obstacle[]
}

export interface SpotType {
  id: number
  name: string
  description: string | null
}

export interface DifficultyLevel {
  id: number
  name: string
  description: string | null
}

export interface SurfaceType {
  id: number
  name: string
  description: string | null
}

export interface Obstacle {
  id: number
  name: string
  description: string | null
  notes?: string | null
}

export interface Photo {
  id: string
  spot_id: string
  storage_path: string
  description: string | null
  is_primary: boolean
  created_at: string
}

export type ViewMode = 'map' | 'list' | 'detail'

export interface Filters {
  spotTypeId?: number | null
  difficultyId?: number | null
  surfaceTypeId?: number | null
  hasWater?: boolean | null
  hasSecurity?: boolean | null
  isPublic?: boolean | null
  searchTerm?: string | null
}
