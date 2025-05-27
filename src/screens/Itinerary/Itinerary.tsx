import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface VanItem {
  id: number;
  placa: string;
  tipo: string;
  capacidade: number;
  ativo: boolean;
}

interface HorarioItem {
  id: number;
  vanId: number;
  tipoVeiculo: string;
  saidaDa: string;
  horario: string;
  diaDaSemana: string;
  placa: string;
}

export const Itinerary = (): JSX.Element => {
  const navigate = useNavigate();
  const [saidaDe, setSaidaDe] = useState("FACULDADE");
  const [diaDaSemana, setDiaDaSemana] = useState("SEGUNDA");
  const [horario, setHorario] = useState("07:00");
  const [vanId, setVanId] = useState<number | null>(null);
  const [horarios, setHorarios] = useState<HorarioItem[]>([]);
  const [vans, setVans] = useState<VanItem[]>([]);
  const [loading, setLoading] = useState(false);

  const diasDaSemana = {
    SEGUNDA: "Segunda-feira",
    TERCA: "Terça-feira",
    QUARTA: "Quarta-feira",
    QUINTA: "Quinta-feira",
    SEXTA: "Sexta-feira",
    SABADO: "Sábado",
    DOMINGO: "Domingo",
  };

  const origens = {
    FACULDADE: "Mauá → Estação",
    ESTACAO: "Estação → Mauá",
  };

  useEffect(() => {
    loadHorarios();
    loadVans();
  }, [saidaDe, diaDaSemana]);

  const loadHorarios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/horarios/origem/${saidaDe}/dia/${diaDaSemana}`
      );
      // Garantindo que response.data é um array
      const horariosData = Array.isArray(response.data) ? response.data : [];
      setHorarios(horariosData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar horários:", error);
      toast.error("Erro ao carregar os horários");
      setLoading(false);
      // Definir horarios como um array vazio em caso de erro
      setHorarios([]);
    }
  };

  const loadVans = async () => {
    try {
      const response = await axios.get("/api/vans?ativo=true");
      // Garanta que response.data é um array
      const vansData = Array.isArray(response.data) ? response.data : [];
      setVans(vansData);

      // Selecionar a primeira van por padrão se houver
      if (vansData.length > 0 && !vanId) {
        setVanId(vansData[0].id);
      }
    } catch (error) {
      console.error("Erro ao carregar vans:", error);
      toast.error("Erro ao carregar as vans disponíveis");
      // Inicialize vans como um array vazio em caso de erro
      setVans([]);
    }
  };

  const handleSubmit = async () => {
    if (!vanId) {
      toast.error("Selecione uma van");
      return;
    }

    try {
      const newHorario = {
        vanId,
        saidaDa: saidaDe,
        horario,
        diaDaSemana,
      };

      await axios.post("/api/horarios", newHorario);
      toast.success("Horário adicionado com sucesso!");
      loadHorarios();
    } catch (error) {
      console.error("Erro ao adicionar horário:", error);
      toast.error("Erro ao adicionar o horário");
    }
  };

  const deleteHorario = async (id: number) => {
    if (window.confirm("Tem certeza que deseja remover este horário?")) {
      try {
        await axios.delete(`/api/horarios/${id}`);
        toast.success("Horário removido com sucesso!");
        loadHorarios();
      } catch (error) {
        console.error("Erro ao remover horário:", error);
        toast.error("Erro ao remover o horário");
      }
    }
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
              Gerenciar Horários
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-[#d9d9d9] rounded-[25px] p-8">
          {/* Saída de input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
                Origem
              </label>
              <select
                value={saidaDe}
                onChange={(e) => setSaidaDe(e.target.value)}
                className="w-full p-4 rounded-lg bg-white border-none [font-family:'League_Spartan',Helvetica] text-xl focus:ring-2 focus:ring-[#0152a4]"
              >
                <option value="FACULDADE">Mauá → Estação</option>
                <option value="ESTACAO">Estação → Mauá</option>
              </select>
            </div>

            {/* Dia da semana selection */}
            <div>
              <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-2">
                Dia da Semana
              </label>
              <select
                value={diaDaSemana}
                onChange={(e) => setDiaDaSemana(e.target.value)}
                className="w-full p-4 rounded-lg bg-white border-none [font-family:'League_Spartan',Helvetica] text-xl focus:ring-2 focus:ring-[#0152a4]"
              >
                <option value="SEGUNDA">Segunda-feira</option>
                <option value="TERCA">Terça-feira</option>
                <option value="QUARTA">Quarta-feira</option>
                <option value="QUINTA">Quinta-feira</option>
                <option value="SEXTA">Sexta-feira</option>
                <option value="SABADO">Sábado</option>
                <option value="DOMINGO">Domingo</option>
              </select>
            </div>
          </div>

          {/* Tabela de horários existentes */}
          <div className="mt-8">
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-4">
              Horários Existentes
            </h2>

            {loading ? (
              <p className="text-center py-4">Carregando horários...</p>
            ) : !Array.isArray(horarios) || horarios.length === 0 ? (
              <div className="bg-slate-100 rounded-lg p-6 flex flex-col items-center justify-center">
                <AlertCircle className="h-12 w-12 text-slate-400 mb-2" />
                <p className="text-slate-500 text-lg">
                  Nenhum horário cadastrado para esta origem e dia.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="py-3 px-4 text-left [font-family:'League_Spartan',Helvetica] font-semibold">
                        Veículo
                      </th>
                      <th className="py-3 px-4 text-left [font-family:'League_Spartan',Helvetica] font-semibold">
                        Placa
                      </th>
                      <th className="py-3 px-4 text-left [font-family:'League_Spartan',Helvetica] font-semibold">
                        Horário
                      </th>
                      <th className="py-3 px-4 text-center [font-family:'League_Spartan',Helvetica] font-semibold">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Verificar se horarios é um array antes de mapear */}
                    {Array.isArray(horarios) &&
                      horarios.map((item) => (
                        <tr key={item.id} className="border-b border-slate-100">
                          <td className="py-3 px-4 [font-family:'League_Spartan',Helvetica]">
                            {item.tipoVeiculo === "VAN"
                              ? "Van"
                              : "Micro-ônibus"}
                          </td>
                          <td className="py-3 px-4 [font-family:'League_Spartan',Helvetica]">
                            {item.placa}
                          </td>
                          <td className="py-3 px-4 [font-family:'League_Spartan',Helvetica]">
                            {item.horario}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              onClick={() => deleteHorario(item.id)}
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Formulário de adição de novo horário */}
          <div className="mt-8 bg-white rounded-lg p-6">
            <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-4">
              Adicionar Novo Horário
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-lg mb-2">
                  Selecionar Van
                </label>
                <select
                  value={vanId || ""}
                  onChange={(e) => setVanId(parseInt(e.target.value))}
                  className="w-full p-3 rounded-lg bg-slate-50 border-slate-200 [font-family:'League_Spartan',Helvetica] text-lg"
                >
                  <option value="">Selecione uma van</option>
                  {/* Verificar se vans é um array antes de mapear */}
                  {Array.isArray(vans) && vans.length > 0 ? (
                    vans.map((van) => (
                      <option key={van.id} value={van.id}>
                        {van.placa} -{" "}
                        {van.tipo === "VAN" ? "Van" : "Micro-ônibus"}(
                        {van.capacidade} lugares)
                      </option>
                    ))
                  ) : (
                    <option disabled>Nenhuma van disponível</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-lg mb-2">
                  Horário de Partida
                </label>
                <input
                  type="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-50 border-slate-200 [font-family:'League_Spartan',Helvetica] text-lg"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="mt-6 bg-[#0152a4] text-white hover:bg-[#0143ad] [font-family:'League_Spartan',Helvetica] font-semibold text-xl py-3 px-6 rounded-[50px] flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Adicionar Horário
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
