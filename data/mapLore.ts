// Subtítulo de localização + descrição narrativa para cada mapa

export interface MapLore {
  subtitle: string;   // Ex: "Se passa em Thimphu, no Butão"
  description: string;
  callouts?: string[]; // Pontos táticos notáveis
}

const MAP_LORE: Record<string, MapLore> = {
  Bind: {
    subtitle: 'Se passa em Marrakesh, no Marrocos',
    description:
      'Bind é um campo de batalha urbano localizado em Marrakesh, no coração do Marrocos. O mapa se destaca por seus dois teleportadores unidirecionais que conectam partes opostas do mapa, forçando táticas criativas e rotações imprevisíveis. As ruelas estreitas e arquitetura mourisca com telhas ornamentadas e fontes d\'água criam uma atmosfera única. Aqui, agentes do VALORANT travam batalhas nas instalações de uma base secreta do Protocolo, escondida sob a fachada de uma cidade histórica. A ausência de um corredor central obriga equipes a escolherem suas rotas com cuidado, tornando cada round uma partida de xadrez em ritmo acelerado.',
    callouts: ['Bombsite A', 'Bombsite B', 'Teleporter A', 'Teleporter B', 'Showers', 'Bath'],
  },

  Haven: {
    subtitle: 'Se passa em Thimphu, no Butão (uma nação no Himalaia)',
    description:
      'Haven é o único mapa do jogo com três pontos de bomba, localizado em Thimphu, capital do Butão, uma nação budista encrustada nas montanhas do Himalaia. O mapa é construído sobre um antigo mosteiro em que uma fonte de energia radiant foi descoberta sob as estruturas sagradas. A tensão entre o espiritual e o tecnológico permeia cada corredor: altares dourados convivem com painéis de controle high-tech. O layout de três sites obriga os atacantes a forçar os defensores a cobrir mais território do que em qualquer outro mapa, recompensando equipes com comunicação e rotações rápidas.',
    callouts: ['Bombsite A', 'Bombsite B', 'Bombsite C', 'Garage', 'Mid', 'Courtyard'],
  },

  Split: {
    subtitle: 'Se passa em Tóquio, no Japão',
    description:
      'Split é um mapa urbano vertical situado no coração futurista de Tóquio, Japão. O terreno é literalmente dividido ao meio por um abismo que corta a cidade — daí o nome. Para traversar o mapa, agentes dependem de cordas de rapel que permitem ascensão rápida entre andares, criando combates em múltiplos planos verticais. As estruturas corporativas neon, anúncios em japonês e a estética cyberpunk de Tóquio contrastam com a brutalidade das batalhas que acontecem nelas. Split recompensa times que controlam o mid, pois quem domina o centro controla os dois destinos.',
    callouts: ['Bombsite A', 'Bombsite B', 'Mid', 'Ropes A', 'Ropes B', 'Heaven', 'Sewer'],
  },

  Ascent: {
    subtitle: 'Se passa em Veneza, na Itália',
    description:
      'Ascent é um dos mapas mais icônicos do VALORANT, ambientado em uma ilha flutuante que paira sobre os céus de Veneza, na Itália. O fragmento de cidade levitante foi arrancado da Terra por uma explosão de energia radiant durante a "Primeira Luz". Canais venezianos, pontes de pedra e arquitetura renascentista compõem um cenário de beleza perturbadora. O diferencial tático do mapa são as portas de metal operadas mecanicamente no meio do mapa, que cada equipe pode abrir ou fechar para controlar linhas de visão — uma ferramenta de suporte que adiciona uma camada estratégica rara.',
    callouts: ['Bombsite A', 'Bombsite B', 'Mid', 'Market', 'Catwalk', 'Mechanical Doors'],
  },

  Icebox: {
    subtitle: 'Se passa em uma estação de pesquisa no Ártico',
    description:
      'Icebox é uma estação de pesquisa secreta do Protocolo VALORANT situada em uma ilha remota no Ártico. O local foi construído para estudar fragmentos de Kingdom Radianite descobertos sob o gelo eterno polar. O clima hostil e o ambiente industrial criam uma atmosfera fria e opressora: containers empilhados, cabos de aço, ziplines e estruturas metálicas enferrujadas definem o layout. O mapa introduziu ziplines como mecânica de mobilidade vertical, permitindo aos jogadores flanquear posições altas de forma rápida e surpreendente. Todo o terreno transmite o isolamento absoluto de quem opera no fim do mundo.',
    callouts: ['Bombsite A', 'Bombsite B', 'Mid', 'Zipline A', 'Zipline B', 'Kitchen', 'Yellow'],
  },

  Breeze: {
    subtitle: 'Se passa em uma ilha remota no Oceano Atlântico',
    description:
      'Breeze é um mapa de espaços abertos e linhas de visão longas, situado em uma ilha tropical isolada no Atlântico — possivelmente nas proximidades das Bermudas. Ruínas de uma antiga civilização misteriosa se mesclam com vegetação exuberante, praias de areia branca e masmorras subterrâneas que guardam artefatos radiant de origem desconhecida. O vento constante deu nome ao mapa. Com corredores largos e poucos ângulos fechados, Breeze favorece fortemente agentes com rifles de longo alcance e duelos de habilidade pura, ao mesmo tempo que esconde segredos arqueológicos em cada canto sombrio.',
    callouts: ['Bombsite A', 'Bombsite B', 'Mid', 'Elbow', 'Cave', 'Hall', 'Tunnel'],
  },

  Fracture: {
    subtitle: 'Se passa em uma instalação secreta no Novo México, EUA',
    description:
      'Fracture é o mapa mais incomum do VALORANT — literalmente partido ao meio. Localizado em uma instalação de pesquisa Kingdom Corp no deserto do Novo México, o mapa tem formato de "H", e os atacantes começam nos dois lados externos do mapa, enquanto os defensores ficam no centro. Um acelerador de partículas que tentava explorar energia radiant sofreu uma catástrofe que rasgou o tecido da realidade, criando uma fenda visível no céu. Essa anomalia dimensional divide o mapa em dois planos que coexistem. A instalação destruída, cheia de equipamentos científicos retorcidos e esculturas de realidade deformada, narra o custo da ambição tecnológica sem limites.',
    callouts: ['Bombsite A', 'Bombsite B', 'Attacker Spawn (Rope)', 'Generator', 'Dish', 'Arcade'],
  },

  Pearl: {
    subtitle: 'Se passa em Lisboa, Portugal — uma cidade submersa',
    description:
      'Pearl é um mapa ambientado em uma versão alternativa de Lisboa, Portugal — porém completamente submersa sob o Oceano Atlântico. Em uma linha do tempo paralela onde a Primeira Luz não elevou ilhas mas afundou cidades, Lisboa foi engolida pelo mar e reconstruída sob pressão d\'água. A cidade subaquática mantém a arquitetura portuguesa original: azulejos, fachadas coloniais, praças com calçamento português, tudo envolto em luz turquesa filtrada pela água acima. Pearl é um mapa de ritmo médio com um corredor central disputado, que recompensa equipes que dominam o controle do mid com acesso privilegiado a ambos os pontos.',
    callouts: ['Bombsite A', 'Bombsite B', 'Mid', 'Art', 'Shops', 'Link', 'Tunnel'],
  },

  Lotus: {
    subtitle: 'Se passa em uma cidade perdida nas montanhas da Índia',
    description:
      'Lotus é um mapa mítico situado em uma cidade antiga e esquecida nas montanhas da Índia, descoberta graças a anomalias de energia radiant detectadas pelo Protocolo. Templos milenares, esculturas de pedra representando deidades hinduístas e portões ornamentados cobertos por vegetação selvagem compõem um visual grandioso e misterioso. O mapa apresenta três bombsites — como Haven — mas inova com portas giratórias que conectam regiões e podem ser destruídas permanentemente durante o round, alterando o fluxo de combate de forma irreversível. A energia radiant que emana das ruínas parece ter preservado o local fora do tempo.',
    callouts: ['Bombsite A', 'Bombsite B', 'Bombsite C', 'Rotating Doors', 'Tree', 'Waterfall'],
  },

  Sunset: {
    subtitle: 'Se passa em Los Angeles, Califórnia, EUA',
    description:
      'Sunset é o mapa mais contemporâneo do VALORANT, ambientado nos bairros de Los Angeles, Califórnia, durante um fim de tarde dourado. O mapa captura a estética urbana californiana: murais de grafite vibrantes, restaurantes de rua, lojas locais, postes de luz e ruas pavimentadas aquecidas pelo sol poente. Porém, por baixo dessa atmosfera cotidiana, uma operação do Protocolo está em curso: a Kingdom Corp instalou secretamente tecnologia radiant na infraestrutura da cidade, e agentes precisam neutralizar o threat antes que a população civil seja afetada. É o raro mapa do VALORANT que parece tirado do mundo real de hoje.',
    callouts: ['Bombsite A', 'Bombsite B', 'Mid', 'Market', 'Alley', 'Top Mid'],
  },

  Abyss: {
    subtitle: 'Se passa em plataformas suspensas sobre o Oceano Índico',
    description:
      'Abyss é o mapa mais ousado do VALORANT em termos de design — uma série de plataformas militares flutuantes suspensas a grande altitude sobre o Oceano Índico, sem bordas de segurança. Agentes podem literalmente cair para a morte se forem empurrados ou flanqueados para fora das plataformas. O perigo do abismo não é apenas metafórico: o vazio está sempre a um passo. As estruturas metálicas interligadas por passarelas estreitas criam combates intensos onde posicionamento é questão de sobrevivência literal. O horizonte infinito, as nuvens abaixo dos pés e o rugido do vento criam uma experiência de vertigen única no universo do jogo.',
    callouts: ['Bombsite A', 'Bombsite B', 'Mid', 'Bridge', 'Ledge', 'Hell'],
  },
};

/** Retorna o lore de um mapa pelo displayName. Fallback genérico se não encontrado. */
export function getMapLore(displayName: string): MapLore {
  return (
    MAP_LORE[displayName] ?? {
      subtitle: 'Localização classificada pelo Protocolo VALORANT',
      description:
        'Informações sobre este mapa ainda são classificadas pelo Protocolo VALORANT. Os agentes são instruídos a conhecer o terreno em campo.',
    }
  );
}
