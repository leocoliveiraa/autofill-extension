# Cluster AutoFill - Form Filler

Extensão Chrome/Edge para preencher formulários automaticamente — útil para desenvolvedores e testadores.

Baseado nas informações em `manifest.json`.

## Recursos

- Preenche formulários de teste automaticamente
- Roda como content script em todas as páginas (ver `manifest.json`)

## Requisitos

- Node.js (>= 16)
- npm

## Instalação

1. Clone o repositório

   git clone <URL-DO-REPO>
   cd autofill-extension

2. Instale dependências

   npm install

## Build

- Para desenvolvimento (watch):

  npm run build

- Para compilar uma vez (usado em CI):

  npm run build:prod

Os arquivos compilados vão para a pasta `dist/` conforme `tsconfig.json`.

## Executando localmente

- Para testar a extensão localmente no Chrome/Edge:
  1. Abra `chrome://extensions/` (ou `edge://extensions/`).
  2. Ative "Modo do desenvolvedor".
  3. Clique em "Carregar sem compactação" e selecione a pasta do projeto (use a raiz se `dist/` já estiver presente, ou selecione `dist/` se os arquivos finais estiverem lá).

Observação: o `manifest.json` referencia `dist/content.js` como content script — certifique-se de compilar antes de carregar.

## Publicação

- Para publicar na Chrome Web Store: compacte os arquivos necessários (ex.: `manifest.json`, `dist/`, `icons/`, `src/popup.html`) em um ZIP e siga o fluxo do painel do desenvolvedor da Chrome Web Store.

## Licença

Este repositório é fornecido sob a licença descrita no arquivo `LICENSE`. Atualize o autor no `LICENSE` e neste README conforme desejado.

## Autor

Veja `manifest.json` e `package.json` para metadados. Por favor atualize o campo `author` em `package.json`.
