
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import { formatDateTime } from '../utils/formatUtils';
import { ArrowLeft, FileText, Calendar, FileCheck } from 'lucide-react';

interface Aviso {
  id: string;
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  destaque: boolean;
  imagem?: string;
  periodoInscricao?: string;
  documentos?: string;
  imagensAdicionais?: string[];
  arquivo?: {
    nome: string;
    tipo: string;
    url: string;
  };
}

const AvisoDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/avisos.json');
        const data = await res.json();
        const found = data.find((a: Aviso) => a.id === id);
        
        if (found) {
          setAviso(found);
        } else {
          setNotFound(true);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar aviso:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ampla-600"></div>
        </div>
      </PublicLayout>
    );
  }

  if (notFound) {
    return (
      <PublicLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Aviso não encontrado</h2>
          <p className="text-gray-600 mb-6">O aviso que você está procurando não existe ou foi removido.</p>
          <Link to="/avisos" className="bg-ampla-600 text-white px-4 py-2 rounded hover:bg-ampla-700 inline-flex items-center">
            <ArrowLeft size={18} className="mr-2" /> Voltar para avisos
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="mb-6">
        <Link to="/avisos" className="text-ampla-600 hover:text-ampla-800 inline-flex items-center">
          <ArrowLeft size={18} className="mr-1" /> Voltar para avisos
        </Link>
      </div>
      
      {aviso && (
        <article className="bg-white shadow-md rounded-lg overflow-hidden">
          {aviso.imagem && (
            <div className="bg-gray-100 overflow-hidden">
              <img
                src={aviso.imagem}
                alt={aviso.titulo}
                className="w-full object-contain mx-auto"
                style={{ maxHeight: "500px" }}
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
              />
            </div>
          )}

          {aviso.imagensAdicionais && aviso.imagensAdicionais.length > 0 && (
            <div className="bg-gray-100 overflow-hidden">
              {aviso.imagensAdicionais.map((imagemUrl, index) => (
                <img
                  key={index}
                  src={imagemUrl}
                  alt={`${aviso.titulo} - Imagem ${index + 2}`}
                  className="w-full object-contain mx-auto"
                  style={{ maxHeight: "500px" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
                />
              ))}
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar size={16} className="mr-1" />
              <span>Publicado em {formatDateTime(aviso.dataPublicacao)}</span>
              
              {aviso.destaque && (
                <span className="ml-4 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Destaque
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{aviso.titulo}</h1>
            
            <div className="prose max-w-none">
              {aviso.conteudo.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            {(aviso.periodoInscricao || aviso.documentos) && (
              <div className="mt-8 bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-3">Informações Adicionais</h3>
                
                {aviso.periodoInscricao && (
                  <div className="flex items-start mb-3">
                    <Calendar size={18} className="mr-2 text-ampla-600 mt-0.5" />
                    <div>
                      <span className="font-medium">Período:</span>
                      <p className="text-gray-700">{aviso.periodoInscricao}</p>
                    </div>
                  </div>
                )}
                
                {aviso.documentos && (
                  <div className="flex items-start">
                    <FileCheck size={18} className="mr-2 text-ampla-600 mt-0.5" />
                    <div>
                      <span className="font-medium">Documentos Necessários:</span>
                      <p className="text-gray-700">{aviso.documentos}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {aviso.arquivo && (
              <div className="mt-8">
                <a 
                  href={aviso.arquivo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-ampla-600 text-white rounded-md hover:bg-ampla-700 transition"
                >
                  <FileText size={18} className="mr-2" />
                  {aviso.arquivo.nome}
                </a>
              </div>
            )}
          </div>
        </article>
      )}
    </PublicLayout>
  );
};

export default AvisoDetalhe;
