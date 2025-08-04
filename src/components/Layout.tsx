
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, Home, Image, Menu, DollarSign, Users, Activity, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`bg-gradient-to-b from-ampla-600 to-ampla-800 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col shadow-xl`}>
        {/* Logo Container */}
        <div className="p-4 flex items-center justify-between">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-full hover:bg-ampla-500/50 transition-colors ml-auto"
            aria-label={sidebarOpen ? "Recolher menu" : "Expandir menu"}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Centered Logo */}
        <div className="flex flex-col items-center justify-center mb-6">
          <img 
            src="/lovable-uploads/a3162c5d-78c2-4f98-8b6a-51f804c2f552.png" 
            alt="AMPLA Logo" 
            className={`${sidebarOpen ? 'h-20' : 'h-12'} w-auto transition-all duration-300`}
          />
          {sidebarOpen && <h1 className="text-xl font-bold font-heading mt-3">PrestaConta</h1>}
        </div>

        {/* Nav Links */}
        <nav className="flex-grow mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-ampla-400">
          <ul className="space-y-1">
            <NavLink
              to="/"
              icon={<Home size={20} />}
              label="Início"
              expanded={sidebarOpen}
            />
            <NavLink
              to="/avisos"
              icon={<FileText size={20} />}
              label="Avisos"
              expanded={sidebarOpen}
            />
            <NavLink
              to="/financeiro"
              icon={<DollarSign size={20} />}
              label="Financeiro"
              expanded={sidebarOpen}
            />
            <NavLink
              to="/galeria"
              icon={<Image size={20} />}
              label="Galeria"
              expanded={sidebarOpen}
            />
            <NavLink
              to="/documentos"
              icon={<FileText size={20} />}
              label="Documentos"
              expanded={sidebarOpen}
            />
            <NavLink
              to="/atividades"
              icon={<Activity size={20} />}
              label="Atividades"
              expanded={sidebarOpen}
            />
            <NavLink
              to="/diretoria"
              icon={<Users size={20} />}
              label="Diretoria"
              expanded={sidebarOpen}
            />
            <NavLink
              to="/calendario"
              icon={<Calendar size={20} />}
              label="Calendário"
              expanded={sidebarOpen}
            />
          </ul>
        </nav>

        {/* User Section */}
        {isAuthenticated && (
          <div className="p-4 border-t border-ampla-500/50">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <div>
                  <p className="font-medium">{user?.nome}</p>
                  <p className="text-xs text-ampla-100/80">{user?.role === 'admin' ? 'Administrador' : 'Editor'}</p>
                </div>
              )}
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-ampla-500/50 transition-colors flex items-center"
                title="Sair"
              >
                <LogOut size={20} />
                {sidebarOpen && <span className="ml-2">Sair</span>}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gradient-to-br from-ampla-50/50 via-background to-background overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, expanded }) => {
  const navigate = useNavigate();
  
  return (
    <li>
      <button
        onClick={() => navigate(to)}
        className="flex items-center w-full p-4 hover:bg-ampla-500/50 transition-colors text-left"
      >
        <span className="mr-4">{icon}</span>
        {expanded && <span>{label}</span>}
      </button>
    </li>
  );
};

export default Layout;
