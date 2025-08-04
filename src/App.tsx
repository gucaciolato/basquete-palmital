
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicHome from "./pages/PublicHome";
import Avisos from "./pages/Avisos";
import AvisoDetalhe from "./pages/AvisoDetalhe";
import Galeria from "./pages/Galeria";
import Documentos from "./pages/Documentos";
import Atividades from "./pages/Atividades";
import Diretoria from "./pages/Diretoria";
import Calendario from "./pages/Calendario";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public home page */}
          <Route path="/" element={<PublicHome />} />
          
          {/* Content pages */}
          <Route path="/avisos" element={<Avisos />} />
          <Route path="/avisos/:id" element={<AvisoDetalhe />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/atividades" element={<Atividades />} />
          <Route path="/diretoria" element={<Diretoria />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/contato" element={<Contato />} />
          
          {/* Catch all route - 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
