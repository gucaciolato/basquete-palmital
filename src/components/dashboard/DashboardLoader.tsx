
import React from 'react';

interface DashboardLoaderProps {
  message?: string;
}

const DashboardLoader: React.FC<DashboardLoaderProps> = ({ 
  message = "Carregando dados..." 
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-64 gap-4">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-ampla-200 border-t-4 border-t-ampla-600"></div>
      <p className="text-ampla-600 animate-pulse-subtle font-medium">{message}</p>
    </div>
  );
};

export default DashboardLoader;
