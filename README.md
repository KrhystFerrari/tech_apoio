# 🎓 TechApoio - Plataforma Educativa Interativa

**TechApoio** é uma plataforma educativa moderna e interativa projetada para crianças de 6 a 10 anos, oferecendo jogos educativos, sistema de gamificação e ferramentas de acompanhamento para professores.

## 🌟 Características Principais

### 🎮 **Jogos Educativos Interativos**

- **Português Mágico**: Jogos de formação de palavras e reconhecimento de letras
- **Matemática Legal**: Contagem, operações básicas e resolução de problemas
- **Ciências Incríveis**: Quiz interativo sobre natureza, animais e corpo humano
- Interface responsiva com animações fluidas usando Framer Motion

### 🏆 **Sistema de Gamificação Completo**

- **17+ Badges categorizados**: Progresso, Conquistas, Maestria, Sequência e Especiais
- **4 Níveis de Raridade**: Comum, Raro, Épico e Lendário
- **Sistema de Pontos**: Recompensas baseadas em performance
- **Notificações em Tempo Real**: Celebração de conquistas

### 📊 **Rankings e Leaderboard**

- **Rankings por Período**: Diário, Semanal, Mensal e Anual
- **Filtros por Matéria**: Performance específica por disciplina
- **Podium Visual**: Top 3 com indicadores de tendência
- **Sistema de Pontuação**: Baseado em performance e consistência

### 📈 **Relatórios para Professores**

- **Progresso Individual**: Acompanhamento detalhado de cada aluno
- **Análise de Performance**: Métricas de tempo, pontuação e dificuldades
- **Relatórios de Turma**: Visão consolidada da classe
- **Identificação de Dificuldades**: Alertas automáticos

### 🎵 **Sistema de Áudio Integrado**

- **Web Speech API**: Narração e feedback auditivo
- **Suporte Multilíngue**: Português e outros idiomas
- **Controles Personalizáveis**: Velocidade, volume e reprodução

### 🖼️ **Upload e Gestão de Mídia**

- **Upload de Imagens**: Validação automática e redimensionamento
- **Compressão Inteligente**: Otimização de tamanho e qualidade
- **Sistema de Avatares**: Personalização de perfis
- **Preview em Tempo Real**: Visualização antes do upload

## 🛠️ Tecnologias Utilizadas

### **Frontend**

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior robustez
- **TailwindCSS v4** - Estilização moderna e responsiva
- **Framer Motion** - Animações fluidas e interativas
- **React 19** - Recursos mais recentes do React
- **Lucide React** - Ícones modernos e escaláveis

### **Backend & Database**

- **Prisma ORM** - Gestão de banco de dados type-safe
- **SQLite** - Banco de dados leve e eficiente
- **Authentication** - Sistema de autenticação personalizado
- **File Upload** - Gestão de arquivos multimídia

## 🚀 Como Executar

### **Pré-requisitos**

- Node.js 18+
- npm ou yarn
- Git

### **Instalação**

1. **Clone o repositório**

```bash
git clone https://github.com/KrhystFerrari/tech_apoio.git
cd tech_apoio
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Configure o banco de dados**

```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Popular com dados iniciais
npx prisma db seed
```

4. **Configure variáveis de ambiente**

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite as variáveis conforme necessário
```

5. **Execute o projeto**

```bash
npm run dev
# ou
yarn dev
```

6. **Acesse a aplicação**

```
http://localhost:3000
```

## 🎮 Jogos Disponíveis

### **📖 Português Mágico**

- **Forme Palavras**: Arrastar letras para formar palavras
- **Reconhecimento de Letras**: Identificar letras e sons

### **🔢 Matemática Legal**

- **Contagem Divertida**: Contar objetos e animais
- **Operações Mágicas**: Somas e subtrações básicas

### **🔬 Ciências Incríveis**

- **Quiz de Ciências**: Perguntas sobre natureza e ciências

## 🏆 Sistema de Badges

### **Categorias**

- **📈 Progresso**: Marcos de desenvolvimento
- **🎯 Conquistas**: Objetivos específicos alcançados
- **🔥 Sequência**: Consistência de uso
- **👑 Maestria**: Domínio completo de habilidades
- **⭐ Especiais**: Eventos e conquistas únicas

### **Níveis de Raridade**

- **🥉 Comum**: Fácil de conquistar
- **🥈 Raro**: Requer esforço moderado
- **🥇 Épico**: Conquista significativa
- **💎 Lendário**: Extremamente difícil de obter

## 📊 Relatórios e Analytics

### **Métricas Coletadas**

- Tempo gasto por jogo/atividade
- Pontuação e performance
- Tentativas e erros
- Progresso por matéria
- Engajamento e consistência

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

**TechApoio** - Transformando educação através da tecnologia 🚀✨

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
