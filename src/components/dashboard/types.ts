
export interface Aviso {
  id: string;
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  destaque: boolean;
  imagem?: string;
  imagensAdicionais?: string[];
  periodoInscricao?: string;
  documentos?: string;
  arquivo?: {
    nome: string;
    tipo: string;
    url: string;
  };
}

export interface Atividade {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  status: string;
}
