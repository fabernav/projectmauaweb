import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export const Home = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-[#0152a4] p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-4xl [font-family:'League_Spartan',Helvetica] font-semibold">
            Mauá Moove
          </h1>
          <Button
            onClick={() => navigate("/")}
            className="bg-white text-[#0152a4] hover:bg-white/90 [font-family:'League_Spartan',Helvetica] font-semibold px-8 py-2 text-xl"
          >
            Sair
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Menu cards */}
          <div
            onClick={() => navigate("/dashboard")}
            className="bg-[#d9d9d9] rounded-[25px] p-6 cursor-pointer hover:bg-[#c9c9c9] transition-colors"
          >
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Dashboard
            </h2>
            <p className="text-gray-600">
              Visualize estatísticas e informações gerais
            </p>
          </div>

          <div
            onClick={() => navigate("/profile")}
            className="bg-[#d9d9d9] rounded-[25px] p-6 cursor-pointer hover:bg-[#c9c9c9] transition-colors"
          >
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Perfil
            </h2>
            <p className="text-gray-600">Gerencie suas informações pessoais</p>
          </div>

          <div
            onClick={() => navigate("/itinerary")}
            className="bg-[#d9d9d9] rounded-[25px] p-6 cursor-pointer hover:bg-[#c9c9c9] transition-colors"
          >
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Itinerário
            </h2>
            <p className="text-gray-600">Gerencie os itinerários e rotas</p>
          </div>

          <div
            onClick={() => navigate("/GerenciarVans")}
            className="bg-[#d9d9d9] rounded-[25px] p-6 cursor-pointer hover:bg-[#c9c9c9] transition-colors"
          >
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Gerenciar Vans
            </h2>
            <p className="text-gray-600">Gerencie as Vans</p>
          </div>

          <div
            onClick={() => navigate("/config")}
            className="bg-[#d9d9d9] rounded-[25px] p-6 cursor-pointer hover:bg-[#c9c9c9] transition-colors"
          >
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Configurações
            </h2>
            <p className="text-gray-600">Ajuste as configurações do sistema</p>
          </div>

          <div
            onClick={() => navigate("/notifications")}
            className="bg-[#d9d9d9] rounded-[25px] p-6 cursor-pointer hover:bg-[#c9c9c9] transition-colors"
          >
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Notificações
            </h2>
            <p className="text-gray-600">Gerencie as notificações do sistema</p>
          </div>

          <div
            onClick={() => navigate("/help")}
            className="bg-[#d9d9d9] rounded-[25px] p-6 cursor-pointer hover:bg-[#c9c9c9] transition-colors"
          >
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Ajuda
            </h2>
            <p className="text-gray-600">Acesse o suporte e documentação</p>
          </div>
        </div>
      </main>
    </div>
  );
};
