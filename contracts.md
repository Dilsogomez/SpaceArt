# SpaceArt - Contratos de API e Integração Backend

## 📋 Visão Geral

Este documento define os contratos entre frontend e backend para a plataforma SpaceArt, especificando APIs, modelos de dados e procedimentos de integração.

## 🗄️ Modelos de Dados (MongoDB)

### 1. Artist (Artista)
```javascript
{
  _id: ObjectId,
  name: String, // Nome do artista
  email: String, // Email único
  avatar: String, // URL ou base64 da foto de perfil
  bio: String, // Biografia do artista
  location: String, // Localização
  specialty: String, // Especialidade artística
  followers: Number, // Quantidade de seguidores
  following: Number, // Quantidade seguindo
  artworks: Number, // Quantidade de obras
  featured: Boolean, // Se é artista em destaque
  socialMedia: {
    instagram: String,
    twitter: String,
    website: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Artwork (Obra de Arte)
```javascript
{
  _id: ObjectId,
  title: String, // Título da obra
  description: String, // Descrição detalhada
  image: String, // Imagem em base64 ou URL
  artistId: ObjectId, // Referência ao artista
  artistName: String, // Nome do artista (desnormalizado)
  category: String, // Categoria da arte
  tags: [String], // Array de tags
  likes: Number, // Quantidade de curtidas
  views: Number, // Quantidade de visualizações
  featured: Boolean, // Se é obra em destaque
  price: String, // Preço (opcional)
  forSale: Boolean, // Se está à venda
  likedBy: [ObjectId], // IDs dos usuários que curtiram
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Category (Categoria)
```javascript
{
  _id: ObjectId,
  name: String, // Nome da categoria
  count: Number, // Quantidade de obras nesta categoria
  description: String, // Descrição da categoria
  featured: Boolean, // Se é categoria em destaque
  createdAt: Date,
  updatedAt: Date
}
```

### 4. User (Usuário/Visitante)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  avatar: String,
  favorites: [ObjectId], // IDs das obras favoritas
  following: [ObjectId], // IDs dos artistas seguidos
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ APIs Backend Necessárias

### 1. Artists API

#### GET /api/artists
```javascript
// Listar todos os artistas
Response: {
  artists: [Artist],
  total: Number,
  page: Number,
  limit: Number
}
```

#### GET /api/artists/featured
```javascript
// Artistas em destaque
Response: {
  artists: [Artist]
}
```

#### GET /api/artists/:id
```javascript
// Detalhes de um artista específico
Response: {
  artist: Artist,
  artworks: [Artwork]
}
```

#### POST /api/artists
```javascript
// Criar novo artista
Body: {
  name: String,
  email: String,
  bio: String,
  location: String,
  specialty: String,
  avatar?: String
}
Response: {
  artist: Artist,
  message: String
}
```

### 2. Artworks API

#### GET /api/artworks
```javascript
// Listar todas as obras com filtros
Query params: {
  category?: String,
  search?: String,
  sortBy?: 'recent' | 'popular' | 'price-low' | 'price-high',
  page?: Number,
  limit?: Number
}
Response: {
  artworks: [Artwork],
  total: Number,
  page: Number,
  limit: Number
}
```

#### GET /api/artworks/featured
```javascript
// Obras em destaque
Response: {
  artworks: [Artwork]
}
```

#### GET /api/artworks/:id
```javascript
// Detalhes de uma obra específica
Response: {
  artwork: Artwork
}
```

#### POST /api/artworks
```javascript
// Criar nova obra
Body: {
  title: String,
  description: String,
  image: String, // base64
  artistId: String,
  category: String,
  tags: [String],
  price?: String,
  forSale?: Boolean
}
Response: {
  artwork: Artwork,
  message: String
}
```

#### PUT /api/artworks/:id/like
```javascript
// Curtir/descurtir obra
Body: {
  userId?: String
}
Response: {
  artwork: Artwork,
  liked: Boolean,
  message: String
}
```

### 3. Categories API

#### GET /api/categories
```javascript
// Listar todas as categorias
Response: {
  categories: [Category]
}
```

#### POST /api/categories
```javascript
// Criar nova categoria
Body: {
  name: String,
  description: String
}
Response: {
  category: Category,
  message: String
}
```

### 4. Search API

#### GET /api/search
```javascript
// Busca global
Query params: {
  q: String, // termo de busca
  type?: 'artists' | 'artworks' | 'all'
}
Response: {
  artists: [Artist],
  artworks: [Artwork],
  total: Number
}
```

### 5. Stats API

#### GET /api/stats
```javascript
// Estatísticas da plataforma
Response: {
  totalArtists: Number,
  totalArtworks: Number,
  totalLikes: Number,
  newThisWeek: Number
}
```

## 🔄 Integração Frontend

### 1. Remover Mock Data
**Arquivos a modificar:**
- `/app/frontend/src/mock.js` - Remover ou renomear
- Todas as páginas que importam mock data

### 2. Criar Services Layer
**Arquivo:** `/app/frontend/src/services/api.js`
```javascript
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const artistsAPI = {
  getAll: (params) => axios.get(`${API}/artists`, { params }),
  getFeatured: () => axios.get(`${API}/artists/featured`),
  getById: (id) => axios.get(`${API}/artists/${id}`),
  create: (data) => axios.post(`${API}/artists`, data)
};

export const artworksAPI = {
  getAll: (params) => axios.get(`${API}/artworks`, { params }),
  getFeatured: () => axios.get(`${API}/artworks/featured`),
  getById: (id) => axios.get(`${API}/artworks/${id}`),
  create: (data) => axios.post(`${API}/artworks`, data),
  like: (id, userId) => axios.put(`${API}/artworks/${id}/like`, { userId })
};

export const categoriesAPI = {
  getAll: () => axios.get(`${API}/categories`),
  create: (data) => axios.post(`${API}/categories`, data)
};

export const searchAPI = {
  search: (params) => axios.get(`${API}/search`, { params })
};

export const statsAPI = {
  getStats: () => axios.get(`${API}/stats`)
};
```

### 3. Hooks Customizados
**Arquivo:** `/app/frontend/src/hooks/useArtworks.js`
```javascript
import { useState, useEffect } from 'react';
import { artworksAPI } from '../services/api';

export const useArtworks = (params = {}) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const response = await artworksAPI.getAll(params);
        setArtworks(response.data.artworks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [JSON.stringify(params)]);

  return { artworks, loading, error, refetch: () => fetchArtworks() };
};
```

### 4. Context Providers
**Arquivo:** `/app/frontend/src/contexts/AppContext.js`
```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { statsAPI } from '../services/api';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [stats, setStats] = useState({
    totalArtists: 0,
    totalArtworks: 0,
    totalLikes: 0,
    newThisWeek: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statsAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AppContext.Provider value={{ stats, loading }}>
      {children}
    </AppContext.Provider>
  );
};
```

## 📂 Estrutura de Pastas Backend

```
/app/backend/
├── models/
│   ├── Artist.py
│   ├── Artwork.py
│   ├── Category.py
│   └── User.py
├── routes/
│   ├── artists.py
│   ├── artworks.py
│   ├── categories.py
│   ├── search.py
│   └── stats.py
├── services/
│   ├── image_service.py
│   ├── search_service.py
│   └── stats_service.py
├── utils/
│   ├── validators.py
│   └── helpers.py
└── server.py
```

## 🔒 Validações Necessárias

### 1. Artwork Upload
```python
# Validações para upload de obra
- Título: obrigatório, min 3 chars, max 100 chars
- Descrição: obrigatório, min 10 chars, max 500 chars
- Categoria: obrigatório, deve existir na collection categories
- Imagem: obrigatório, formato base64, max 5MB
- Tags: opcional, max 10 tags, cada tag max 20 chars
- Preço: opcional, formato monetário válido
```

### 2. Artist Registration
```python
# Validações para registro de artista
- Nome: obrigatório, min 2 chars, max 50 chars
- Email: obrigatório, formato válido, único
- Bio: obrigatório, min 20 chars, max 300 chars
- Localização: obrigatório, max 50 chars
- Especialidade: obrigatório, max 30 chars
```

## 🚀 Procedimento de Integração

### Fase 1: Setup Backend
1. Criar modelos de dados no MongoDB
2. Implementar routes básicas (GET endpoints)
3. Adicionar dados de seed para testes
4. Testar endpoints com dados mock

### Fase 2: Integração Gradual
1. Substituir mock data por API calls na Home
2. Integrar Gallery com filtros e busca
3. Integrar página de Artista
4. Implementar Upload com validações

### Fase 3: Funcionalidades Avançadas
1. Sistema de likes/favorites
2. Sistema de follow/unfollow
3. Upload de imagens com otimização
4. Busca avançada com elasticidade

### Fase 4: Otimizações
1. Cache de dados frequentes
2. Paginação otimizada
3. Compressão de imagens
4. Analytics e métricas

## 📝 Notas Importantes

### Tratamento de Imagens
- **Formato**: Salvar como base64 no MongoDB
- **Compressão**: Redimensionar para max 1200px width
- **Qualidade**: JPEG quality 85%
- **Thumbnails**: Gerar versão 300px para listagens

### Performance
- **Paginação**: Implementar em todas as listagens
- **Cache**: Cache de 5 minutos para dados estáticos
- **Indexação**: Criar índices para busca por categoria, tags, artistId

### Segurança
- **Validação**: Validar todos os inputs no backend
- **Rate Limiting**: Limitar uploads para 10 por hora por IP
- **Sanitização**: Limpar HTML/scripts dos textos

### Error Handling
- **Status Codes**: Usar códigos HTTP apropriados
- **Mensagens**: Mensagens de erro claras e consistentes
- **Logging**: Log de todas as operações críticas

Este documento serve como guia completo para a implementação do backend e integração com o frontend da plataforma SpaceArt.