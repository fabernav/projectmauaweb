import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const Config = (): JSX.Element => {
  const navigate = useNavigate();

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
                  Configurações
                </h1>
              </div>
            </div>
          </header>
    
          {/* Main content */}
          <main className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            </div>
    
            {/* Recent activity section */}
            <div className="mt-12">
              <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-3xl mb-6">
                Ajustes
              </h2>
              <div className="bg-[#d9d9d9] rounded-[25px] p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="bg-white rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="[font-family:'League_Spartan',Helvetica] font-semibold text-xl">
                          Usuário {item}
                        </h3>
                        <p className="text-gray-600">Última atividade: há 2 horas</p>
                      </div>
                      <Button className="bg-[#0152a4] hover:bg-[#0152a4]/90 [font-family:'League_Spartan',Helvetica] font-semibold">
                        Ver detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
  );
};