import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Menu, X, Upload, User, Heart } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Galeria", href: "/gallery" },
    { name: "Upload", href: "/upload" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              SpaceArt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-pink-500 ${
                  isActive(item.href)
                    ? "text-pink-500 border-b-2 border-pink-500"
                    : "text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar arte ou artistas..."
                className="pl-10 w-64 bg-gray-50/50 border-gray-200"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500">
                <User className="h-5 w-5" />
              </Button>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Enviar Arte
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar arte ou artistas..."
                  className="pl-10 bg-gray-50/50 border-gray-200"
                />
              </div>
              
              {/* Mobile Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium py-2 transition-colors ${
                    isActive(item.href)
                      ? "text-pink-500"
                      : "text-gray-600 hover:text-pink-500"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                <Button variant="outline" className="flex-1 border-gray-200 text-gray-600">
                  <Heart className="h-4 w-4 mr-2" />
                  Favoritos
                </Button>
                <Button variant="outline" className="flex-1 border-gray-200 text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  Perfil
                </Button>
              </div>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full text-white">
                <Upload className="h-4 w-4 mr-2" />
                Enviar Arte
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;