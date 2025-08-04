
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { formatDate, truncateText } from '../../utils/formatUtils';
import { Aviso } from './types';

interface FeaturedNoticesProps {
  destaques: Aviso[];
}

const FeaturedNotices: React.FC<FeaturedNoticesProps> = ({ destaques }) => {
  return (
    <div className="col-span-full">
      <div className="flex items-center mb-5">
        <AlertTriangle className="mr-2 text-ampla-700" />
        <h2 className="text-xl font-semibold font-heading">Avisos em Destaque</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {destaques.length > 0 ? (
          destaques.map((aviso, index) => (
            <Link 
              to={`/avisos/${aviso.id}`} 
              key={aviso.id} 
              className={`glass-card block hover:-translate-y-1 transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {aviso.imagem && (
                <div className="h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={aviso.imagem}
                    alt={aviso.titulo}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
                  />
                </div>
              )}
              <h3 className="font-semibold text-ampla-800 text-lg">{aviso.titulo}</h3>
              <p className="text-sm text-gray-500 mb-3 mt-1">{formatDate(aviso.dataPublicacao)}</p>
              <p className="text-gray-700">{truncateText(aviso.conteudo, 120)}</p>
              <div className="mt-3 text-ampla-600 text-sm font-medium hover:text-ampla-800 transition-colors">
                Leia mais →
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full glass-card animate-fade-in">Nenhum aviso em destaque.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedNotices;
