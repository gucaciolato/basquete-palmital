
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import { formatDate, truncateText } from '../utils/formatUtils';
import { Search, AlertTriangle, FileText } from 'lucide-react';

interface Aviso {
  id: string;
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  destaque: boolean;
  imagem?: string;
  imagensAdicionais?: string[];
  periodoInscricao?: string;
  documentos?: string;
  arquivo?: {
    nome: string;
    tipo: string;
    url: string;
  };
}

const Avisos: React.FC = () => {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [filteredAvisos, setFilteredAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/avisos.json');
        const data = await res.json();
        const sortedAvisos = data.sort(
          (a: Aviso, b: Aviso) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime()
        );
        
        setAvisos(sortedAvisos);
        setFilteredAvisos(sortedAvisos);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar avisos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredAvisos(avisos);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = avisos.filter(
      (aviso) =>
        aviso.titulo.toLowerCase().includes(lowerSearchTerm) ||
        aviso.conteudo.toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredAvisos(filtered);
  }, [searchTerm, avisos]);

  return (
    <PublicLayout>
      <h1 className="text-3xl font-bold text-ampla-800 mb-6">Avisos</h1>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar avisos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ampla-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ampla-600"></div>
        </div>
      ) : (
        <>
          {filteredAvisos.length === 0 ? (
            <div className="text-center py-10">
              <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Nenhum aviso encontrado</h3>
              <p className="mt-2 text-gray-500">Não foram encontrados avisos correspondentes à sua pesquisa.</p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-ampla-600 hover:text-ampla-800"
                >
                  Limpar pesquisa
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAvisos.map((aviso) => (
                <Link to={`/avisos/${aviso.id}`} key={aviso.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow block">
                  {aviso.imagem && (
                    <div className="h-40 mb-3 bg-gray-100 overflow-hidden rounded-md">
                      <img
                        src={aviso.imagem}
                        alt={aviso.titulo}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center mb-2">
                    {aviso.destaque && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                        Destaque
                      </span>
                    )}
                    <span className="text-sm text-gray-500">{formatDate(aviso.dataPublicacao)}</span>
                  </div>
                  
                  <h2 className="text-lg font-semibold text-ampla-800 mb-2">{aviso.titulo}</h2>
                  <p className="text-gray-700 mb-3">{truncateText(aviso.conteudo, 150)}</p>
                  
                  {aviso.arquivo && (
                    <div className="flex items-center text-ampla-600 text-sm">
                      <FileText size={16} className="mr-1" />
                      <span>{aviso.arquivo.nome}</span>
                    </div>
                  )}
                  
                  <div className="mt-4 text-ampla-600 font-medium">
                    Leia mais →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </PublicLayout>
  );
};

export default Avisos;
