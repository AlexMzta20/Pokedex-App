import React from 'react';

// Interfaz
interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  stats: PokemonStats;
  onClick: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, stats, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white border-4 border-gray-300 rounded-xl p-4 cursor-pointer hover:border-yellow-400 transition-colors duration-300 shadow-inner flex flex-col items-center relative"
    >
      {/* ID */}
      <span className="absolute top-2 left-3 text-gray-500 font-bold text-sm">#{id.toString().padStart(3, '0')}</span>

      <h2 className="text-xl font-extrabold capitalize text-black mb-2 mt-4">{name}</h2>

      {/* Imagen */}
      <img src={image} alt={name} className="w-32 h-32 object-contain mb-4 z-10" />

      {/* Stats */}
      <div className="w-full text-xs grid grid-cols-2 gap-x-2 gap-y-1 text-gray-700 font-mono">
        <div className="flex justify-between"><span>Hp:</span> <span className="font-bold">{stats.hp}</span></div>
        <div className="flex justify-between"><span>Speed:</span> <span className="font-bold">{stats.speed}</span></div>
        <div className="flex justify-between"><span>Atk:</span> <span className="font-bold">{stats.attack}</span></div>
        <div className="flex justify-between"><span>Def:</span> <span className="font-bold">{stats.defense}</span></div>
        <div className="flex justify-between"><span>Sp-Atk:</span> <span className="font-bold">{stats.specialAttack}</span></div>
        <div className="flex justify-between"><span>Sp-Def:</span> <span className="font-bold">{stats.specialDefense}</span></div>
      </div>
    </div>
  );
};