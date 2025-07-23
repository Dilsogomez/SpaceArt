import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Progress } from "../components/ui/progress";
import { mockCategories } from "../mock";
import { Upload as UploadIcon, X, Image, FileText, Tag, DollarSign, Eye, Palette, Check } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Upload = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    price: "",
    isForSale: false,
    file: null
  });

  const [currentTag, setCurrentTag] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadedFile(file);
            setFormData({ ...formData, file });
            setStep(2);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = () => {
    setStep(4);
    setTimeout(() => {
      toast({
        title: "Obra enviada com sucesso!",
        description: "Sua arte foi publicada na galeria e está disponível para a comunidade.",
      });
    }, 1000);
  };

  const getStepIcon = (stepNumber) => {
    if (step > stepNumber) return <Check className="h-5 w-5 text-white" />;
    return <span className="text-white font-semibold">{stepNumber}</span>;
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Palette className="h-6 w-6 text-pink-500 mr-2 animate-spin" />
            <Badge variant="outline" className="border-pink-300 text-pink-600">Criar Arte</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Compartilhe Sua Criatividade
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transforme suas ideias em arte e inspire a comunidade SpaceArt com sua visão única
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {[
              { number: 1, title: "Upload", icon: UploadIcon },
              { number: 2, title: "Detalhes", icon: FileText },
              { number: 3, title: "Revisão", icon: Eye },
              { number: 4, title: "Publicado", icon: Check }
            ].map((stepItem, index) => (
              <React.Fragment key={stepItem.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step >= stepItem.number 
                      ? "bg-gradient-to-r from-pink-500 to-purple-600" 
                      : "bg-gray-200"
                  } transition-colors duration-300`}>
                    {getStepIcon(stepItem.number)}
                  </div>
                  <span className={`text-sm mt-2 ${
                    step >= stepItem.number ? "text-pink-500 font-medium" : "text-gray-500"
                  }`}>
                    {stepItem.title}
                  </span>
                </div>
                {index < 3 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step > stepItem.number ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-gray-200"
                  } transition-colors duration-300`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: File Upload */}
          {step === 1 && (
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-gray-800">Selecione sua Obra de Arte</CardTitle>
                <p className="text-gray-600">
                  Formatos aceitos: JPG, PNG, GIF, WebP (máx. 10MB)
                </p>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="border-2 border-dashed border-pink-300 rounded-xl p-12 text-center hover:border-pink-500 transition-colors duration-300 relative bg-gradient-to-br from-pink-50 to-purple-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  
                  {!isUploading ? (
                    <div>
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UploadIcon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">Clique para fazer upload</h3>
                      <p className="text-gray-600">ou arraste e solte sua imagem aqui</p>
                    </div>
                  ) : (
                    <div>
                      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UploadIcon className="h-8 w-8 text-pink-500 animate-pulse" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Fazendo upload...</h3>
                      <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
                      <p className="text-sm text-gray-600 mt-2">{uploadProgress}% concluído</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Details Form */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Detalhes da Obra</CardTitle>
                  <p className="text-gray-600">
                    Preencha as informações para destacar sua criação
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title" className="text-base font-semibold text-gray-800">Título da Obra *</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Explosão de Cores Vibrantes"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-2 border-gray-200 focus:border-pink-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className="text-base font-semibold text-gray-800">Descrição *</Label>
                    <Textarea
                      id="description"
                      placeholder="Conte a história por trás da sua criação, técnicas utilizadas, inspiração..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-2 min-h-[120px] border-gray-200 focus:border-pink-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <Label className="text-base font-semibold text-gray-800">Categoria *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className="mt-2 border-gray-200 focus:border-pink-500">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags */}
                  <div>
                    <Label className="text-base font-semibold text-gray-800">Tags</Label>
                    <div className="mt-2 space-y-3">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Ex: abstrato, colorido, moderno..."
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          className="border-gray-200 focus:border-pink-500"
                        />
                        <Button onClick={addTag} variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
                          <Tag className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="px-3 py-1 bg-pink-100 text-pink-700">
                              #{tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="ml-2 hover:text-red-500"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <Label className="text-base font-semibold text-gray-800">Preço (opcional)</Label>
                    <div className="mt-2 relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="pl-10 border-gray-200 focus:border-pink-500"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Deixe em branco se não for para venda
                    </p>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 border-gray-200 text-gray-600"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                      disabled={!formData.title || !formData.description || !formData.category}
                    >
                      Continuar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Preview</CardTitle>
                  <p className="text-gray-600">
                    Veja como sua obra aparecerá na galeria
                  </p>
                </CardHeader>
                <CardContent>
                  {uploadedFile && (
                    <div className="group overflow-hidden border-0 shadow-lg rounded-xl">
                      <div className="relative">
                        <img 
                          src={URL.createObjectURL(uploadedFile)} 
                          alt="Preview"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">
                          {formData.title || "Título da Obra"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {formData.description || "Descrição da obra..."}
                        </p>
                        {formData.category && (
                          <Badge variant="secondary" className="mb-2 bg-purple-100 text-purple-700">
                            {formData.category}
                          </Badge>
                        )}
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {formData.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs border-gray-300 text-gray-600">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Por Você</span>
                          {formData.price && (
                            <Badge className="bg-green-100 text-green-700">
                              R$ {formData.price}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-800">Revisar e Publicar</CardTitle>
                <p className="text-gray-600">
                  Confirme todos os detalhes antes de publicar sua obra
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image Preview */}
                  <div>
                    <img 
                      src={URL.createObjectURL(uploadedFile)} 
                      alt="Final preview"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                  </div>

                  {/* Details Summary */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-600">Título</h3>
                      <p className="text-lg text-gray-800">{formData.title}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold text-gray-600">Descrição</h3>
                      <p className="text-gray-600">{formData.description}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold text-gray-600">Categoria</h3>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">{formData.category}</Badge>
                    </div>

                    {formData.tags.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold text-gray-600">Tags</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="border-gray-300 text-gray-600">#{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {formData.price && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold text-gray-600">Preço</h3>
                          <p className="text-lg font-bold text-green-600">R$ {formData.price}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4 pt-8">
                  <Button
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="flex-1 border-gray-200 text-gray-600"
                  >
                    Editar Detalhes
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Publicar Obra
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <Card className="shadow-2xl border-0 text-center bg-white">
              <CardContent className="py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Obra Publicada com Sucesso! 🎉</h2>
                <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                  Sua criação foi enviada para a galeria SpaceArt e está disponível para toda a comunidade. 
                  Prepare-se para receber curtidas, comentários e reconhecimento!
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  >
                    Ver na Galeria
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-gray-200 text-gray-600"
                    onClick={() => {
                      setStep(1);
                      setFormData({
                        title: "",
                        description: "",
                        category: "",
                        tags: [],
                        price: "",
                        isForSale: false,
                        file: null
                      });
                      setUploadedFile(null);
                    }}
                  >
                    Enviar Outra Obra
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;