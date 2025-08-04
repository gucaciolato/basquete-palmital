
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, AlarmClock } from 'lucide-react';
import { formatDate, truncateText } from '../../utils/formatUtils';
import { Atividade } from './types';

interface UpcomingActivitiesProps {
  atividades: Atividade[];
}

const UpcomingActivities: React.FC<UpcomingActivitiesProps> = ({ atividades }) => {
  return (
    <div className="col-span-1">
      <div className="flex items-center mb-5">
        <Calendar className="mr-2 text-ampla-700" />
        <h2 className="text-xl font-semibold font-heading">Próximas Atividades</h2>
      </div>
      <div className="glass-card h-full animate-slide-in" style={{ animationDelay: '100ms' }}>
        {atividades.length > 0 ? (
          <div className="space-y-5">
            {atividades.map((atividade, index) => (
              <div 
                key={atividade.id} 
                className={`border-b pb-5 last:border-0 last:pb-0 ${
                  index > 0 ? 'border-ampla-100/50' : 'border-ampla-100'
                }`}
              >
                <div className="flex items-start">
                  <div className="mt-1 mr-3 bg-ampla-100/70 p-2 rounded-full">
                    <AlarmClock className="text-ampla-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-ampla-800">{atividade.titulo}</h3>
                    <p className="text-sm text-ampla-600 mt-1">{formatDate(atividade.dataInicio)}</p>
                    <p className="text-sm mt-2 text-gray-600">{truncateText(atividade.descricao, 100)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma atividade agendada.</p>
        )}
        <div className="mt-5 border-t border-ampla-100/50 pt-4">
          <Link to="/atividades" className="text-ampla-600 hover:text-ampla-800 font-medium text-sm transition-colors">
            Ver todas as atividades →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpcomingActivities;
