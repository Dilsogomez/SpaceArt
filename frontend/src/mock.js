// Mock data for SpaceArt platform

export const mockArtists = [
  {
    id: 1,
    name: "Luna Cosmic",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c6415a2b?w=150&h=150&fit=crop&crop=face",
    bio: "Digital artist exploring the intersection of space, time, and human emotion through cosmic imagery.",
    location: "São Paulo, Brasil",
    followers: 1250,
    artworks: 23,
    featured: true,
    specialty: "Digital Cosmic Art"
  },
  {
    id: 2,
    name: "Stellar Phoenix",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Creating immersive space narratives through mixed media and AI-assisted techniques.",
    location: "Rio de Janeiro, Brasil",
    followers: 890,
    artworks: 31,
    featured: true,
    specialty: "AI-Enhanced Space Art"
  },
  {
    id: 3,
    name: "Nova Dreamer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Exploring nebulae, galaxies, and cosmic phenomena through contemporary digital painting.",
    location: "Belo Horizonte, Brasil",
    followers: 2340,
    artworks: 45,
    featured: true,
    specialty: "Nebula Paintings"
  },
  {
    id: 4,
    name: "Cosmos Walker",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Abstract interpretations of space exploration and human connection to the universe.",
    location: "Brasília, Brasil",
    followers: 567,
    artworks: 19,
    featured: false,
    specialty: "Abstract Space"
  }
];

export const mockArtworks = [
  {
    id: 1,
    title: "Nebula Dreams",
    artistId: 1,
    artistName: "Luna Cosmic",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
    description: "Uma representação digital dos sonhos que emergem das nebulosas distantes.",
    category: "Digital Art",
    likes: 234,
    featured: true,
    createdAt: "2024-03-15",
    tags: ["nebula", "dreams", "cosmic", "digital"],
    price: "R$ 850"
  },
  {
    id: 2,
    title: "Stellar Birth",
    artistId: 2,
    artistName: "Stellar Phoenix",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop",
    description: "O momento místico do nascimento de uma estrela, capturado através de IA.",
    category: "AI Art",
    likes: 189,
    featured: true,
    createdAt: "2024-03-10",
    tags: ["stellar", "birth", "AI", "space"],
    price: "R$ 1200"
  },
  {
    id: 3,
    title: "Galaxy Whispers",
    artistId: 3,
    artistName: "Nova Dreamer",
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&h=600&fit=crop",
    description: "Sussurros silenciosos de galáxias distantes traduzidos em cores vibrantes.",
    category: "Digital Painting",
    likes: 456,
    featured: true,
    createdAt: "2024-03-08",
    tags: ["galaxy", "whispers", "vibrant", "painting"],
    price: "R$ 950"
  },
  {
    id: 4,
    title: "Cosmic Meditation",
    artistId: 1,
    artistName: "Luna Cosmic",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop",
    description: "Uma jornada meditativa através dos mistérios do cosmos infinito.",
    category: "Digital Art",
    likes: 312,
    featured: false,
    createdAt: "2024-03-05",
    tags: ["meditation", "cosmic", "mystery", "infinity"],
    price: "R$ 720"
  },
  {
    id: 5,
    title: "Interstellar Journey",
    artistId: 4,
    artistName: "Cosmos Walker",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Uma interpretação abstrata da jornada humana entre as estrelas.",
    category: "Abstract",
    likes: 167,
    featured: false,
    createdAt: "2024-03-01",
    tags: ["interstellar", "journey", "human", "abstract"],
    price: "R$ 680"
  },
  {
    id: 6,
    title: "Solar Flare Symphony",
    artistId: 2,
    artistName: "Stellar Phoenix",
    image: "https://images.unsplash.com/photo-1518066000806-8c835c5ac4bf?w=800&h=600&fit=crop",
    description: "Uma sinfonia visual das explosões solares em harmonia cósmica.",
    category: "AI Art",
    likes: 278,
    featured: true,
    createdAt: "2024-02-28",
    tags: ["solar", "flare", "symphony", "harmony"],
    price: "R$ 1100"
  }
];

export const mockCategories = [
  { id: 1, name: "Digital Art", count: 156 },
  { id: 2, name: "AI Art", count: 89 },
  { id: 3, name: "Digital Painting", count: 234 },
  { id: 4, name: "Abstract", count: 67 },
  { id: 5, name: "3D Renders", count: 123 },
  { id: 6, name: "Photography", count: 45 }
];

export const mockStats = {
  totalArtists: 1247,
  totalArtworks: 5632,
  totalLikes: 23450,
  newThisWeek: 89
};