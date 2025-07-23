import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-pink-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SA</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                SpaceArt
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              A plataforma definitiva para artistas compartilharem suas criações. 
              Conecte-se com uma comunidade apaixonada por arte e criatividade.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-pink-500">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Navegação</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Início
              </Link>
              <Link to="/gallery" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Galeria
              </Link>
              <Link to="/upload" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Enviar Arte
              </Link>
              <Link to="/artists" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Artistas
              </Link>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Suporte</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Central de Ajuda
              </a>
              <a href="#" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="block text-gray-600 hover:text-pink-500 transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold mb-2 text-gray-800">Fique por dentro das novidades</h3>
              <p className="text-gray-600">
                Receba as últimas obras e novidades da comunidade SpaceArt diretamente no seu email.
              </p>
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Seu email..."
                className="flex-1 border-gray-200 focus:border-pink-500"
              />
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                Inscrever
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2024 SpaceArt. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              São Paulo, Brasil
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              +55 11 9999-9999
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;