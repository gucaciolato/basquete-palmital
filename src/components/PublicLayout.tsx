
import React from 'react';
import Header from './Header';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ampla-50/50 via-background to-background">
      <Header />
      
      <main className="container mx-auto px-6 pb-16">
        {children}
      </main>
      
      <footer className="bg-gradient-to-r from-ampla-800 to-ampla-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-ampla-100 text-sm gap-2">
            <div>&copy; {new Date().getFullYear()} PrestaConta</div>
            <div className="text-xs opacity-75">Desenvolvido por <a href="mailto:contato@integriguard.com.br" className="hover:text-white">contato@integriguard.com.br</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
