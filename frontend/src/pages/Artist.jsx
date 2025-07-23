import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { mockArtists, mockArtworks } from "../mock";
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Star, Eye, Users, Image, MessageCircle, Instagram, Twitter, Palette } from "lucide-react";

const Artist = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [artistArtworks, setArtistArtworks] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Find artist by id
    const foundArtist = mockArtists.find(a => a.id === parseInt(id));
    setArtist(foundArtist);
    
    // Get artist's artworks
    if (foundArtist) {
      const works = mockArtworks.filter(artwork => artwork.artistId === foundArtist.id);
      setArtistArtworks(works);
    }
  }, [id]);

  if (!artist) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Artista não encontrado</h2>
          <Button asChild>
            <Link to="/gallery">Voltar à Galeria</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 overflow-hidden">
        {/* Background Art Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30" asChild>
            <Link to="/gallery">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
        </div>

        {/* Artist Info */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="flex items-end space-x-6">
            <Avatar className="w-32 h-32 border-4 border-white/30 shadow-2xl">
              <AvatarImage src={artist.avatar} alt={artist.name} />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                {artist.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 pb-4">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-4xl font-bold text-white">{artist.name}</h1>
                {artist.featured && (
                  <Badge className="bg-yellow-500 text-black">
                    <Star className="h-3 w-3 mr-1" />
                    Destaque
                  </Badge>
                )}
              </div>
              
              <p className="text-xl text-pink-100 mb-3">{artist.specialty}</p>
              
              <div className="flex items-center space-x-4 text-white/90 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{artist.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Membro desde 2023</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-8 ${
                    isFollowing 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-white text-purple-900 hover:bg-gray-100"
                  }`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {isFollowing ? "Seguindo" : "Seguir"}
                </Button>
                
                <Button variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Mensagem
                </Button>
                
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-16 mb-8 relative z-10">
          <Card className="text-center shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-pink-500 mb-1">{artist.followers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Seguidores</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-500 mb-1">{artist.artworks}</div>
              <div className="text-sm text-gray-600">Obras</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-500 mb-1">4.9</div>
              <div className="text-sm text-gray-600">Avaliação</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-500 mb-1">156</div>
              <div className="text-sm text-gray-600">Vendas</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="artworks" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
                <TabsTrigger value="artworks" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  <Image className="h-4 w-4 mr-2" />
                  Obras ({artistArtworks.length})
                </TabsTrigger>
                <TabsTrigger value="about" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Sobre
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Avaliações
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="artworks" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {artistArtworks.map((artwork) => (
                    <Card key={artwork.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
                      <div className="relative">
                        <img 
                          src={artwork.image} 
                          alt={artwork.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 backdrop-blur-sm">
                            <Heart className="h-4 w-4 text-red-500" />
                          </Button>
                          <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 backdrop-blur-sm">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>
                        </div>

                        {artwork.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-yellow-500 text-black">
                              <Star className="h-3 w-3 mr-1" />
                              Destaque
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 group-hover:text-pink-500 transition-colors">
                          {artwork.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {artwork.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span className="text-sm">{artwork.likes}</span>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">{artwork.price}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="about" className="mt-6">
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Sobre {artist.name}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {artist.bio}
                    </p>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800">Especialidades</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-pink-300 text-pink-600">Arte Digital</Badge>
                        <Badge variant="outline" className="border-purple-300 text-purple-600">Composição</Badge>
                        <Badge variant="outline" className="border-orange-300 text-orange-600">Teoria das Cores</Badge>
                        <Badge variant="outline" className="border-green-300 text-green-600">Criatividade</Badge>
                      </div>
                      
                      <h4 className="font-semibold mt-6 text-gray-800">Ferramentas Utilizadas</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-pink-100 text-pink-700">Photoshop</Badge>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">Illustrator</Badge>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">Procreate</Badge>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Figma</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <Card key={review} className="bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={`https://images.unsplash.com/photo-150${review}134249126-9f3755a50d78?w=50&h=50&fit=crop&crop=face`} />
                            <AvatarFallback className="bg-gradient-to-r from-pink-400 to-purple-500 text-white">
                              U{review}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold text-gray-800">Usuario {review}</span>
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600">
                              Trabalho incrível! A criatividade e técnica são excepcionais. 
                              Definitivamente recomendo este artista talentoso.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-gray-800">Contato</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-gray-200 text-gray-600 hover:text-pink-500 hover:border-pink-300">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-200 text-gray-600 hover:text-pink-500 hover:border-pink-300">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-200 text-gray-600 hover:text-pink-500 hover:border-pink-300">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Work */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-gray-800">Obra em Destaque</h3>
                {artistArtworks.filter(a => a.featured)[0] && (
                  <div className="space-y-3">
                    <img 
                      src={artistArtworks.filter(a => a.featured)[0].image}
                      alt="Featured work"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <h4 className="font-medium text-gray-800">{artistArtworks.filter(a => a.featured)[0].title}</h4>
                    <p className="text-sm text-gray-600">
                      {artistArtworks.filter(a => a.featured)[0].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-700">
                        {artistArtworks.filter(a => a.featured)[0].price}
                      </Badge>
                      <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Similar Artists */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-gray-800">Artistas Similares</h3>
                <div className="space-y-3">
                  {mockArtists.filter(a => a.id !== artist.id).slice(0, 3).map((similarArtist) => (
                    <Link key={similarArtist.id} to={`/artist/${similarArtist.id}`}>
                      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-pink-50 transition-colors">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={similarArtist.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-pink-400 to-purple-500 text-white">
                            {similarArtist.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate text-gray-800">{similarArtist.name}</p>
                          <p className="text-xs text-gray-500">{similarArtist.specialty}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;