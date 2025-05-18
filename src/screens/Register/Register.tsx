import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

// Importando as imagens
import transporteMaua from "../../assets/images/transporteMaua.png";

export const Register = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1440px] h-[1024px] relative">
        {/* Blue background on the right side */}
        <div className="absolute w-[727px] h-[1024px] top-0 left-[727px] bg-[#0152a4]">
          <img
            src={transporteMaua}
            alt="Transporte Mauá"
            className="w-full h-full object-cover pointer-events-none select-none"
            style={{ filter: "brightness(0.7)" }}
          />
        </div>

        {/* Name input */}
        <div className="absolute w-[583px] h-[97px] top-[250px] left-[75px]">
          <Card className="w-[581px] h-[97px] bg-[#d9d9d9] rounded-[50px] border-none">
            <CardContent className="p-0">
              <Input
                type="text"
                placeholder="Nome completo"
                className="w-full h-[97px] bg-transparent border-none rounded-[50px] pl-[46px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#949494] text-[32px] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </CardContent>
          </Card>
        </div>

        {/* Email input */}
        <div className="absolute w-[583px] h-[97px] top-[377px] left-[75px]">
          <Card className="w-[581px] h-[97px] bg-[#d9d9d9] rounded-[50px] border-none">
            <CardContent className="p-0">
              <Input
                type="email"
                placeholder="E-mail"
                className="w-full h-[97px] bg-transparent border-none rounded-[50px] pl-[46px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#949494] text-[32px] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </CardContent>
          </Card>
        </div>

        {/* Password input */}
        <div className="absolute w-[580px] h-24 top-[504px] left-[77px]">
          <Card className="w-[578px] h-24 bg-[#d9d9d9] rounded-[50px] border-none">
            <CardContent className="p-0">
              <Input
                type="password"
                placeholder="Senha"
                className="w-full h-24 bg-transparent border-none rounded-[50px] pl-[43px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#949494] text-[32px] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </CardContent>
          </Card>
        </div>

        {/* Confirm Password input */}
        <div className="absolute w-[580px] h-24 top-[631px] left-[77px]">
          <Card className="w-[578px] h-24 bg-[#d9d9d9] rounded-[50px] border-none">
            <CardContent className="p-0">
              <Input
                type="password"
                placeholder="Confirmar senha"
                className="w-full h-24 bg-transparent border-none rounded-[50px] pl-[43px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#949494] text-[32px] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </CardContent>
          </Card>
        </div>

        {/* Register button */}
        <div className="absolute w-[456px] h-[75px] top-[758px] left-[146px]">
          <Button className="w-[454px] h-[75px] bg-[#0152a4] rounded-[50px] [font-family:'League_Spartan',Helvetica] font-semibold text-white text-5xl hover:bg-[#0152a4]/90">
            Cadastrar
          </Button>
        </div>

        {/* Back to login link */}
        <button 
          onClick={() => navigate("/")}
          className="absolute top-[874px] left-[131px] [font-family:'League_Spartan',Helvetica] font-semibold text-black text-[32px] tracking-[0] leading-[normal] whitespace-nowrap hover:underline"
        >
          Já tem conta? Faça seu login
        </button>
      </div>
    </div>
  );
};