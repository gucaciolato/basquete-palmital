
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import DashboardLoader from '../components/dashboard/DashboardLoader';
import AccessLinks from '../components/dashboard/AccessLinks';
import FeaturedNotices from '../components/dashboard/FeaturedNotices';
import UpcomingActivities from '../components/dashboard/UpcomingActivities';
import { Aviso, Atividade } from '../components/dashboard/types';

const Index: React.FC = () => {
  const { isLoading: authLoading, isAuthenticated } = useAuth();
  const [destaques, setDestaques] = useState<Aviso[]>([]);
  const [proximasAtividades, setProximasAtividades] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    // Only fetch data if authentication is complete AND user is authenticated
    if (!authLoading && isAuthenticated && !dataFetched) {
      fetchDashboardData();
    }
  }, [authLoading, isAuthenticated, dataFetched]);

  const fetchDashboardData = async () => {
    if (loading && !authLoading && isAuthenticated) {
      try {
        // Fetch avisos em destaque
        const avisosRes = await fetch('/data/avisos.json');
        const avisosData = await avisosRes.json();
        const avisosDestaque = avisosData
          .filter((aviso: Aviso) => aviso.destaque)
          .sort((a: Aviso, b: Aviso) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime())
          .slice(0, 3);
          
        // Fetch próximas atividades
        const atividadesRes = await fetch('/data/atividades.json');
        const atividadesData = await atividadesRes.json();
        const hoje = new Date();
        const proximasAtividades = atividadesData
          .filter((atividade: Atividade) => new Date(atividade.dataInicio) > hoje && atividade.status === 'agendado')
          .sort((a: Atividade, b: Atividade) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime())
          .slice(0, 3);
          
        setDestaques(avisosDestaque);
        setProximasAtividades(proximasAtividades);
        setError(null);
        setDataFetched(true);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Não foi possível carregar os dados do dashboard. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }
  };

  // If authentication is loading, show a loading indicator
  if (authLoading) {
    return (
      <Layout>
        <h1 className="prestaconta-page-title">Painel Principal</h1>
        <DashboardLoader message="Verificando autenticação..." />
      </Layout>
    );
  }

  // If user is not authenticated, the ProtectedRoute in App.tsx will handle the redirect to login

  if (error) {
    return (
      <Layout>
        <h1 className="prestaconta-page-title">Painel Principal</h1>
        <div className="glass-card p-6 text-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => {setLoading(true); setDataFetched(false); fetchDashboardData();}}
            className="mt-4 px-4 py-2 bg-ampla-600 text-white rounded hover:bg-ampla-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="prestaconta-page-title">Painel Principal</h1>
      
      {loading ? (
        <DashboardLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AccessLinks />
          <FeaturedNotices destaques={destaques} />
          <UpcomingActivities atividades={proximasAtividades} />
        </div>
      )}
    </Layout>
  );
};

export default Index;
