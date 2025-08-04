
import React from 'react';
import PublicLayout from '../components/PublicLayout';
import ContactForm from '../components/ContactForm';

const Contato: React.FC = () => {
  return (
    <PublicLayout>
      <section className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-ampla-800 mb-6">Entre em Contato</h1>
        <p className="text-gray-600 mb-8">
          Utilize o formulário abaixo para enviar sua mensagem. Nossa equipe responderá o mais breve possível.
        </p>
        
        <div className="max-w-md mx-auto">
          <ContactForm />
        </div>
      </section>
    </PublicLayout>
  );
};

export default Contato;
