import React from 'react';

interface PokemonModalProps {
  pokemon: any;
  onClose: () => void;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border-4 border-red-500 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl">X</button>
        
        <div className="text-center">
            <h2 className="text-3xl font-extrabold capitalize text-gray-800 mb-2">{pokemon.name}</h2>
            <div className="flex justify-center gap-2 mb-4">
                {pokemon.types.map((t: string) => (
                    <span key={t} className="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize font-semibold text-gray-700">{t}</span>
                ))}
            </div>
            <img src={pokemon.image} alt={pokemon.name} className="w-48 h-48 mx-auto mb-6 drop-shadow-lg" />
            
            <div className="bg-gray-100 rounded-lg p-4 text-left space-y-2">
                <h3 className="font-bold text-lg border-b border-gray-300 pb-1 mb-2">Estadísticas Base</h3>
                {Object.entries(pokemon.stats).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                        <span className="capitalize text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <div className="flex items-center w-1/2 gap-2">
                            <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-blue-500" 
                                    style={{ width: `${Math.min(Number(value), 100)}%` }}
                                ></div>
                            </div>
                            <span className="font-bold w-8 text-right">{value as number}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Peso</p>
                    <p className="font-bold">{pokemon.weight / 10} kg</p>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Altura</p>
                    <p className="font-bold">{pokemon.height / 10} m</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};