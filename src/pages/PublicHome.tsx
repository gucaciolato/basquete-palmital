
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate, truncateText } from '../utils/formatUtils';
import { AlertTriangle, FileText, Image, Calendar, Activity, Users, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PublicLayout from '../components/PublicLayout';

interface Aviso {
  id: string;
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  destaque: boolean;
  imagem?: string;
}

interface Documento {
  id: string;
  titulo: string;
  tipo: string;
  ano: string;
  url: string;
}

interface Foto {
  id: string;
  titulo: string;
  data: string;
  url: string;
}

interface Atividade {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  local: string;
  status: 'agendado' | 'concluido' | 'cancelado';
}

const PublicHome: React.FC = () => {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [avisosRes, docsRes, fotosRes, atividadesRes] = await Promise.all([
          fetch('/data/avisos.json'),
          fetch('/data/documentos.json'),
          fetch('/data/galeria.json'),
          fetch('/data/atividades.json')
        ]);

        const [avisosData, docsData, fotosData, atividadesData] = await Promise.all([
          avisosRes.json(),
          docsRes.json(),
          fotosRes.json(),
          atividadesRes.json()
        ]);

        // Process and sort data
        const sortedAvisos = avisosData
          .sort((a: Aviso, b: Aviso) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime())
          .slice(0, 3);
          
        const sortedDocs = docsData
          .sort((a: Documento, b: Documento) => b.ano.localeCompare(a.ano))
          .slice(0, 3);
          
        const sortedFotos = fotosData
          .sort((a: Foto, b: Foto) => new Date(b.data).getTime() - new Date(a.data).getTime())
          .slice(0, 4);

        const hoje = new Date();
        const sortedAtividades = atividadesData
          .filter((atividade: Atividade) => new Date(atividade.dataInicio) > hoje)
          .sort((a: Atividade, b: Atividade) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime())
          .slice(0, 2);
        
        setAvisos(sortedAvisos);
        setDocumentos(sortedDocs);
        setFotos(sortedFotos);
        setAtividades(sortedAtividades);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <PublicLayout>
      {/* Title section */}
      <section className="bg-gradient-to-r from-ampla-800 to-ampla-900 text-white py-10 -mt-8 mb-8">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold font-heading mb-3">PrestaConta</h1>
            <p className="text-ampla-100 mb-6">Transparência e Prestação de Contas</p>
            <h2 className="text-2xl font-bold font-heading mb-4">Transparência e gestão de informações da AMPLA</h2>
            <p className="text-lg text-ampla-100">
              Acesse avisos, documentos e informações importantes sobre a associação.
              Nossa plataforma garante transparência e facilidade na prestação de contas.
            </p>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-ampla-200 border-t-4 border-t-ampla-600"></div>
          <p className="ml-3 text-ampla-600 animate-pulse-subtle">Carregando dados...</p>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Seção de Avisos em Destaque */}
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 text-ampla-700" />
                <h2 className="text-2xl font-semibold font-heading">Últimos Avisos</h2>
              </div>
              <Link to="/avisos" className="text-ampla-600 hover:text-ampla-800 flex items-center">
                Ver todos <span className="ml-1">→</span>
              </Link>
            </div>
            {avisos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {avisos.map((aviso, index) => (
                  <Link 
                    to={`/avisos/${aviso.id}`}
                    key={aviso.id} 
                    className="glass-card overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {aviso.imagem && (
                      <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                        <img
                          src={aviso.imagem}
                          alt={aviso.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-ampla-800 text-lg">{aviso.titulo}</h3>
                    <p className="text-sm text-ampla-500 mb-3 mt-1">{formatDate(aviso.dataPublicacao)}</p>
                    <p className="text-gray-600">{truncateText(aviso.conteudo, 140)}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 glass-card">Nenhum aviso em destaque.</p>
            )}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Próximas Atividades */}
            <section className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Activity className="mr-2 text-ampla-700" />
                  <h2 className="text-2xl font-semibold font-heading">Próximas Atividades</h2>
                </div>
                <Link to="/atividades" className="text-ampla-600 hover:text-ampla-800 flex items-center">
                  Ver todas <span className="ml-1">→</span>
                </Link>
              </div>
              {atividades.length > 0 ? (
                <div className="glass-card">
                  <ul className="space-y-4">
                    {atividades.map((atividade) => (
                      <li key={atividade.id} className="border-b pb-4 last:border-0 last:pb-0 border-ampla-100/50">
                        <h3 className="font-semibold text-ampla-800">{atividade.titulo}</h3>
                        <div className="flex items-center text-sm text-ampla-600 mt-1 mb-2">
                          <Calendar size={16} className="mr-1" />
                          {formatDate(atividade.dataInicio)}
                        </div>
                        <p className="text-gray-600 text-sm">{truncateText(atividade.descricao, 80)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 glass-card">Nenhuma atividade agendada.</p>
              )}
            </section>

            {/* Empty section to balance the grid */}
            <section className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Calendar className="mr-2 text-ampla-700" />
                  <h2 className="text-2xl font-semibold font-heading">Calendário de Eventos</h2>
                </div>
                <Link to="/calendario" className="text-ampla-600 hover:text-ampla-800 flex items-center">
                  Ver tudo <span className="ml-1">→</span>
                </Link>
              </div>
              <div className="glass-card">
                <div className="text-center p-4">
                  <h3 className="font-semibold text-ampla-800">Calendário</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Confira todos os eventos e atividades agendados.
                  </p>
                  <Button asChild className="mt-4 bg-ampla-600 hover:bg-ampla-700 text-white">
                    <Link to="/calendario">Ver Calendário</Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Documentos Recentes */}
            <section className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FileText className="mr-2 text-ampla-700" />
                  <h2 className="text-2xl font-semibold font-heading">Documentos</h2>
                </div>
                <Link to="/documentos" className="text-ampla-600 hover:text-ampla-800 flex items-center">
                  Ver todos <span className="ml-1">→</span>
                </Link>
              </div>
              {documentos.length > 0 ? (
                <div className="glass-card">
                  <ul className="space-y-4">
                    {documentos.map((doc) => (
                      <li 
                        key={doc.id} 
                        className="border-b pb-4 last:border-0 last:pb-0 border-ampla-100/50 hover:bg-ampla-50/30 transition-colors p-2 -mx-2 rounded-md"
                      >
                        <div className="flex items-start">
                          <div className="mt-1 mr-3 bg-ampla-100/70 p-2 rounded-full">
                            <FileText className="text-ampla-600" size={18} />
                          </div>
                          <div>
                            <h3 className="font-medium text-ampla-800">{doc.titulo}</h3>
                            <p className="text-sm text-ampla-600">{doc.ano}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 glass-card">Nenhum documento disponível.</p>
              )}
            </section>

            {/* Diretoria */}
            <section className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Users className="mr-2 text-ampla-700" />
                  <h2 className="text-2xl font-semibold font-heading">Diretoria</h2>
                </div>
                <Link to="/diretoria" className="text-ampla-600 hover:text-ampla-800 flex items-center">
                  Ver tudo <span className="ml-1">→</span>
                </Link>
              </div>
              <div className="glass-card">
                <div className="text-center p-4">
                  <h3 className="font-semibold text-ampla-800">Conheça nossa equipe</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Veja informações sobre a diretoria executiva e conselho fiscal da AMPLA.
                  </p>
                  <Button asChild className="mt-4 bg-ampla-600 hover:bg-ampla-700 text-white">
                    <Link to="/diretoria">Ver Diretoria</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Galeria */}
            <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Image className="mr-2 text-ampla-700" />
                  <h2 className="text-2xl font-semibold font-heading">Galeria</h2>
                </div>
                <Link to="/galeria" className="text-ampla-600 hover:text-ampla-800 flex items-center">
                  Ver tudo <span className="ml-1">→</span>
                </Link>
              </div>
              {fotos.length > 0 ? (
                <div className="glass-card p-0 overflow-hidden">
                  <div className="grid grid-cols-2 gap-2 p-2">
                    {fotos.slice(0, 4).map((foto) => (
                      <div key={foto.id} className="aspect-square overflow-hidden rounded-md">
                        <img
                          src={foto.url}
                          alt={foto.titulo}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 glass-card">Nenhuma foto disponível.</p>
              )}
            </section>
          </div>
        </div>
      )}
    </PublicLayout>
  );
};

export default PublicHome;
