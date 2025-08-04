
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, Users, Calendar } from 'lucide-react';

const AccessLinks: React.FC = () => {
  return (
    <div className="col-span-full">
      <div className="flex items-center mb-5">
        <FileText className="mr-2 text-ampla-700" />
        <h2 className="text-xl font-semibold font-heading">Acesso Rápido</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <Link to="/documentos" className="glass-card flex flex-col items-center py-8 text-center group animate-fade-in">
          <div className="bg-ampla-100/50 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
            <FileText size={30} className="text-ampla-700" />
          </div>
          <span className="font-medium text-lg">Documentos</span>
          <span className="text-sm text-gray-600 mt-1">Relatórios e livros contábeis</span>
        </Link>
        <Link to="/galeria" className="glass-card flex flex-col items-center py-8 text-center group animate-fade-in animate-delay-100">
          <div className="bg-ampla-100/50 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
            <Image size={30} className="text-ampla-700" />
          </div>
          <span className="font-medium text-lg">Galeria de Fotos</span>
          <span className="text-sm text-gray-600 mt-1">Eventos e atividades</span>
        </Link>
        <Link to="/diretoria" className="glass-card flex flex-col items-center py-8 text-center group animate-fade-in animate-delay-200">
          <div className="bg-ampla-100/50 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
            <Users size={30} className="text-ampla-700" />
          </div>
          <span className="font-medium text-lg">Diretoria</span>
          <span className="text-sm text-gray-600 mt-1">Conselho e administração</span>
        </Link>
        <Link to="/calendario" className="glass-card flex flex-col items-center py-8 text-center group animate-fade-in animate-delay-300">
          <div className="bg-ampla-100/50 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
            <Calendar size={30} className="text-ampla-700" />
          </div>
          <span className="font-medium text-lg">Calendário</span>
          <span className="text-sm text-gray-600 mt-1">Atividades e eventos</span>
        </Link>
      </div>
    </div>
  );
};

export default AccessLinks;
