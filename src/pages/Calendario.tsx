
import React, { useEffect, useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, parseISO, isSameDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Atividade {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  local: string;
  status: 'agendado' | 'concluido' | 'cancelado';
}

const Calendario: React.FC = () => {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/atividades.json');
        const data = await res.json();
        setAtividades(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar atividades:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setSelectedDay(null);
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setSelectedDay(null);
  };

  // Get days of current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get activities for a specific day
  const getAtividadesDoDia = (dia: Date) => {
    return atividades.filter(atividade => {
      const dataInicio = parseISO(atividade.dataInicio);
      const dataFim = parseISO(atividade.dataFim);
      
      // Check if the day is between start and end dates (inclusive)
      return (dataInicio <= dia && dia <= dataFim);
    });
  };

  // Get all days that have activities
  const diasComAtividades = atividades.reduce((dias, atividade) => {
    const dataInicio = parseISO(atividade.dataInicio);
    const dataFim = parseISO(atividade.dataFim);
    const intervalo = eachDayOfInterval({ start: dataInicio, end: dataFim });
    
    intervalo.forEach(dia => {
      if (!dias.some(d => isSameDay(d, dia))) {
        dias.push(dia);
      }
    });
    
    return dias;
  }, [] as Date[]);

  // Check if a day has activities
  const temAtividade = (dia: Date) => {
    return diasComAtividades.some(data => isSameDay(data, dia));
  };

  // Status badge style
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
          icon: <AlertTriangle size={14} className="mr-1" />
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
      <h1 className="text-3xl font-bold text-ampla-800 mb-6">Calendário de Atividades</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ampla-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Calendar header */}
              <div className="flex items-center justify-between bg-ampla-600 text-white p-4">
                <button 
                  onClick={prevMonth}
                  className="p-1 rounded-full hover:bg-ampla-500 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold flex items-center">
                  <CalendarIcon className="mr-2" />
                  {format(currentMonth, 'MMMM yyyy', { locale: ptBR }).charAt(0).toUpperCase() + format(currentMonth, 'MMMM yyyy', { locale: ptBR }).slice(1)}
                </h2>
                <button 
                  onClick={nextMonth}
                  className="p-1 rounded-full hover:bg-ampla-500 transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
              
              {/* Calendar grid */}
              <div className="p-4">
                {/* Days of week header */}
                <div className="grid grid-cols-7 mb-2">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-500 text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before the start of month */}
                  {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                    <div key={`empty-start-${index}`} className="h-16 p-1" />
                  ))}
                  
                  {/* Days of the month */}
                  {monthDays.map((day) => {
                    const isSelected = selectedDay && isSameDay(day, selectedDay);
                    const todayClass = isToday(day) ? 'bg-ampla-50 font-bold text-ampla-700' : '';
                    const hasActivity = temAtividade(day);
                    
                    return (
                      <div
                        key={day.toString()}
                        className={`h-16 p-1 border rounded-md transition-colors relative ${
                          isSelected 
                            ? 'border-ampla-600 ring-2 ring-ampla-200'
                            : 'hover:bg-gray-50 border-gray-200'
                        } ${todayClass}`}
                        onClick={() => setSelectedDay(day)}
                      >
                        <div className="text-right mb-1">{format(day, 'd')}</div>
                        
                        {hasActivity && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="h-1.5 w-1.5 bg-ampla-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Empty cells for days after the end of month */}
                  {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
                    <div key={`empty-end-${index}`} className="h-16 p-1" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Selected day activities */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
              <div className="bg-ampla-600 text-white p-4">
                <h3 className="text-lg font-semibold">
                  {selectedDay 
                    ? format(selectedDay, "d 'de' MMMM", { locale: ptBR }).charAt(0).toUpperCase() + format(selectedDay, "d 'de' MMMM", { locale: ptBR }).slice(1)
                    : 'Atividades'}
                </h3>
              </div>
              
              <div className="p-4 h-[calc(100%-56px)] overflow-auto">
                {selectedDay ? (
                  <>
                    {isToday(selectedDay) && (
                      <div className="bg-ampla-50 text-ampla-700 px-3 py-1.5 rounded-md mb-4 flex items-center">
                        <CalendarIcon size={16} className="mr-2" />
                        <span className="font-medium">Hoje</span>
                      </div>
                    )}
                    
                    {(() => {
                      const atividadesDoDia = getAtividadesDoDia(selectedDay);
                      
                      if (atividadesDoDia.length > 0) {
                        return (
                          <div className="space-y-4">
                            {atividadesDoDia.map((atividade) => {
                              const status = getStatusBadge(atividade.status);
                              return (
                                <div key={atividade.id} className="border rounded-lg p-3 hover:bg-gray-50">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">{atividade.titulo}</h4>
                                    <span className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                                      {status.icon}
                                      {status.label}
                                    </span>
                                  </div>
                                  
                                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{atividade.descricao}</p>
                                  
                                  <div className="flex items-center text-xs text-gray-500">
                                    <MapPin size={14} className="mr-1" />
                                    {atividade.local}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      } else {
                        return (
                          <div className="text-center py-8 text-gray-500">
                            <CalendarIcon className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                            <p>Nenhuma atividade agendada para este dia.</p>
                          </div>
                        );
                      }
                    })()}
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <p>Selecione uma data para ver as atividades.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
};

export default Calendario;
