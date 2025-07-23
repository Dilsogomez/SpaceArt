import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { mockArtists, mockArtworks, mockStats } from "../mock";
import { ArrowRight, Star, Users, Image, Heart, TrendingUp, Sparkles } from "lucide-react";

const Home = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [stats, setStats] = useState(mockStats);

  useEffect(() => {
    // Simulate API calls with mock data
    setFeaturedArtworks(mockArtworks.filter(artwork => artwork.featured).slice(0, 6));
    setFeaturedArtists(mockArtists.filter(artist => artist.featured));
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-blue-500 mr-3 animate-spin" />
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-blue-500/10 text-blue-400 border-blue-500/20">
                Plataforma do Futuro
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Explore o Cosmos
              <br />
              <span className="text-white">Através da Arte</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Descubra um universo de criatividade onde artistas visionários transformam 
              o espaço infinito em obras que tocam a alma e revolucionam o mercado digital.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/gallery">
                  Explorar Galeria
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
                asChild
              >
                <Link to="/upload">
                  Seja um Artista
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{stats.totalArtists.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Artistas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{stats.totalArtworks.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Obras</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{stats.totalLikes.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Curtidas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">+{stats.newThisWeek}</div>
                <div className="text-sm text-gray-400">Esta Semana</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <Badge variant="outline">Destaque</Badge>
            </div>
            <h2 className="text-4xl font-bold mb-4">Obras em Destaque</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Descubra as criações mais impressionantes da nossa comunidade de artistas espaciais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork) => (
              <Card key={artwork.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <Badge className="mb-2 bg-white/20 text-white backdrop-blur-sm">
                      {artwork.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {artwork.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Por {artwork.artistName}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{artwork.likes}</span>
                      </div>
                      <Badge variant="secondary">{artwork.price}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link to="/gallery">
                Ver Toda a Galeria
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-500 mr-2" />
              <Badge variant="outline">Comunidade</Badge>
            </div>
            <h2 className="text-4xl font-bold mb-4">Artistas em Destaque</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Conheça os visionários que estão redefinindo a arte espacial no cenário digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtists.map((artist) => (
              <Card key={artist.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                    <AvatarImage src={artist.avatar} alt={artist.name} />
                    <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {artist.name}
                  </h3>
                  
                  <Badge variant="secondary" className="mb-3">
                    {artist.specialty}
                  </Badge>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {artist.bio}
                  </p>
                  
                  <div className="flex justify-center space-x-6 text-sm text-muted-foreground mb-4">
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{artist.followers.toLocaleString()}</div>
                      <div>Seguidores</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{artist.artworks}</div>
                      <div>Obras</div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link to={`/artist/${artist.id}`}>
                      Ver Perfil
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="h-8 w-8 text-white mr-3" />
              <Badge className="bg-white/20 text-white backdrop-blur-sm">
                Junte-se à Revolução
              </Badge>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para Conquistar
              <br />o Universo da Arte?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Faça parte da comunidade mais inovadora de artistas digitais. 
              Transforme sua paixão pelo espaço em uma carreira revolucionária.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/upload">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
                asChild
              >
                <Link to="/gallery">
                  Explorar Primeiro
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;