import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store';
import { 
    fetchPokemons, 
    setPage, 
    searchPokemon, 
    clearSearch, 
    setSelectedPokemon,
    initGlobalList 
} from './store/slices/pokemonSlice';

import { PokemonCard } from './components/PokemonCard';
import { Pagination } from './components/Pagination';
import { PokemonModal } from './components/PokemonModal';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, page, selectedPokemon, isSearching } = useSelector((state: RootState) => state.pokemon);
  const [searchTerm, setSearchTerm] = useState('');

  // Carga inicial
  useEffect(() => {
    dispatch(initGlobalList());
    dispatch(fetchPokemons(1));
  }, [dispatch]);

  // Cambio de Página
  useEffect(() => {
    if (!isSearching && searchTerm === '') {
      dispatch(fetchPokemons(page));
    }
  }, [page, dispatch, isSearching, searchTerm]);

  // 3. Buscador Inteligente
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Si borras el texto, nos aseguramos de limpiar el estado de búsqueda
      // y recargar la página actual si es necesario
      if (isSearching) {
        dispatch(clearSearch());
        dispatch(fetchPokemons(page)); 
      }
      return;
    }

    const delaySearch = setTimeout(() => {
      if (searchTerm.trim()) {
        dispatch(searchPokemon(searchTerm));
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, dispatch]); 

  // Manejador del botón manual
  const handleSearchButton = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
        dispatch(searchPokemon(searchTerm));
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 py-8 px-4 flex justify-center items-center font-sans">
      <div className="bg-red-600 w-full max-w-4xl rounded-3xl p-6 shadow-2xl border-b-8 border-r-8 border-red-800 relative mt-8">
        
        {/* Nombre */}
        <div className="absolute -top-10 left-6 z-20">
            <div className="bg-gray-900 border-2 border-gray-500 rounded-lg px-3 py-1 shadow-xl transform -rotate-2">
                <span className="text-green-400 font-mono text-[10px] uppercase tracking-widest block mb-0 leading-tight">Entrenador:</span>
                <span className="text-white font-bold font-mono text-base tracking-wide">Ing. Enrique Alejandro Chuc Mezeta</span>
            </div>
        </div>

        {/* Luces decorativas */}
        <div className="flex items-start gap-4 mb-6 border-b-4 border-red-700 pb-4 pt-2">
            <div className="w-20 h-20 rounded-full bg-blue-400 border-4 border-white shadow-lg animate-pulse relative z-10">
                <div className="absolute top-2 left-3 w-6 h-4 bg-white opacity-40 rounded-full transform -rotate-45"></div>
            </div>
            <div className="flex gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-red-800 border-2 border-red-300 shadow-md"></div>
                <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-yellow-100 shadow-md"></div>
                <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-green-200 shadow-md"></div>
            </div>
        </div>

        {/* Buscador */}
        <div className="mb-6 bg-red-700 p-3 rounded-lg border-2 border-red-800 shadow-inner">
            <form onSubmit={handleSearchButton} className="flex gap-2 flex-col sm:flex-row">
                <input
                    type="text"
                    placeholder="Buscar Pokémon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 rounded-md bg-green-100 border-2 border-green-600 font-mono text-green-900 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner"
                />
                <button 
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md border-b-4 border-blue-800 hover:bg-blue-500 transition-all shadow-lg active:mt-1 active:border-b-0 uppercase tracking-wider"
                >
                    BUSCAR
                </button>
            </form>
        </div>

        {/* Pantalla Principal */}
        <div className="bg-gray-100 rounded-xl p-4 border-4 border-gray-600 shadow-inner min-h-[550px] flex flex-col relative">
            <div className="flex-1">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 animate-pulse space-y-4 pt-20">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-mono text-xl">Cargando datos...</p>
                </div>
              ) : list.length === 0 ? (
                <div className="h-full flex items-center justify-center pt-20">
                   <div className="text-center p-6 bg-gray-200 rounded-lg">
                      <p className="text-gray-500 font-mono text-lg">No se encontraron resultados.</p>
                   </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                    {list.map((poke) => (
                        <PokemonCard 
                            key={poke.id} 
                            {...poke} 
                            onClick={() => dispatch(setSelectedPokemon(poke))}
                        />
                    ))}
                </div>
              )}
            </div>
        </div>

        {/* Controles / Paginación */}
        <div className="mt-4 relative z-10">
            <Pagination 
                page={page} 
                isSearching={isSearching || searchTerm !== ''} 
                onNext={() => dispatch(setPage(page + 1))} 
                onPrev={() => dispatch(setPage(page - 1))}
            />
        </div>
      </div>

      {selectedPokemon && (
        <PokemonModal 
            pokemon={selectedPokemon} 
            onClose={() => dispatch(setSelectedPokemon(null))} 
        />
      )}
    </div>
  );
}

export default App;