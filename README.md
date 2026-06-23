# Valorant Data

Dashboard para explorar o arsenal do Valorant — agentes, armas e skins (com chromas e
níveis em vídeo), mapas (com lore) e coleções — construído sobre a [valorant-api.com](https://valorant-api.com).

## Stack

- **Next.js 14** (App Router) com **TypeScript**
- **Tailwind CSS** com design system próprio (tokens, fontes Barlow)
- **lucide-react** para ícones

Os dados são buscados no servidor (Server Components) com cache ISR de 24h — sem
fetch no cliente, sem waterfall e sem tela de carregamento na navegação. Cada aba
e cada item têm rota própria (URL compartilhável + Open Graph); os detalhes abrem
como modal na navegação interna (o botão voltar fecha) e como página cheia no
acesso direto, via intercepting routes.

## Funcionalidades

- **Agentes** — função, kit de habilidades, descrição e contrato; filtro por função.
- **Armas** — estatísticas (custo, cadência, pente, recarga, penetração), tabela de
  dano por distância e skins com chromas e níveis em vídeo; filtro por categoria.
- **Mapas** — splash, lore narrativa e pontos táticos.
- **Coleções** — separadas em Champions, Cápsulas VCT, Times e Pacotes, com busca,
  ordenação e **filtro por ano** (Champions/VCT).
- **Cosméticos** — galerias de sprays, chaveiros e cartões, com busca e
  carregamento incremental (scroll infinito).
- **Modos de jogo** — duração e descrição de cada modo.
- **Ranks** — escada competitiva de Ferro a Radiante.

As imagens remotas passam pelo `next/image` (otimização e `srcset` automáticos).

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
```

Outros scripts: `npm run build` (build de produção), `npm start` (servidor de
produção), `npm run lint` (ESLint).

## Estrutura

```
app/          rotas por aba e por item (+ @modal interceptado), layout e estados
components/   componentes de UI; components/ui são os primitivos; views/ as abas
hooks/        hooks de UI (tecla Escape, trava de scroll)
services/     acesso à valorant-api (funções puras) e buscas por item
utils/        busca textual e classificação de coleções
types/        tipos de domínio da API
data/         lore dos mapas
```

Dados fornecidos pela [valorant-api.com](https://valorant-api.com). Projeto sem
afiliação com a Riot Games.
