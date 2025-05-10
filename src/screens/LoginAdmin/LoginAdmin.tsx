import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const LoginAdmin = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1440px] h-[1024px] relative">
        {/* Blue background on the right side */}
        <div className="absolute w-[727px] h-[1024px] top-0 left-[727px] bg-[#0152a4]" />

        {/* Password input */}
        <div className="absolute w-[580px] h-24 top-[476px] left-[77px]">
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

        {/* Login button */}
        <div className="absolute w-[456px] h-[75px] top-[695px] left-[146px]">
          <Button 
            onClick={() => navigate("/home")}
            className="w-[454px] h-[75px] bg-[#0152a4] rounded-[50px] [font-family:'League_Spartan',Helvetica] font-semibold text-white text-5xl hover:bg-[#0152a4]/90"
          >
            Entrar
          </Button>
        </div>

        {/* Forgot password link */}
        <button 
          onClick={() => navigate("/forgot-password")}
          className="absolute top-[610px] left-[407px] [font-family:'League_Spartan',Helvetica] font-semibold text-black text-[32px] tracking-[0] leading-[normal] whitespace-nowrap hover:underline"
        >
          Esqueci a senha
        </button>

        {/* Register link */}
        <button 
          onClick={() => navigate("/register")}
          className="absolute top-[811px] left-[131px] [font-family:'League_Spartan',Helvetica] font-semibold text-black text-[32px] tracking-[0] leading-[normal] whitespace-nowrap hover:underline"
        >
          Não tem conta? Faça seu cadastro
        </button>

        {/* Email input */}
        <div className="absolute w-[583px] h-[97px] top-[337px] left-[75px]">
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
      </div>
    </div>
  );
};