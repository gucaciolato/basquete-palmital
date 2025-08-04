
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';

const NotFound: React.FC = () => {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-9xl font-bold text-ampla-200">404</div>
        <h1 className="mt-4 text-3xl font-bold text-ampla-800">Página não encontrada</h1>
        <p className="mt-4 text-gray-600">A página que você está procurando não existe ou foi removida.</p>
        <Link 
          to="/"
          className="mt-8 flex items-center bg-ampla-600 hover:bg-ampla-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          <Home size={18} className="mr-2" />
          Voltar para a página inicial
        </Link>
      </div>
    </PublicLayout>
  );
};

export default NotFound;
