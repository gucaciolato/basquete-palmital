
import React, { useEffect, useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { FileText, Calendar, Download, Search, Filter } from 'lucide-react';

interface Documento {
  id: string;
  titulo: string;
  tipo: string;
  ano: string;
  mes?: string;
  url: string;
}

const Documentos: React.FC = () => {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredDocs, setFilteredDocs] = useState<Documento[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFilter, setTipoFilter] = useState<string>('todos');
  const [anoFilter, setAnoFilter] = useState<string>('todos');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/documentos.json');
        const data = await res.json();
        const sortedDocs = data.sort(
          (a: Documento, b: Documento) => b.ano.localeCompare(a.ano)
        );
        setDocumentos(sortedDocs);
        setFilteredDocs(sortedDocs);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar documentos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique years and types for filters
  const anos = ['todos', ...Array.from(new Set(documentos.map(doc => doc.ano)))];
  const tipos = ['todos', ...Array.from(new Set(documentos.map(doc => doc.tipo)))];

  useEffect(() => {
    let filtered = [...documentos];

    // Apply type filter
    if (tipoFilter !== 'todos') {
      filtered = filtered.filter(doc => doc.tipo === tipoFilter);
    }

    // Apply year filter
    if (anoFilter !== 'todos') {
      filtered = filtered.filter(doc => doc.ano === anoFilter);
    }

    // Apply search filter
    if (searchTerm.trim() !== '') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.titulo.toLowerCase().includes(lowerSearchTerm)
      );
    }

    setFilteredDocs(filtered);
  }, [searchTerm, tipoFilter, anoFilter, documentos]);

  // Group documents by year
  const agruparPorAno = (documentos: Documento[]) => {
    const grupos: Record<string, Documento[]> = {};
    
    documentos.forEach(doc => {
      if (!grupos[doc.ano]) {
        grupos[doc.ano] = [];
      }
      
      grupos[doc.ano].push(doc);
    });
    
    return grupos;
  };
  
  const docsAgrupados = agruparPorAno(filteredDocs);

  return (
    <PublicLayout>
      <h1 className="text-3xl font-bold text-ampla-800 mb-6">Documentos</h1>
      
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Pesquisar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ampla-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          {/* Filters */}
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-ampla-500"
              >
                {tipos.map(tipo => (
                  <option key={tipo} value={tipo}>
                    {tipo === 'todos' ? 'Todos os tipos' : tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            
            <div className="relative">
              <select
                value={anoFilter}
                onChange={(e) => setAnoFilter(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-ampla-500"
              >
                {anos.map(ano => (
                  <option key={ano} value={ano}>
                    {ano === 'todos' ? 'Todos os anos' : ano}
                  </option>
                ))}
              </select>
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ampla-600"></div>
        </div>
      ) : filteredDocs.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(docsAgrupados)
            .sort(([a], [b]) => b.localeCompare(a)) // Sort years descending
            .map(([ano, docs]) => (
              <div key={ano}>
                <h2 className="text-xl font-bold text-ampla-800 mb-4 flex items-center">
                  <Calendar className="mr-2" />
                  {ano}
                </h2>
                
                <div className="grid grid-cols-1 gap-4">
                  {docs.map((doc) => (
                    <a 
                      key={doc.id} 
                      href={doc.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex items-center p-4"
                    >
                      <div className="bg-ampla-100 p-3 rounded-full mr-4">
                        <FileText className="text-ampla-600" size={24} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-ampla-800">{doc.titulo}</h3>
                        <p className="text-sm text-gray-600 capitalize">{doc.tipo}</p>
                      </div>
                      <Download className="text-ampla-600 ml-4" size={20} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhum documento encontrado</h3>
          <p className="mt-2 text-gray-500">
            Não foram encontrados documentos correspondentes aos critérios de pesquisa.
          </p>
          {(searchTerm || tipoFilter !== 'todos' || anoFilter !== 'todos') && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setTipoFilter('todos');
                setAnoFilter('todos');
              }}
              className="mt-4 text-ampla-600 hover:text-ampla-800"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </PublicLayout>
  );
};

export default Documentos;
