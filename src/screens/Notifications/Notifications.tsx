import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export const Notifications = (): JSX.Element => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("warning");

  const handleSubmit = () => {
    // Here you would handle the notification submission
    console.log({ title, description, type });
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
              Nova Notificação
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-[#d9d9d9] rounded-[25px] p-8">
          {/* Title input */}
          <div className="mb-6">
            <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da notificação..."
              className="w-full p-4 rounded-lg bg-white border-none [font-family:'League_Spartan',Helvetica] text-xl focus:ring-2 focus:ring-[#0152a4]"
            />
          </div>

          {/* Description textarea */}
          <div className="mb-6">
            <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 100))}
              placeholder="Digite sua mensagem aqui..."
              className="w-full h-32 p-4 rounded-lg bg-white border-none [font-family:'League_Spartan',Helvetica] text-xl resize-none focus:ring-2 focus:ring-[#0152a4]"
              maxLength={100}
            />
            <p className="text-right text-gray-600 mt-1">
              {description.length}/100 caracteres
            </p>
          </div>

          {/* Notification type buttons */}
          <div className="mb-8">
            <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
              Tipo de Notificação
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setType("warning")}
                className={`px-6 py-3 rounded-lg [font-family:'League_Spartan',Helvetica] font-semibold text-xl ${
                  type === "warning"
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-yellow-500"
                }`}
              >
                Aviso
              </button>
              <button
                onClick={() => setType("alert")}
                className={`px-6 py-3 rounded-lg [font-family:'League_Spartan',Helvetica] font-semibold text-xl ${
                  type === "alert"
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-500"
                }`}
              >
                Alerta
              </button>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#0152a4] text-white hover:bg-[#0152a4]/90 [font-family:'League_Spartan',Helvetica] font-semibold text-2xl py-4 rounded-[50px]"
          >
            Enviar Notificação
          </Button>
        </div>
      </main>
    </div>
  );
};