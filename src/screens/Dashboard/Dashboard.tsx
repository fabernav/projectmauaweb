import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();

  // Valores fixos para o dashboard
  const totalVans = 5;
  const vansAtivas = 4;
  const totalUsuarios = 13;

  // Lista de vans predefinida
  const listaVans = [
    { id: 1, nome: "Van #1", status: "Ativa" },
    { id: 2, nome: "Van #2", status: "Em manutenção" },
    { id: 3, nome: "Van #3", status: "Ativa" },
    { id: 4, nome: "Van #4", status: "Ativa" },
    { id: 5, nome: "Van #5", status: "Inativa" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-[#0152a4] p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="text-white text-3xl [font-family:'League_Spartan',Helvetica] font-semibold"
            >
              ←
            </button>
            <h1 className="text-white text-4xl [font-family:'League_Spartan',Helvetica] font-semibold">
              Dashboard
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards de estatísticas */}
          <div className="bg-[#d9d9d9] rounded-[25px] p-6">
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Total de Vans
            </h2>
            <p className="text-4xl font-bold text-[#0152a4]">{totalVans}</p>
          </div>

          <div className="bg-[#d9d9d9] rounded-[25px] p-6">
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Vans Ativas
            </h2>
            <p className="text-4xl font-bold text-[#0152a4]">{vansAtivas}</p>
          </div>

          <div className="bg-[#d9d9d9] rounded-[25px] p-6">
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Total de Usuários
            </h2>
            <p className="text-4xl font-bold text-[#0152a4]">{totalUsuarios}</p>
          </div>
        </div>
      </main>
    </div>
  );
};
