
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface ContactFormData {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://n8n.integriguard.com.br/webhook/ampla-contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast.success('Mensagem enviada com sucesso!');
        reset(); // Clear the form
      } else {
        toast.error('Erro ao enviar mensagem. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card">
      <h2 className="text-xl font-semibold text-ampla-800 mb-4">Entre em Contato</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            {...register("nome", { required: "Nome é obrigatório" })}
            placeholder="Seu nome"
            className={errors.nome ? "border-red-500" : ""}
          />
          {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { 
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
            placeholder="seu.email@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="assunto">Assunto</Label>
          <Input
            id="assunto"
            {...register("assunto", { required: "Assunto é obrigatório" })}
            placeholder="Assunto da mensagem"
            className={errors.assunto ? "border-red-500" : ""}
          />
          {errors.assunto && <p className="text-red-500 text-xs mt-1">{errors.assunto.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="mensagem">Mensagem</Label>
          <Textarea
            id="mensagem"
            {...register("mensagem", { required: "Mensagem é obrigatória" })}
            placeholder="Digite sua mensagem aqui..."
            className={`min-h-[120px] ${errors.mensagem ? "border-red-500" : ""}`}
          />
          {errors.mensagem && <p className="text-red-500 text-xs mt-1">{errors.mensagem.message}</p>}
        </div>
        
        <Button 
          type="submit" 
          className="bg-ampla-600 hover:bg-ampla-700 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
