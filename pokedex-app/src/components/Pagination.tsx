import React from 'react';

interface PaginationProps {
  page: number;
  onNext: () => void;
  onPrev: () => void;
  isSearching: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({ page, onNext, onPrev, isSearching }) => {
  // Si estamos buscando, no mostramos paginación
  if (isSearching) return null;

  return (
    <div className="flex justify-end items-center space-x-6 mt-8">
      {/* Botón Anterior */}
      <button
        onClick={onPrev}
        disabled={page === 1}
        className={`w-14 h-14 rounded-full border-4 border-red-800 shadow-lg flex items-center justify-center transition-transform active:scale-95 ${
          page === 1 ? 'bg-red-900 opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400'
        }`}
        title="Anterior"
      >
        <div className="w-0 h-0 border-t-8 border-t-transparent border-r-[12px] border-r-white border-b-8 border-b-transparent mr-1"></div>
      </button>

      {/* Indicador de Página */}
      <div className="w-24 h-10 bg-lime-300 border-4 border-lime-600 rounded-lg flex items-center justify-center shadow-inner">
        <span className="font-mono font-bold text-lime-900 text-lg">Pág. {page}</span>
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={onNext}
        className="w-14 h-14 rounded-full bg-red-600 border-4 border-red-800 shadow-lg flex items-center justify-center transition-transform active:scale-95 hover:bg-red-500"
        title="Siguiente"
      >
        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
      </button>
    </div>
  );
};