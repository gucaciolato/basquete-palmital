
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Only redirect if user is authenticated AND authentication loading is complete
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      
      if (success) {
        // No need to navigate here, the useEffect will handle it
      } else {
        setError('Usuário ou senha inválidos');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while authentication status is being determined
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-prestaconta-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-prestaconta-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-prestaconta-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-prestaconta-800">PrestaConta</h1>
          <p className="text-gray-600 mt-2">Acesse sua conta para continuar</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Nome de usuário
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-prestaconta-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-prestaconta-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-ampla-600 hover:bg-ampla-700 text-white font-medium rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Para fins de demonstração, use:
          </p>
          <p className="text-sm text-gray-600">
            Usuário: admin | Senha: password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
