
import React, { useEffect, useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { Users, UserCheck, Award, AlertTriangle } from 'lucide-react';

interface DiretoriaData {
  mandato: string;
  diretoriaExecutiva: {
    cargo: string;
    nome: string;
  }[];
  conselhoFiscal: {
    nome: string;
  }[];
  suplentesConselhoFiscal: {
    nome: string;
  }[];
}

const Diretoria: React.FC = () => {
  const [diretoria, setDiretoria] = useState<DiretoriaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/diretoria.json');
        const data = await res.json();
        setDiretoria(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados da diretoria:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PublicLayout>
      <h1 className="text-3xl font-bold text-ampla-800 mb-6">Diretoria</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ampla-600"></div>
        </div>
      ) : diretoria ? (
        <div className="space-y-8">
          <div className="bg-ampla-50 p-4 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-ampla-800">
              <Award className="inline-block mr-2 text-ampla-600" size={24} />
              Mandato: {diretoria.mandato}
            </h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-ampla-600 p-4">
              <h3 className="text-white font-semibold text-lg flex items-center">
                <Users className="mr-2" />
                Diretoria Executiva
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {diretoria.diretoriaExecutiva.map((membro, index) => (
                  <div key={index} className="flex items-start p-4 border rounded-lg">
                    <div className="bg-ampla-100 rounded-full p-3 mr-4">
                      <Users className="text-ampla-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-ampla-800">{membro.cargo}</h4>
                      <p className="text-gray-700">{membro.nome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-ampla-600 p-4">
                <h3 className="text-white font-semibold text-lg flex items-center">
                  <UserCheck className="mr-2" />
                  Conselho Fiscal
                </h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {diretoria.conselhoFiscal.map((membro, index) => (
                    <li key={index} className="flex items-center p-2 border-b last:border-0">
                      <div className="bg-ampla-50 rounded-full p-2 mr-3">
                        <UserCheck className="text-ampla-600" size={18} />
                      </div>
                      <span>{`${index + 1}° ${membro.nome}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-ampla-600 p-4">
                <h3 className="text-white font-semibold text-lg flex items-center">
                  <UserCheck className="mr-2" />
                  Suplentes do Conselho Fiscal
                </h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {diretoria.suplentesConselhoFiscal.map((membro, index) => (
                    <li key={index} className="flex items-center p-2 border-b last:border-0">
                      <div className="bg-ampla-50 rounded-full p-2 mr-3">
                        <UserCheck className="text-ampla-600" size={18} />
                      </div>
                      <span>{`${index + 1}° ${membro.nome}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Informações não encontradas</h3>
          <p className="mt-2 text-gray-500">Não foi possível carregar as informações da diretoria.</p>
        </div>
      )}
    </PublicLayout>
  );
};

export default Diretoria;
