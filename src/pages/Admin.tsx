
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FileJson, Download, FileCheck, AlertTriangle, FileText, Image, Users, Activity } from 'lucide-react';

interface JsonGeneratorProps {
  title: string;
  description: string;
  jsonType: 'avisos' | 'galeria' | 'documentos' | 'atividades' | 'diretoria';
  icon: React.ReactNode;
}

const JsonGenerator: React.FC<JsonGeneratorProps> = ({ title, description, jsonType, icon }) => {
  const [jsonData, setJsonData] = useState('');
  const [formInput, setFormInput] = useState('');
  const [generationComplete, setGenerationComplete] = useState(false);
  
  const handleGenerateJson = () => {
    try {
      // Parse the input as JSON
      const parsedData = JSON.parse(formInput);
      const formattedJson = JSON.stringify(parsedData, null, 2);
      setJsonData(formattedJson);
      setGenerationComplete(true);
    } catch (error) {
      alert('Erro ao analisar JSON: ' + (error as Error).message);
    }
  };
  
  const handleDownload = () => {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${jsonType}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleLoadCurrentData = async () => {
    try {
      const response = await fetch(`/data/${jsonType}.json`);
      const data = await response.json();
      setFormInput(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Erro ao carregar dados atuais:', error);
      alert('Erro ao carregar dados atuais. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="mb-4">
        <button 
          onClick={handleLoadCurrentData}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center"
        >
          <FileCheck size={18} className="mr-2" />
          Carregar Dados Atuais
        </button>
      </div>
      
      <div className="mb-4">
        <label htmlFor={`${jsonType}-input`} className="block text-sm font-medium text-gray-700 mb-2">
          Edite o JSON:
        </label>
        <textarea
          id={`${jsonType}-input`}
          value={formInput}
          onChange={(e) => setFormInput(e.target.value)}
          className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm"
          placeholder={`Cole ou edite o JSON para ${jsonType} aqui...`}
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={handleGenerateJson}
          className="bg-prestaconta-600 hover:bg-prestaconta-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FileJson size={18} className="mr-2" />
          Gerar JSON
        </button>
        
        {generationComplete && (
          <button 
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Download size={18} className="mr-2" />
            Baixar {jsonType}.json
          </button>
        )}
      </div>
      
      {generationComplete && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Instruções:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Baixe o arquivo JSON gerado.</li>
            <li>Coloque o arquivo em <code className="bg-gray-100 px-1 rounded">/public/data/{jsonType}.json</code> no repositório do projeto.</li>
            <li>Se você adicionou referências a novos arquivos (imagens/PDFs), certifique-se de incluí-los nas pastas correspondentes.</li>
            <li>Faça commit e push das alterações para o GitHub.</li>
            <li>O deploy automático no Vercel irá atualizar o site com seus novos dados.</li>
          </ol>
        </div>
      )}
    </div>
  );
};

const Admin: React.FC = () => {
  return (
    <Layout>
      <h1 className="prestaconta-page-title">Ferramenta Administrativa</h1>
      <p className="text-gray-600 mb-8">
        Use esta ferramenta para gerar arquivos JSON atualizados para o site. Os arquivos gerados devem ser baixados 
        e colocados manualmente no repositório do projeto.
      </p>
      
      <JsonGenerator 
        title="Avisos" 
        description="Gere o arquivo JSON para avisos, editais e comunicados." 
        jsonType="avisos" 
        icon={<AlertTriangle className="text-prestaconta-700" size={24} />}
      />
      
      <JsonGenerator 
        title="Galeria" 
        description="Gere o arquivo JSON para a galeria de fotos." 
        jsonType="galeria" 
        icon={<Image className="text-prestaconta-700" size={24} />}
      />
      
      <JsonGenerator 
        title="Documentos" 
        description="Gere o arquivo JSON para documentos e relatórios." 
        jsonType="documentos" 
        icon={<FileText className="text-prestaconta-700" size={24} />}
      />
      
      <JsonGenerator 
        title="Atividades" 
        description="Gere o arquivo JSON para atividades e eventos." 
        jsonType="atividades" 
        icon={<Activity className="text-prestaconta-700" size={24} />}
      />
      
      <JsonGenerator 
        title="Diretoria" 
        description="Gere o arquivo JSON para informações da diretoria." 
        jsonType="diretoria" 
        icon={<Users className="text-prestaconta-700" size={24} />}
      />
    </Layout>
  );
};

export default Admin;
