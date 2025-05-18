import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type {
  Spot,
  ViewMode,
  Filters,
  SpotType,
  DifficultyLevel,
  SurfaceType,
} from "../types";

interface SpotState {
  spots: Spot[];
  filteredSpots: Spot[];
  selectedSpot: Spot | null;
  isLoading: boolean;
  error: string | null;
  viewMode: ViewMode;
  filters: Filters;
  spotTypes: SpotType[];
  difficultyLevels: DifficultyLevel[];
  surfaceTypes: SurfaceType[];
  fetchSpots: () => Promise<void>;
  fetchFilterOptions: () => Promise<void>;
  selectSpot: (spotId: string | null) => Promise<void>;
  setViewMode: (mode: ViewMode) => void;
  setFilter: (key: keyof Filters, value: any) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

const defaultFilters: Filters = {
  spotTypeId: null,
  difficultyId: null,
  surfaceTypeId: null,
  hasWater: null,
  hasSecurity: null,
  isPublic: null,
  searchTerm: null,
};

export const useSpotStore = create<SpotState>((set, get) => ({
  spots: [],
  filteredSpots: [],
  selectedSpot: null,
  isLoading: false,
  error: null,
  viewMode: "map",
  filters: { ...defaultFilters },
  spotTypes: [],
  difficultyLevels: [],
  surfaceTypes: [],

  fetchSpots: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: spots, error } = await supabase
        .from("spots")
        .select(
          `
          *,
          spot_type:spot_types(*),
          difficulty_level:difficulty_levels(*),
          surface_type:surface_types(*),
          photos(*)
        `
        )
        .order("name");

      if (error) throw error;
      set({
        spots: spots || [],
        filteredSpots: spots || [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching spots:", error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchFilterOptions: async () => {
    try {
      // Fetch spot types
      const { data: spotTypes, error: spotTypesError } = await supabase
        .from("spot_types")
        .select("*")
        .order("name");

      if (spotTypesError) throw spotTypesError;

      // Fetch difficulty levels
      const { data: difficultyLevels, error: difficultyError } = await supabase
        .from("difficulty_levels")
        .select("*")
        .order("name");

      if (difficultyError) throw difficultyError;

      // Fetch surface types
      const { data: surfaceTypes, error: surfaceError } = await supabase
        .from("surface_types")
        .select("*")
        .order("name");

      if (surfaceError) throw surfaceError;

      set({
        spotTypes: spotTypes || [],
        difficultyLevels: difficultyLevels || [],
        surfaceTypes: surfaceTypes || [],
      });
    } catch (error) {
      console.error("Error fetching filter options:", error);
      set({ error: (error as Error).message });
    }
  },

  selectSpot: async (spotId: string | null) => {
    if (!spotId) {
      set({ selectedSpot: null });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const { data: spot, error } = await supabase
        .from("spots")
        .select(
          `
          *,
          spot_type:spot_types(*),
          difficulty_level:difficulty_levels(*),
          surface_type:surface_types(*),
          photos(*),
          obstacles:spot_obstacles(
            *,
            obstacle:obstacles(*)
          )
        `
        )
        .eq("id", spotId)
        .single();

      if (error) throw error;

      // Transform the obstacles array to match our type
      const transformedSpot = {
        ...spot,
        obstacles:
          spot.obstacles?.map((so: any) => ({
            ...so.obstacle,
            notes: so.notes,
          })) || [],
      };

      set({
        selectedSpot: transformedSpot,
        isLoading: false,
        viewMode: "detail",
      });
    } catch (error) {
      console.error("Error fetching spot details:", error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setViewMode: (mode: ViewMode) => {
    set({ viewMode: mode });
    if (mode !== "detail") {
      set({ selectedSpot: null });
    }
  },

  setFilter: (key: keyof Filters, value: any) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  resetFilters: () => {
    set({ filters: { ...defaultFilters } });
    get().applyFilters();
  },

  applyFilters: () => {
    const { spots, filters } = get();

    const filtered = spots.filter((spot) => {
      // Filter by search term
      if (
        filters.searchTerm &&
        !spot.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !spot.description
          ?.toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filter by spot type
      if (
        filters.spotTypeId !== null &&
        filters.spotTypeId !== undefined &&
        spot.spot_type_id !== filters.spotTypeId
      ) {
        return false;
      }

      // Filter by difficulty
      if (
        filters.difficultyId !== null &&
        filters.difficultyId !== undefined &&
        spot.difficulty_id !== filters.difficultyId
      ) {
        return false;
      }

      // Filter by surface type
      if (
        filters.surfaceTypeId !== null &&
        filters.surfaceTypeId !== undefined &&
        spot.surface_type_id !== filters.surfaceTypeId
      ) {
        return false;
      }

      // Filter by has water
      if (
        filters.hasWater !== null &&
        filters.hasWater !== undefined &&
        spot.has_water !== filters.hasWater
      ) {
        return false;
      }

      // Filter by has security
      if (
        filters.hasSecurity !== null &&
        filters.hasSecurity !== undefined &&
        spot.has_security !== filters.hasSecurity
      ) {
        return false;
      }

      // Filter by is public
      if (
        filters.isPublic !== null &&
        filters.isPublic !== undefined &&
        spot.is_public !== filters.isPublic
      ) {
        return false;
      }

      return true;
    });

    set({ filteredSpots: filtered });
  },
}));
