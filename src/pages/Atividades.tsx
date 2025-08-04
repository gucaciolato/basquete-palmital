
import React, { useEffect, useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { formatDate } from '../utils/formatUtils';
import { Activity, Calendar, Clock, MapPin, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

interface Atividade {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  local: string;
  status: 'agendado' | 'concluido' | 'cancelado';
}

const Atividades: React.FC = () => {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/atividades.json');
        const data = await res.json();
        const sortedAtividades = data.sort(
          (a: Atividade, b: Atividade) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()
        );
        setAtividades(sortedAtividades);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar atividades:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group activities by month and year
  const agruparPorMesAno = (atividades: Atividade[]) => {
    const grupos: Record<string, Atividade[]> = {};
    
    atividades.forEach(atividade => {
      const data = new Date(atividade.dataInicio);
      const chave = `${data.getFullYear()}-${data.getMonth() + 1}`;
      
      if (!grupos[chave]) {
        grupos[chave] = [];
      }
      
      grupos[chave].push(atividade);
    });
    
    return grupos;
  };

  // Get filtered activities
  const getAtividadesFiltradas = () => {
    if (filtroStatus === 'todos') {
      return atividades;
    }
    
    return atividades.filter(atividade => atividade.status === filtroStatus);
  };
  
  const atividadesFiltradas = getAtividadesFiltradas();
  const atividadesAgrupadas = agruparPorMesAno(atividadesFiltradas);

  // Function to get month name
  const getNomeMes = (mes: number) => {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes - 1];
  };

  // Status badge style and icon
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'agendado':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          label: 'Agendado',
          icon: <Clock size={14} className="mr-1" />
        };
      case 'concluido':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          label: 'Concluído',
          icon: <CheckCircle size={14} className="mr-1" />
        };
      case 'cancelado':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          label: 'Cancelado',
          icon: <AlertCircle size={14} className="mr-1" />
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          label: status,
          icon: null
        };
    }
  };

  return (
    <PublicLayout>
      <h1 className="text-3xl font-bold text-ampla-800 mb-6">Atividades</h1>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFiltroStatus('todos')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filtroStatus === 'todos'
                ? 'bg-ampla-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todas
          </button>
          <button 
            onClick={() => setFiltroStatus('agendado')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
              filtroStatus === 'agendado'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            <Clock size={14} className="mr-1" />
            Agendadas
          </button>
          <button 
            onClick={() => setFiltroStatus('concluido')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
              filtroStatus === 'concluido'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <CheckCircle size={14} className="mr-1" />
            Concluídas
          </button>
          <button 
            onClick={() => setFiltroStatus('cancelado')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
              filtroStatus === 'cancelado'
                ? 'bg-red-600 text-white'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            <AlertCircle size={14} className="mr-1" />
            Canceladas
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ampla-600"></div>
        </div>
      ) : atividadesFiltradas.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(atividadesAgrupadas)
            .sort(([a], [b]) => b.localeCompare(a)) // Sort by date (newest first)
            .map(([mesAno, atividades]) => {
              const [ano, mes] = mesAno.split('-').map(Number);
              return (
                <div key={mesAno} className="space-y-4">
                  <h2 className="text-xl font-bold text-ampla-800 flex items-center">
                    <Calendar className="mr-2" />
                    {getNomeMes(mes)} de {ano}
                  </h2>
                  
                  <div className="space-y-4">
                    {atividades.map((atividade) => {
                      const status = getStatusBadge(atividade.status);
                      return (
                        <div key={atividade.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                          <div className="p-5">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-lg font-semibold text-ampla-800">{atividade.titulo}</h3>
                              <span className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                                {status.icon}
                                {status.label}
                              </span>
                            </div>
                            
                            <p className="text-gray-700 mb-4">{atividade.descricao}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar size={16} className="mr-1 text-ampla-600" />
                                <span>
                                  <strong>Data:</strong> {formatDate(atividade.dataInicio)}
                                  {atividade.dataFim !== atividade.dataInicio && 
                                    ` a ${formatDate(atividade.dataFim)}`}
                                </span>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin size={16} className="mr-1 text-ampla-600" />
                                <span>
                                  <strong>Local:</strong> {atividade.local}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="text-center py-10">
          <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhuma atividade encontrada</h3>
          <p className="mt-2 text-gray-500">
            {filtroStatus !== 'todos' 
              ? `Não existem atividades com o status "${getStatusBadge(filtroStatus).label}".`
              : 'Não há atividades disponíveis no momento.'
            }
          </p>
          {filtroStatus !== 'todos' && (
            <button 
              onClick={() => setFiltroStatus('todos')}
              className="mt-4 text-ampla-600 hover:text-ampla-800"
            >
              Ver todas as atividades
            </button>
          )}
        </div>
      )}
    </PublicLayout>
  );
};

export default Atividades;
