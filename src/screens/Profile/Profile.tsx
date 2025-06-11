import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

// Importando as imagens
import closeEyes from "../../assets/images/closeEyes.png";
import openEyes from "../../assets/images/openEyes.png";

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-[#0152a4] p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="text-white text-2xl [font-family:'League_Spartan',Helvetica] font-semibold"
            >
              ←
            </button>
            <h1 className="text-white text-4xl [font-family:'League_Spartan',Helvetica] font-semibold">
              Perfil
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-[#d9d9d9] rounded-[25px] p-8">
          <div className="space-y-6">
            {/* Name input */}
            <div>
              <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
                Nome Completo
              </label>
              <Card className="w-full bg-white rounded-lg border-none">
                <CardContent className="p-0">
                  <Input
                    type="text"
                    value="João da Silva"
                    readOnly
                    className="w-full p-4 bg-transparent border-none [font-family:'League_Spartan',Helvetica] text-xl focus:ring-2 focus:ring-[#0152a4]"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Email input */}
            <div>
              <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
                E-mail
              </label>
              <Card className="w-full bg-white rounded-lg border-none">
                <CardContent className="p-0">
                  <Input
                    type="email"
                    value="joao.silva@example.com"
                    readOnly
                    className="w-full p-4 bg-transparent border-none [font-family:'League_Spartan',Helvetica] text-xl focus:ring-2 focus:ring-[#0152a4]"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Password input */}
            <div>
              <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
                Senha
              </label>
              <Card className="w-full bg-white rounded-lg border-none">
                <CardContent className="p-0 flex items-center">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value="123@senha"
                    readOnly
                    className="w-full p-4 bg-transparent border-none [font-family:'League_Spartan',Helvetica] text-xl focus:ring-2 focus:ring-[#0152a4]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-2 ml-2 focus:outline-none"
                  >
                    <img
                      src={showPassword ? openEyes : closeEyes}
                      alt={showPassword ? "Mostrar senha" : "Ocultar senha"}
                      className="w-8 h-8"
                    />
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* Change password button */}
            <Button
              onClick={() => navigate("/forgot-password")}
              className="w-full bg-[#0152a4] text-white hover:bg-[#0152a4]/90 [font-family:'League_Spartan',Helvetica] font-semibold text-2xl py-4 rounded-[50px]"
            >
              Alterar Senha
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
