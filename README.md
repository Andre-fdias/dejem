<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield.svg" alt="DEJEM" width="80"/>
  <h1>🚔 DEJEM — Consulta de Escalas</h1>
  <p><strong>15º GB - 2º SGB</strong></p>
  <p>Aplicação operacional, ágil e responsiva para consulta, filtragem e gestão visual das Escalas DEJEM, alimentada em tempo real por planilhas Google Sheets.</p>

  [![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
  [![GitHub Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
</div>

<hr/>

## 🎯 Objetivo

O sistema foi desenhado para reduzir o esforço cognitivo do usuário na hora de encontrar escalas disponíveis, substituindo consultas tradicionais (como PDFs ou planilhas difíceis de ler) por uma experiência rápida, "Mobile First" e visualmente categorizada.

O projeto NÃO utiliza banco de dados próprio. Toda a sua infraestrutura de dados provém do **Google Sheets**, utilizando caching no navegador para garantir que a aplicação possa responder imediatamente mesmo que haja oscilação na rede.

## ✨ Funcionalidades

- 🌓 **Temas Dinâmicos:** Suporte automático para Dark Mode e Light Mode conforme a preferência do sistema operacional, garantindo ergonomia em cenários noturnos e diurnos.
- ⚡ **Performance e Cache:** Cache via LocalStorage que retém a última atualização válida caso o serviço do Google Sheets enfrente alguma instabilidade temporária.
- 📱 **Mobile First:** Componentes de *Bottom Sheets*, agrupamentos responsivos e prioridade de toques ajustados para a experiência em campo via celular.
- 🔍 **Filtros Avançados Inteligentes:** Pesquisa instantânea por ID, Posto, Nome ou Unidade, complementada por filtros interdependentes que atualizam em tempo real, sem necessidade de enviar o formulário.
- 📊 **Visualização Híbrida:** Alternância entre visão detalhada de **Cards** (mais visual) e visão densa de **Tabela** (mais analítica).
- 🏷️ **Feedback Visual de Vagas:** Distinção de cores sistêmicas para "Esgotada", "Últimas Vagas" e "Disponível".

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- Vanilla CSS + CSS Variables (sem dependência de frameworks UI pesados)
- [Lucide React](https://lucide.dev/) para o acervo de ícones
- Fetch API & Google Visualization Query

## 🚀 Como Executar o Projeto Localmente

1. Clone o repositório em sua máquina:
   ```bash
   git clone git@github.com:Andre-fdias/dejem.git
   cd dejem
   ```

2. Instale as dependências essenciais:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:5173/` no seu navegador.

## 🔧 Configurando a Fonte de Dados

Os dados são obtidos diretamente de uma planilha do Google Sheets que precisa estar com o compartilhamento definido para **Qualquer pessoa com o link pode ler**.

Para apontar para a sua planilha, altere os parâmetros em `src/config/constants.js`:

```javascript
export const APP_CONFIG = {
    // Substitua pela chave (ID) existente na URL da sua Planilha
    spreadsheetId: "1IXmAbV3xvJ3SNHgejnjkVKxcPTx7FLx_zzXFhr9868k",
    // Substitua pela GID da aba desejada (geralmente "0")
    sheetGid: "0"
};
```

## 🌐 Deploy Automático e Publicação

Este repositório está configurado para publicação no **GitHub Pages** (Branch `gh-pages`).

Para compilar uma nova versão de produção e enviá-la para o ambiente final, basta utilizar o comando:

```bash
npm run deploy
```

*(O comando compila o `/dist` via `npm run build` e usa a dependência `gh-pages` para publicá-lo).*

<div align="center">
    <br/>
    <i>Desenvolvido com padrões modernos para operações do Corpo de Bombeiros.</i>
</div>
