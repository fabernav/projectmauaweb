import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
// Importando as imagens
import transporteMaua from "../../assets/images/transporteMaua.png";

export const ForgotPassword = (): JSX.Element => {
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
        
        {/* Title */}
        <h1 className="absolute top-[200px] left-[75px] [font-family:'League_Spartan',Helvetica] font-semibold text-black text-5xl">
          Recuperar Senha
        </h1>

        {/* Description */}
        <p className="absolute top-[280px] left-[75px] [font-family:'League_Spartan',Helvetica] text-black text-2xl max-w-[580px]">
          Digite seu e-mail cadastrado para receber as instruções de recuperação de senha.
        </p>

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

        {/* Submit button */}
        <div className="absolute w-[456px] h-[75px] top-[524px] left-[146px]">
          <Button className="w-[454px] h-[75px] bg-[#0152a4] rounded-[50px] [font-family:'League_Spartan',Helvetica] font-semibold text-white text-5xl hover:bg-[#0152a4]/90">
            Enviar
          </Button>
        </div>

        {/* Back to login link */}
        <button 
          onClick={() => navigate("/")}
          className="absolute top-[640px] left-[75px] [font-family:'League_Spartan',Helvetica] font-semibold text-black text-[32px] tracking-[0] leading-[normal] whitespace-nowrap hover:underline"
        >
          Voltar para o login
        </button>
      </div>
    </div>
  );
};