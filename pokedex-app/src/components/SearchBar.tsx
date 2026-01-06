import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="w-full mb-6">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
    </div>
  );
};