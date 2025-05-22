import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const Help = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
          {/* Header */}
          <header className="bg-[#0152a4] p-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-">
                <button
                  onClick={() => navigate("/home")}
                  className="text-white text-2xl [font-family:'League_Spartan',Helvetica] font-semibold"
                >
                  ← 
                </button>
                <h1 className="text-white text-4xl [font-family:'League_Spartan',Helvetica] font-semibold">
                  Ajuda
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
                Suporte e comunicação
              </h2>
              <div className="bg-[#d9d9d9] rounded-[25px] p-6 flex justify-center">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-20 flex flex-col items-center justify-center min-h-[320px] w-full max-w-3x1 mx-auto">
                    <h3 className="[font-family:'League_Spartan',Helvetica] font-bold text-5xl text-center mb-8 mt-0">
                      Central de ajuda
                    </h3>
                    <p className="text-gray-700 text-xl text-center font-medium">
                      O suporte e comunicação somente estará disponível para acionar os proprietários do projeto
                    </p>
                    <div className="h-4" />
                <p className="text-gray-700 text-lg text-center font-bold mt-5">
                    Atendimento suporte → {" "}
                    <span className="bg-[#0152a4] text-white px-3 py-1 rounded">
                        (11) 99843-4610
                    </span>
                </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
  );
};