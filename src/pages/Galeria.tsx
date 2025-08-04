
import React, { useEffect, useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { formatDate } from '../utils/formatUtils';
import { Image, Calendar } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";

interface Foto {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  url: string;
  ano: string;
  mes: string;
}

const Galeria: React.FC = () => {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/galeria.json');
        const data = await res.json();
        const sortedFotos = data.sort(
          (a: Foto, b: Foto) => new Date(b.data).getTime() - new Date(a.data).getTime()
        );
        setFotos(sortedFotos);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar galeria:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group photos by event (same title and date)
  const agruparPorEvento = (fotos: Foto[]) => {
    const eventos: Record<string, Foto[]> = {};
    
    fotos.forEach(foto => {
      // Create a unique key for each event based on title and date
      const dataObj = new Date(foto.data);
      const chaveEvento = `${foto.titulo}-${dataObj.toISOString().split('T')[0]}`;
      
      if (!eventos[chaveEvento]) {
        eventos[chaveEvento] = [];
      }
      
      eventos[chaveEvento].push(foto);
    });
    
    return eventos;
  };

  // Group photos by month/year
  const agruparPorMesAno = (fotos: Foto[]) => {
    const grupos: Record<string, Foto[]> = {};
    
    fotos.forEach(foto => {
      const chave = `${foto.ano}-${foto.mes}`;
      
      if (!grupos[chave]) {
        grupos[chave] = [];
      }
      
      grupos[chave].push(foto);
    });
    
    return grupos;
  };
  
  const fotosAgrupadas = agruparPorMesAno(fotos);
  
  // Get month name
  const getNomeMes = (mes: string) => {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    return meses[parseInt(mes) - 1];
  };

  // Modal state for enlarged photo view
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFoto, setSelectedFoto] = useState<Foto | null>(null);

  const openModal = (foto: Foto) => {
    setSelectedFoto(foto);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <PublicLayout>
      <h1 className="text-3xl font-bold text-ampla-800 mb-6">Galeria de Fotos</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ampla-600"></div>
        </div>
      ) : fotos.length > 0 ? (
        <div className="space-y-12">
          {Object.entries(fotosAgrupadas)
            .sort(([a], [b]) => b.localeCompare(a)) // Sort by date (newest first)
            .map(([mesAno, fotos]) => {
              const [ano, mes] = mesAno.split('-');
              const eventosPorMes = agruparPorEvento(fotos);
              
              return (
                <div key={mesAno} className="mb-16">
                  <h2 className="text-xl font-bold text-ampla-800 mb-6 flex items-center">
                    <Calendar className="mr-2" />
                    {getNomeMes(mes)} de {ano}
                  </h2>
                  
                  <div className="space-y-10">
                    {Object.entries(eventosPorMes).map(([eventoChave, eventoFotos]) => {
                      // Use the first photo for the event details
                      const primeiraFoto = eventoFotos[0];
                      
                      return (
                        <div key={eventoChave} className="bg-white rounded-lg shadow-lg overflow-hidden">
                          <div className="p-4 bg-ampla-50">
                            <h3 className="font-bold text-lg text-ampla-800">{primeiraFoto.titulo}</h3>
                            <p className="text-sm text-gray-500 flex items-center mb-2">
                              <Calendar size={14} className="mr-1" />
                              {formatDate(primeiraFoto.data)}
                            </p>
                            <p className="text-gray-700">{primeiraFoto.descricao}</p>
                          </div>

                          {eventoFotos.length > 1 ? (
                            <div className="p-6 bg-white">
                              <Carousel className="w-full">
                                <CarouselContent>
                                  {eventoFotos.map((foto) => (
                                    <CarouselItem key={foto.id} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                                      <div 
                                        className="h-48 overflow-hidden cursor-pointer rounded-lg mx-2"
                                        onClick={() => openModal(foto)}
                                      >
                                        <img
                                          src={foto.url}
                                          alt={foto.titulo}
                                          className="w-full h-full object-cover transition-transform hover:scale-105"
                                          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
                                        />
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-0" />
                                <CarouselNext className="right-0" />
                              </Carousel>
                            </div>
                          ) : (
                            <div 
                              className="h-64 overflow-hidden cursor-pointer"
                              onClick={() => openModal(primeiraFoto)}
                            >
                              <img
                                src={primeiraFoto.url}
                                alt={primeiraFoto.titulo}
                                className="w-full h-full object-cover transition-transform hover:scale-105"
                                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="text-center py-10">
          <Image className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhuma foto disponível</h3>
          <p className="mt-2 text-gray-500">Não há fotos disponíveis no momento.</p>
        </div>
      )}
      
      {/* Modal for enlarged photo view */}
      {modalOpen && selectedFoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="max-w-5xl w-full bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img
                src={selectedFoto.url}
                alt={selectedFoto.titulo}
                className="w-full max-h-[80vh] object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
              />
              <button 
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
                onClick={closeModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-ampla-800">{selectedFoto.titulo}</h3>
              <p className="text-sm text-gray-500 mt-1">{formatDate(selectedFoto.data)}</p>
              {selectedFoto.descricao && (
                <p className="text-gray-700 mt-2">{selectedFoto.descricao}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
};

export default Galeria;
