
# PrestaConta - Sistema de Transparência com JSON Estático

## Sobre o Projeto

PrestaConta é um sistema de transparência e prestação de contas que utiliza arquivos JSON estáticos para armazenar dados, eliminando a necessidade de um backend tradicional ou banco de dados. Projetado para ser hospedado no GitHub Pages ou Vercel, o sistema oferece uma solução simples e econômica para organizações que precisam cumprir requisitos de transparência.

## Características

- **100% Estático**: Todos os dados são armazenados em arquivos JSON
- **Sem Backend**: Não há necessidade de servidor ou banco de dados
- **Hospedagem Simples**: Pode ser hospedado gratuitamente no GitHub Pages ou Vercel
- **Atualização Manual**: Conteúdo atualizado via commits no GitHub
- **Responsivo**: Interface adaptada para dispositivos móveis e desktop

## Estrutura de Dados

Os dados do sistema estão organizados nos seguintes arquivos JSON:

### 1. avisos.json
```json
[
  {
    "id": "aviso-1",
    "titulo": "Título do Aviso",
    "conteudo": "Conteúdo detalhado do aviso...",
    "dataPublicacao": "2024-05-15T10:00:00Z",
    "destaque": true,
    "periodoInscricao": "01/06/2024 a 15/06/2024",
    "documentos": "RG, CPF, Comprovante de Residência",
    "imagem": "/images/avisos/imagem-aviso-1.jpg",
    "arquivo": {
      "nome": "Edital Completo",
      "tipo": "application/pdf",
      "url": "/docs/avisos/edital-completo.pdf"
    }
  }
]
```

### 2. financeiro.json
```json
{
  "saldoAnterior": 5000.00,
  "saldoAtual": 7500.00,
  "lancamentos": [
    {
      "id": "lanc-001",
      "tipo": "receita",
      "categoria": "Mensalidades",
      "descricao": "Mensalidade de associados",
      "valor": 3000.00,
      "data": "2024-05-01T00:00:00Z",
      "comprovante": "/docs/financeiro/comprovante-001.pdf"
    },
    {
      "id": "lanc-002",
      "tipo": "despesa",
      "categoria": "Aluguel",
      "descricao": "Aluguel da sede",
      "valor": 1000.00,
      "data": "2024-05-10T00:00:00Z",
      "comprovante": "/docs/financeiro/comprovante-002.pdf"
    }
  ]
}
```

### 3. galeria.json
```json
[
  {
    "id": "img-001",
    "titulo": "Evento de confraternização",
    "descricao": "Confraternização de final de ano",
    "data": "2024-12-20T18:00:00Z",
    "imagem": "/images/galeria/confraternizacao.jpg",
    "categorias": ["eventos", "confraternização"]
  }
]
```

### 4. documentos.json
```json
[
  {
    "id": "doc-001",
    "titulo": "Estatuto Social",
    "tipo": "estatuto",
    "ano": "2024",
    "url": "/docs/estatuto-social.pdf"
  },
  {
    "id": "doc-002",
    "titulo": "Livro Diário",
    "tipo": "livro",
    "ano": "2023",
    "mes": "12",
    "url": "/docs/livros-contabeis/livro-diario-2023.pdf"
  },
  {
    "id": "doc-003",
    "titulo": "Relatório de Atividades",
    "tipo": "relatorio",
    "ano": "2023",
    "url": "/docs/relatorios/relatorio-atividades-2023.pdf"
  }
]
```

### 5. diretoria.json
```json
{
  "mandato": "01/01/2024 a 31/12/2026",
  "diretoriaExecutiva": [
    {
      "cargo": "Presidente",
      "nome": "João da Silva"
    },
    {
      "cargo": "Vice-Presidente",
      "nome": "Maria Oliveira"
    },
    {
      "cargo": "Tesoureiro",
      "nome": "Carlos Santos"
    },
    {
      "cargo": "Secretário",
      "nome": "Ana Paula Ferreira"
    }
  ],
  "conselhoFiscal": [
    {
      "nome": "Roberto Almeida"
    },
    {
      "nome": "Juliana Costa"
    },
    {
      "nome": "Fernando Pereira"
    }
  ],
  "suplentesConselhoFiscal": [
    {
      "nome": "Márcia Rodrigues"
    },
    {
      "nome": "Paulo César Mendes"
    }
  ]
}
```

### 6. atividades.json
```json
[
  {
    "id": "ativ-001",
    "titulo": "Assembleia Geral Ordinária",
    "descricao": "Apresentação dos resultados anuais e eleição da nova diretoria",
    "data": "2024-03-15T14:00:00Z",
    "local": "Sede da Associação",
    "status": "concluido",
    "documentos": [
      {
        "nome": "Edital de Convocação",
        "url": "/docs/atividades/edital-ago.pdf"
      },
      {
        "nome": "Ata da Assembleia",
        "url": "/docs/atividades/ata-ago.pdf"
      }
    ]
  },
  {
    "id": "ativ-002",
    "titulo": "Curso de Capacitação",
    "descricao": "Curso de capacitação para novos associados",
    "data": "2024-06-10T09:00:00Z",
    "local": "Auditório Municipal",
    "status": "agendado"
  }
]
```

### 7. usuarios.json
```json
[
  {
    "id": "user-001",
    "username": "admin",
    "nome": "Administrador do Sistema",
    "email": "admin@prestaconta.org",
    "passwordHash": "5f4dcc3b5aa765d61d8327deb882cf99",
    "role": "admin",
    "ativo": true
  },
  {
    "id": "user-002",
    "username": "editor",
    "nome": "Editor de Conteúdo",
    "email": "editor@prestaconta.org",
    "passwordHash": "5f4dcc3b5aa765d61d8327deb882cf99",
    "role": "editor",
    "ativo": true
  }
]
```

## Estrutura do Projeto

```plaintext
/public
  /data
    avisos.json
    financeiro.json
    galeria.json
    documentos.json
    diretoria.json
    atividades.json
    usuarios.json
  /images
    /galeria
      [imagens da galeria]
    /avisos
      [imagens dos avisos]
  /docs
    /livros-contabeis
      [arquivos PDF dos livros contábeis]
    /relatorios
      [arquivos PDF dos relatórios]
    /avisos
      [arquivos PDF dos avisos]
    /atividades
      [arquivos PDF das atividades]
    /financeiro
      [comprovantes financeiros]
```

## Regras para Criação de Usuários

### Estrutura de Dados de Usuários

Os usuários são armazenados no arquivo `usuarios.json` com a seguinte estrutura:

```json
{
  "id": "user-XXX",
  "username": "nome_usuario",
  "nome": "Nome Completo",
  "email": "usuario@dominio.com",
  "passwordHash": "hash_md5_da_senha",
  "role": "admin|editor",
  "ativo": true|false,
  "dataCriacao": "2024-05-15T10:00:00Z",
  "ultimoAcesso": "2024-05-20T14:30:00Z"
}
```

### Requisitos para Criação de Usuários

1. **ID**: Formato `user-XXX` onde XXX é um número sequencial de 3 dígitos
2. **Username**: 
   - Entre 4 e 20 caracteres
   - Apenas letras minúsculas, números e sublinhados
   - Sem espaços ou caracteres especiais
3. **Senha**:
   - Mínimo de 8 caracteres
   - Deve conter pelo menos uma letra maiúscula, uma minúscula e um número
   - Armazenada como hash MD5 (apenas para demonstração, em produção use algoritmos mais seguros)
4. **Roles (Papéis)**:
   - `admin`: acesso total ao sistema
   - `editor`: pode editar conteúdos mas não gerenciar usuários

### Processo para Adicionar Novos Usuários

1. Gere um ID único seguindo o padrão `user-XXX`
2. Crie o hash MD5 da senha usando qualquer ferramenta online de MD5
3. Adicione o novo objeto de usuário ao array no arquivo `usuarios.json`
4. Faça commit e push das alterações para o repositório

## Regras para Upload de Arquivos

### Requisitos Gerais para Arquivos

1. **Tamanho Máximo**:
   - Imagens: 2MB
   - PDFs: 10MB
   - Outros documentos: 5MB

2. **Formatos Permitidos**:
   - Imagens: JPG, PNG, WebP, SVG
   - Documentos: PDF
   - Planilhas: XLSX, CSV (convertidos para PDF para exibição)

3. **Estrutura de Nomeação**:
   - Use apenas letras minúsculas, números e hífens
   - Sem espaços ou caracteres especiais
   - Inclua a data no formato YYYYMMDD no nome do arquivo quando relevante

### Processo de Upload de Novos Arquivos

1. **Preparação dos Arquivos**:
   - Redimensione e otimize imagens antes do upload
   - Converta documentos para PDF quando necessário
   - Nomeie os arquivos seguindo os padrões estabelecidos

2. **Upload para o Repositório**:
   - Coloque os arquivos nas pastas correspondentes dentro de `/public`
   - Atualize os arquivos JSON com referências aos novos arquivos
   - Faça commit e push das alterações para o repositório

3. **Verificação**:
   - Teste os links para os novos arquivos no ambiente de demonstração
   - Verifique se os arquivos estão sendo exibidos corretamente

## Páginas do Sistema

### 1. Página Inicial (PublicHome)

Página pública inicial do sistema, acessível a todos os visitantes. Exibe uma visão geral da organização e destaca as principais informações de transparência.

**Funcionalidades**:
- Exibição de informações gerais sobre a organização
- Acesso aos avisos em destaque
- Botão para acesso à área restrita (login)
- Links para as principais seções do portal de transparência

### 2. Dashboard (Index)

Página inicial após o login, exibe um resumo das informações mais importantes do sistema.

**Funcionalidades**:
- Acesso rápido às principais funcionalidades
- Exibição de avisos em destaque
- Resumo dos últimos lançamentos financeiros
- Lista das próximas atividades programadas

### 3. Avisos (Avisos)

Página que lista todos os avisos, editais e comunicados da organização.

**Funcionalidades**:
- Listagem de todos os avisos em ordem cronológica
- Filtro por data e categoria
- Pesquisa por título ou conteúdo
- Acesso aos detalhes de cada aviso

### 4. Detalhes do Aviso (AvisoDetalhe)

Exibe informações detalhadas sobre um aviso específico.

**Funcionalidades**:
- Exibição do título, conteúdo, data e demais informações
- Visualização de imagens relacionadas
- Download de arquivos anexos
- Botões para navegação entre avisos

### 5. Financeiro (Financeiro)

Página em construção para exibição de informações financeiras da organização.

**Funcionalidades Previstas**:
- Balanços financeiros
- Relatórios de receitas e despesas
- Gráficos de evolução financeira
- Download de documentos contábeis

### 6. Galeria (Galeria)

Exibe uma galeria de fotos de eventos e atividades da organização.

**Funcionalidades**:
- Exibição de imagens em formato de grid
- Filtro por categorias ou eventos
- Visualização ampliada das imagens
- Navegação entre imagens

### 7. Documentos (Documentos)

Lista todos os documentos oficiais, relatórios e livros contábeis da organização.

**Funcionalidades**:
- Listagem organizada por tipo e ano
- Filtro por tipo de documento e ano
- Pesquisa por título
- Visualização e download dos documentos

### 8. Diretoria (Diretoria)

Exibe informações sobre a diretoria atual e o conselho fiscal.

**Funcionalidades**:
- Exibição do período de mandato
- Lista de membros da diretoria executiva e seus cargos
- Lista de membros do conselho fiscal e suplentes
- Exibição de informações de contato (quando disponíveis)

### 9. Atividades (Atividades)

Lista atividades e eventos programados ou realizados pela organização.

**Funcionalidades**:
- Listagem de atividades em ordem cronológica
- Filtro por status (agendado, em andamento, concluído)
- Detalhes de cada atividade incluindo local e hora
- Acesso a documentos relacionados às atividades

### 10. Calendário (Calendario)

Exibe os eventos e atividades em formato de calendário.

**Funcionalidades**:
- Visualização mensal dos eventos
- Navegação entre meses e anos
- Exibição de detalhes ao clicar nos eventos
- Filtro por tipo de evento

### 11. Login (Login)

Página para autenticação de usuários ao sistema.

**Funcionalidades**:
- Formulário de login com usuário e senha
- Mensagens de erro para credenciais inválidas
- Redirecionamento para o Dashboard após autenticação
- Informações de demonstração para teste

### 12. Área Administrativa (Admin)

Ferramentas administrativas para gerenciar o conteúdo do sistema.

**Funcionalidades**:
- Geração e edição de arquivos JSON para cada seção
- Interface para carregar dados atuais
- Validação de dados JSON
- Download dos arquivos JSON gerados para atualização manual

### 13. Página Não Encontrada (NotFound)

Página de erro 404 exibida quando uma rota inexistente é acessada.

**Funcionalidades**:
- Mensagem informativa
- Botão para voltar à página anterior
- Registro do erro no console

## Instalação Local

Para instalar e executar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/prestaconta.git
   cd prestaconta
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse o sistema em [http://localhost:8080](http://localhost:8080)

## Deploy

### GitHub Pages

1. Crie um repositório no GitHub
2. Adicione o código ao repositório
3. Configure o GitHub Pages para servir a partir da branch `main`

### Vercel

1. Conecte o repositório ao Vercel
2. Configure o projeto (normalmente as configurações padrão funcionam)
3. Deploy!

## Como Atualizar o Conteúdo

### Método 1: Editor de JSON Online

1. Utilize a ferramenta administrativa em `/admin` para gerar novos arquivos JSON
2. Baixe os arquivos gerados
3. Substitua os arquivos correspondentes no repositório
4. Faça commit e push das alterações

### Método 2: Edição Manual

1. Edite diretamente os arquivos JSON no repositório
2. Siga o formato existente para adicionar novos itens
3. Faça commit e push das alterações

## Login de Demonstração

Para fins de demonstração, você pode acessar o sistema utilizando:

- **Usuário**: admin
- **Senha**: password

## Limitações

- Não há validação de dados em tempo real
- Não há controle de acesso granular
- O histórico de alterações é limitado ao histórico do Git
- Arquivos muito grandes podem causar problemas de desempenho

## Recomendações de Segurança

1. Altere as credenciais de demonstração em ambiente de produção
2. Não inclua informações sensíveis nos arquivos JSON
3. Considere adicionar autenticação de dois fatores em ambientes críticos
4. Faça backup regular dos arquivos JSON

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Para sugestões, dúvidas ou problemas, abra uma issue no repositório do GitHub.
