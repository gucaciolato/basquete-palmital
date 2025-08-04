
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle, FileText, Image, Calendar, Activity, Users, Home, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md mb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center py-4">
          <Link to="/">
            <img 
              src="/lovable-uploads/a3162c5d-78c2-4f98-8b6a-51f804c2f552.png" 
              alt="AMPLA Logo" 
              className="h-20 w-auto mb-4" 
            />
          </Link>
          <h1 className="text-2xl font-bold text-ampla-800 mb-4">PrestaConta</h1>
          
          <nav className="w-full">
            <ul className="flex flex-wrap justify-center gap-x-2 gap-y-2">
              <li>
                <Link 
                  to="/" 
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive('/') 
                      ? 'bg-ampla-600 text-white' 
                      : 'text-ampla-700 hover:bg-ampla-100'
                  }`}
                >
                  <Home size={18} className="mr-1" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/avisos" 
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive('/avisos') 
                      ? 'bg-ampla-600 text-white' 
                      : 'text-ampla-700 hover:bg-ampla-100'
                  }`}
                >
                  <AlertTriangle size={18} className="mr-1" />
                  <span>Avisos</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/documentos" 
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive('/documentos') 
                      ? 'bg-ampla-600 text-white' 
                      : 'text-ampla-700 hover:bg-ampla-100'
                  }`}
                >
                  <FileText size={18} className="mr-1" />
                  <span>Documentos</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/galeria" 
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive('/galeria') 
                      ? 'bg-ampla-600 text-white' 
                      : 'text-ampla-700 hover:bg-ampla-100'
                  }`}
                >
                  <Image size={18} className="mr-1" />
                  <span>Galeria</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/atividades" 
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive('/atividades') 
                      ? 'bg-ampla-600 text-white' 
                      : 'text-ampla-700 hover:bg-ampla-100'
                  }`}
                >
                  <Activity size={18} className="mr-1" />
                  <span>Atividades</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/calendario" 
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive('/calendario') 
                      ? 'bg-ampla-600 text-white' 
                      : 'text-ampla-700 hover:bg-ampla-100'
                  }`}
                >
                  <Calendar size={18} className="mr-1" />
                  <span>Calendário</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/diretoria" 
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive('/diretoria') 
                      ? 'bg-ampla-600 text-white' 
                      : 'text-ampla-700 hover:bg-ampla-100'
                  }`}
                >
                  <Users size={18} className="mr-1" />
                  <span>Diretoria</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contato" 
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive('/contato') 
                      ? 'bg-ampla-600 text-white' 
                      : 'text-ampla-700 hover:bg-ampla-100'
                  }`}
                >
                  <Mail size={18} className="mr-1" />
                  <span>Contato</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
