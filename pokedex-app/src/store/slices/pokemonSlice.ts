import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

interface Stat {
  base_stat: number;
  stat: { name: string };
}

interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

interface PokemonState {
  list: PokemonDetails[];
  globalNameList: { name: string; url: string }[]; // La "Guía telefónica" completa
  selectedPokemon: PokemonDetails | null;
  loading: boolean;
  error: string | null;
  page: number;
  isSearching: boolean;
}

const initialState: PokemonState = {
  list: [],
  globalNameList: [], // Aquí guardaremos los pokemones ordenados A-Z
  selectedPokemon: null,
  loading: false, // La UI manejará la carga inicial
  error: null,
  page: 1,
  isSearching: false,
};

// Helper para formatear
const formatPokemonData = (data: any): PokemonDetails => {
  const statsArray = data.stats;
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
    height: data.height,
    weight: data.weight,
    types: data.types.map((t: any) => t.type.name),
    stats: {
      hp: statsArray.find((s: Stat) => s.stat.name === 'hp')?.base_stat || 0,
      attack: statsArray.find((s: Stat) => s.stat.name === 'attack')?.base_stat || 0,
      defense: statsArray.find((s: Stat) => s.stat.name === 'defense')?.base_stat || 0,
      specialAttack: statsArray.find((s: Stat) => s.stat.name === 'special-attack')?.base_stat || 0,
      specialDefense: statsArray.find((s: Stat) => s.stat.name === 'special-defense')?.base_stat || 0,
      speed: statsArray.find((s: Stat) => s.stat.name === 'speed')?.base_stat || 0,
    },
  };
};

// Cargar la lista de los nombres
export const initGlobalList = createAsyncThunk(
  'pokemon/initGlobalList',
  async () => {
    // Pedimos 10000 para traer todos los nombres existentes de una sola vez
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0');
    const allResults = response.data.results;
    // Ordenamos alfabéticamente (A-Z)
    allResults.sort((a: any, b: any) => a.name.localeCompare(b.name)); // Aplico el método nativo .sort() de JavaScript sobre este array con
    return allResults;                                                 // localeCompare para asegurar un ordenamiento alfabético correcto.
  }
);

// Traer página normal
export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (page: number, { getState }) => {
    const state = getState() as RootState;
    const allNames = state.pokemon.globalNameList;

    // Si la lista global aún no carga, no hacemos nada
    if (allNames.length === 0) return [];

    const limit = 6;
    const offset = (page - 1) * limit;

    // Tomamos los 6 pokemones que tocan en esta página
    const targets = allNames.slice(offset, offset + limit);
    
    // Mostramos los detalles de esos 6
    const detailedData = await Promise.all(
      targets.map(async (pokemon: any) => {
        const details = await axios.get(pokemon.url);
        return formatPokemonData(details.data);
      })
    );
    return detailedData;
  }
);

// Buscar por coincidencia
export const searchPokemon = createAsyncThunk(
  'pokemon/searchPokemon',
  async (searchTerm: string, { getState }) => {
    const state = getState() as RootState;
    const allNames = state.pokemon.globalNameList;

    // Filtramos buscando coincidencias
    const matches = allNames
        .filter(p => p.name.includes(searchTerm.toLowerCase()))
        .slice(0, 6); // Tomamos solo los primeros 6 resultados para no saturar

    if (matches.length === 0) throw new Error('No se encontraron coincidencias');

    // Ahora traemos los detalles de esos 6 encontrados
    const detailedData = await Promise.all(
      matches.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return formatPokemonData(details.data);
      })
    );
    return detailedData;
  }
);

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      state.isSearching = false;
    },
    setSelectedPokemon: (state, action: PayloadAction<PokemonDetails | null>) => {
      state.selectedPokemon = action.payload;
    },
    clearSearch: (state) => {
        state.isSearching = false;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Carga de lista global
      .addCase(initGlobalList.fulfilled, (state, action) => {
        state.globalNameList = action.payload;
      })
      // Fetch Normal
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.isSearching = false;
      })
      // Búsqueda
      .addCase(searchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSearching = true;
      })
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(searchPokemon.rejected, (state) => {
        state.loading = false;
        state.list = []; // Lista vacía si no hay coincidencias
      });
  },
});

export const { setPage, setSelectedPokemon, clearSearch } = pokemonSlice.actions;
export default pokemonSlice.reducer;