# Valorant Data

Dashboard para explorar o arsenal do Valorant — agentes, armas e skins (com chromas e
níveis em vídeo), mapas (com lore) e coleções — construído sobre a [valorant-api.com](https://valorant-api.com).

## Stack

- **Next.js 14** (App Router) com **TypeScript**
- **Tailwind CSS** com design system próprio (tokens, fontes Barlow)
- **lucide-react** para ícones

Os dados são buscados no servidor (Server Components) com cache ISR de 24h — sem
fetch no cliente, sem waterfall e sem tela de carregamento na navegação.

## Funcionalidades

- **Agentes** — retrato, descrição e contrato.
- **Armas** — skins com chromas (troca de cor no preview) e níveis com vídeo e som.
- **Mapas** — splash, lore narrativa e pontos táticos.
- **Coleções** — separadas em Champions, Cápsulas VCT, Times e Pacotes, com busca,
  ordenação e **filtro por ano** (Champions/VCT).

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
```

Outros scripts: `npm run build` (build de produção), `npm start` (servidor de
produção), `npm run lint` (ESLint).

## Estrutura

```
app/          rotas, layout, página (SSR) e estados de loading/erro
components/   componentes de UI; components/ui são os primitivos reutilizáveis
hooks/        hooks de UI (tecla Escape, trava de scroll)
services/     acesso à valorant-api (funções puras, sem React)
utils/        busca textual e classificação de coleções
types/        tipos de domínio da API
data/         lore dos mapas
```

Dados fornecidos pela [valorant-api.com](https://valorant-api.com). Projeto sem
afiliação com a Riot Games.
