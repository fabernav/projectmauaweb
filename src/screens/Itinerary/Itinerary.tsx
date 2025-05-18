import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";



export const Itinerary = (): JSX.Element => {
  const navigate = useNavigate();
  const [route, setRoute] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("monday");
  const [description, setDescription] = useState("");
  const [itinerary, setItinerary] = useState("");

  const handleSubmit = () => {
    // Here you would handle the itinerary update submission
    console.log({ route, dayOfWeek, description });
  };

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
              Atualizar Itinerário
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-[#d9d9d9] rounded-[25px] p-8">
          {/* Route input */}
          <div className="mb-6">
            <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Rota
            </label>
            <select
              value={itinerary}
              onChange={(e) => setItinerary(e.target.value)}
              className="w-full p-4 rounded-lg bg-white border-none [font-family:'League_Spartan',Helvetica] text-xl focus:ring-2 focus:ring-[#0152a4]"
            >
              <option value="monday">Mauá ➔ Sacomã</option>
              <option value="tuesday">Sacomã ➔ Mauá</option>
            </select>
          </div>

          {/* Day of week selection */}
          <div className="mb-6">
            <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Dia da Semana
            </label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full p-4 rounded-lg bg-white border-none [font-family:'League_Spartan',Helvetica] text-xl focus:ring-2 focus:ring-[#0152a4]"
            >
              <option value="monday">Segunda-feira</option>
              <option value="tuesday">Terça-feira</option>
              <option value="wednesday">Quarta-feira</option>
              <option value="thursday">Quinta-feira</option>
              <option value="friday">Sexta-feira</option>
              <option value="saturday">Sábado</option>
              <option value="sunday">Domingo</option>
            </select>
          </div>

          {/* Description textarea */}
          <div className="mb-8">
            <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Descrição da Alteração
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição da alteração no itinerário..."
              className="w-full h-32 p-4 rounded-lg bg-white border-none [font-family:'League_Spartan',Helvetica] text-xl resize-none focus:ring-2 focus:ring-[#0152a4]"
            />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-yellow-500 text-white hover:bg-yellow-600 [font-family:'League_Spartan',Helvetica] font-semibold text-2xl py-4 rounded-[50px]"
            >
              Enviar Aviso
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};