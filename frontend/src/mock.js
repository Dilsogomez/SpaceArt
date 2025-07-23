// Mock data for SpaceArt platform

export const mockArtists = [
  {
    id: 1,
    name: "Marina Oliveira",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c6415a2b?w=150&h=150&fit=crop&crop=face",
    bio: "Artista visual especializada em pinturas abstratas e arte digital contemporânea.",
    location: "São Paulo, Brasil",
    followers: 1250,
    artworks: 23,
    featured: true,
    specialty: "Arte Abstrata"
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Ilustrador e designer gráfico criando obras que conectam tradição e modernidade.",
    location: "Rio de Janeiro, Brasil",
    followers: 890,
    artworks: 31,
    featured: true,
    specialty: "Ilustração Digital"
  },
  {
    id: 3,
    name: "Ana Beatriz",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Fotógrafa e artista multimídia explorando cores vibrantes e texturas únicas.",
    location: "Belo Horizonte, Brasil",
    followers: 2340,
    artworks: 45,
    featured: true,
    specialty: "Fotografia Artística"
  },
  {
    id: 4,
    name: "Ricardo Santos",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Escultor e artista 3D criando peças que desafiam os limites da realidade.",
    location: "Brasília, Brasil",
    followers: 567,
    artworks: 19,
    featured: false,
    specialty: "Escultura 3D"
  }
];

export const mockArtworks = [
  {
    id: 1,
    title: "Explosão de Cores",
    artistId: 1,
    artistName: "Marina Oliveira",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    description: "Uma celebração vibrante das emoções humanas expressa através de cores intensas e formas fluidas.",
    category: "Pintura Abstrata",
    likes: 234,
    featured: true,
    createdAt: "2024-03-15",
    tags: ["abstrato", "colorido", "emocional", "vibrante"],
    price: "R$ 850"
  },
  {
    id: 2,
    title: "Retrato Contemporâneo",
    artistId: 2,
    artistName: "Carlos Mendoza",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    description: "Uma reinterpretação moderna do retrato clássico, mesclando técnicas tradicionais com elementos digitais.",
    category: "Ilustração",
    likes: 189,
    featured: true,
    createdAt: "2024-03-10",
    tags: ["retrato", "contemporâneo", "digital", "moderno"],
    price: "R$ 1200"
  },
  {
    id: 3,
    title: "Natureza Urbana",
    artistId: 3,
    artistName: "Ana Beatriz",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=600&fit=crop",
    description: "A harmoniosa convivência entre elementos naturais e urbanos capturada em uma perspectiva única.",
    category: "Fotografia",
    likes: 456,
    featured: true,
    createdAt: "2024-03-08",
    tags: ["natureza", "urbano", "contraste", "fotografia"],
    price: "R$ 950"
  },
  {
    id: 4,
    title: "Reflexões Interiores",
    artistId: 1,
    artistName: "Marina Oliveira",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=600&fit=crop",
    description: "Uma jornada introspectiva através de formas orgânicas e cores que evocam tranquilidade.",
    category: "Pintura Abstrata",
    likes: 312,
    featured: false,
    createdAt: "2024-03-05",
    tags: ["reflexão", "orgânico", "tranquilo", "interior"],
    price: "R$ 720"
  },
  {
    id: 5,
    title: "Movimento Dinâmico",
    artistId: 4,
    artistName: "Ricardo Santos",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=600&fit=crop",
    description: "Uma escultura que captura a essência do movimento através de formas geométricas fluidas.",
    category: "Escultura",
    likes: 167,
    featured: false,
    createdAt: "2024-03-01",
    tags: ["movimento", "geométrico", "escultura", "dinâmico"],
    price: "R$ 680"
  },
  {
    id: 6,
    title: "Harmonia Cromática",
    artistId: 2,
    artistName: "Carlos Mendoza",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=600&fit=crop",
    description: "Uma exploração da teoria das cores aplicada a formas abstratas em perfeita harmonia visual.",
    category: "Arte Digital",
    likes: 278,
    featured: true,
    createdAt: "2024-02-28",
    tags: ["harmonia", "cores", "teoria", "abstrato"],
    price: "R$ 1100"
  }
];

export const mockCategories = [
  { id: 1, name: "Pintura Abstrata", count: 156 },
  { id: 2, name: "Ilustração", count: 89 },
  { id: 3, name: "Fotografia", count: 234 },
  { id: 4, name: "Escultura", count: 67 },
  { id: 5, name: "Arte Digital", count: 123 },
  { id: 6, name: "Pintura Realista", count: 45 }
];

export const mockStats = {
  totalArtists: 1247,
  totalArtworks: 5632,
  totalLikes: 23450,
  newThisWeek: 89
};