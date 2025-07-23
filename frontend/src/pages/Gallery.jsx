import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { mockArtworks, mockCategories } from "../mock";
import { Search, Filter, Grid, List, Heart, Eye, Star, TrendingUp, Palette } from "lucide-react";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [likedArtworks, setLikedArtworks] = useState(new Set());

  useEffect(() => {
    setArtworks(mockArtworks);
    setFilteredArtworks(mockArtworks);
  }, []);

  useEffect(() => {
    let filtered = artworks;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(artwork => 
        artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(artwork => artwork.category === selectedCategory);
    }

    // Sort artworks
    switch (sortBy) {
      case "popular":
        filtered = [...filtered].sort((a, b) => b.likes - a.likes);
        break;
      case "recent":
        filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "price-low":
        filtered = [...filtered].sort((a, b) => parseFloat(a.price.replace('R$ ', '')) - parseFloat(b.price.replace('R$ ', '')));
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => parseFloat(b.price.replace('R$ ', '')) - parseFloat(a.price.replace('R$ ', '')));
        break;
      default:
        break;
    }

    setFilteredArtworks(filtered);
  }, [artworks, searchQuery, selectedCategory, sortBy]);

  const handleLike = (artworkId) => {
    const newLikedArtworks = new Set(likedArtworks);
    if (newLikedArtworks.has(artworkId)) {
      newLikedArtworks.delete(artworkId);
    } else {
      newLikedArtworks.add(artworkId);
    }
    setLikedArtworks(newLikedArtworks);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Palette className="h-6 w-6 text-pink-500 mr-2" />
            <Badge variant="outline" className="border-pink-300 text-pink-600">Galeria Criativa</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Explore o Mundo da Arte
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubra obras impressionantes criadas por artistas talentosos de todo o Brasil
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por título, artista ou tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/70 border-gray-200"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-white/70 border-gray-200">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-white/70 border-gray-200">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais Recentes</SelectItem>
                <SelectItem value="popular">Mais Populares</SelectItem>
                <SelectItem value="price-low">Menor Preço</SelectItem>
                <SelectItem value="price-high">Maior Preço</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-pink-500 hover:bg-pink-600" : "border-gray-200 text-gray-600 hover:text-pink-500"}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-pink-500 hover:bg-pink-600" : "border-gray-200 text-gray-600 hover:text-pink-500"}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="bg-white/70 p-1 h-auto border border-gray-200/50">
            <TabsTrigger value="all" className="px-6 py-3 data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Todas
            </TabsTrigger>
            {mockCategories.slice(0, 5).map((category) => (
              <TabsTrigger key={category.id} value={category.name} className="px-6 py-3 data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Exibindo {filteredArtworks.length} de {artworks.length} obras
          </p>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">
              {selectedCategory !== "all" && `Categoria: ${selectedCategory}`}
              {searchQuery && ` • Busca: "${searchQuery}"`}
            </span>
          </div>
        </div>

        {/* Artworks Grid */}
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-6"
        }>
          {filteredArtworks.map((artwork) => (
            <Card 
              key={artwork.id} 
              className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                <img 
                  src={artwork.image} 
                  alt={artwork.title}
                  className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
                    viewMode === "list" ? "w-full h-48" : "w-full h-64"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                    onClick={() => handleLike(artwork.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        likedArtworks.has(artwork.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`} 
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>

                {/* Featured Badge */}
                {artwork.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 text-white backdrop-blur-sm">
                      <Star className="h-3 w-3 mr-1" />
                      Destaque
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold group-hover:text-pink-500 transition-colors line-clamp-1">
                    {artwork.title}
                  </h3>
                  <Badge variant="secondary" className="ml-2 flex-shrink-0 bg-purple-100 text-purple-700">
                    {artwork.category}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {artwork.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-pink-500">
                    Por {artwork.artistName}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm">{artwork.likes}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {artwork.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-gray-300 text-gray-600">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    {artwork.price}
                  </span>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredArtworks.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="hover:bg-pink-500 hover:text-white border-pink-300 text-pink-600"
            >
              Carregar Mais Obras
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Nenhuma obra encontrada</h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;