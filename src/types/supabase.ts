export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      spots: {
        Row: {
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
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          latitude: number
          longitude: number
          address?: string | null
          city?: string | null
          province?: string | null
          country?: string | null
          spot_type_id?: number | null
          difficulty_id?: number | null
          surface_type_id?: number | null
          is_public?: boolean | null
          has_security?: boolean | null
          has_water?: boolean | null
          tranquility_level?: number | null
          best_time?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          latitude?: number
          longitude?: number
          address?: string | null
          city?: string | null
          province?: string | null
          country?: string | null
          spot_type_id?: number | null
          difficulty_id?: number | null
          surface_type_id?: number | null
          is_public?: boolean | null
          has_security?: boolean | null
          has_water?: boolean | null
          tranquility_level?: number | null
          best_time?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      obstacles: {
        Row: {
          id: number
          name: string
          description: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
        }
      }
      spot_obstacles: {
        Row: {
          id: string
          spot_id: string
          obstacle_id: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          spot_id: string
          obstacle_id: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          spot_id?: string
          obstacle_id?: number
          notes?: string | null
          created_at?: string
        }
      }
      photos: {
        Row: {
          id: string
          spot_id: string
          storage_path: string
          description: string | null
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          spot_id: string
          storage_path: string
          description?: string | null
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          spot_id?: string
          storage_path?: string
          description?: string | null
          is_primary?: boolean
          created_at?: string
        }
      }
      difficulty_levels: {
        Row: {
          id: number
          name: string
          description: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
        }
      }
      spot_types: {
        Row: {
          id: number
          name: string
          description: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
        }
      }
      surface_types: {
        Row: {
          id: number
          name: string
          description: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
        }
      }
    }
  }
}
