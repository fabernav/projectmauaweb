import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Users, Bus, BusFront, Bell, BarChart2 } from "lucide-react";

// Interfaces para os dados da API
interface DashboardStats {
  totalVans: number;
  vansAtivas: number;
  totalUsuarios: number;
}
interface Notification {
  id: number;
  title: string;
  type: string;
}
// Nova interface para o gráfico de horas
interface HourlyActivityData {
  hour: string;
  logins: number;
}

// Dados estáticos para o gráfico de atividade por hora
const hourlyActivityData: HourlyActivityData[] = [
  { hour: "06h", logins: 0 },

  { hour: "07h", logins: 0 },

  { hour: "08h", logins: 0 },

  { hour: "09h", logins: 2 },

  { hour: "10h", logins: 2 },

  { hour: "11h", logins: 1 },

  { hour: "12h", logins: 2 },

  { hour: "13h", logins: 3 },

  { hour: "14h", logins: 4 },

  { hour: "15h", logins: 1 },

  { hour: "16h", logins: 2 },

  { hour: "17h", logins: 3 },

  { hour: "18h", logins: 2 },

  { hour: "19h", logins: 4 },

  { hour: "20h", logins: 2 },

  { hour: "21h", logins: 1 },

  { hour: "22h", logins: 1 },
];

// Componente para o gráfico de linhas com SVG
const SimpleLineChart = ({ data }: { data: HourlyActivityData[] }) => {
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    value: number;
  } | null>(null);

  if (!data || data.length === 0) {
    return <p className="text-slate-500">Dados de atividade indisponíveis.</p>;
  }

  const width = 500;
  const height = 300;
  const padding = 40;

  const dataMax = Math.max(...data.map((p) => p.logins));
  const maxValue = Math.max(Math.ceil(dataMax * 1.1), 10);

  const xStep = (width - padding * 2) / (data.length > 1 ? data.length - 1 : 1);

  const points = data
    .map((point, i) => {
      const x = padding + i * xStep;
      const y =
        height - padding - (point.logins / maxValue) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const handleMouseOver = (point: HourlyActivityData, i: number) => {
    const x = padding + i * xStep;
    const y =
      height - padding - (point.logins / maxValue) * (height - padding * 2);
    setHoveredPoint({ x, y, value: point.logins });
  };

  const handleMouseOut = () => {
    setHoveredPoint(null);
  };

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        aria-label="Gráfico de atividade por hora"
      >
        {[0.25, 0.5, 0.75, 1].map((v) => (
          <line
            key={v}
            x1={padding}
            y1={height - padding - v * (height - padding * 2)}
            x2={width - padding}
            y2={height - padding - v * (height - padding * 2)}
            stroke="#e0e0e0"
            strokeDasharray="3 3"
          />
        ))}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#a0a0a0"
        />
        {data.map((point, i) => {
          if (i % 2 === 0) {
            return (
              <text
                key={i}
                x={padding + i * xStep}
                y={height - padding + 20}
                textAnchor="middle"
                fill="#666"
                fontSize="12"
              >
                {point.hour}
              </text>
            );
          }
          return null;
        })}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#a0a0a0"
        />
        <text
          x={padding - 10}
          y={padding}
          textAnchor="end"
          fill="#666"
          fontSize="12"
        >
          {maxValue}
        </text>
        <text
          x={padding - 10}
          y={height - padding}
          textAnchor="end"
          fill="#666"
          fontSize="12"
        >
          0
        </text>
        <polyline
          fill="none"
          stroke="#0152a4"
          strokeWidth="3"
          points={points}
        />
        {data.map((point, i) => {
          const x = padding + i * xStep;
          const y =
            height -
            padding -
            (point.logins / maxValue) * (height - padding * 2);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="8"
              fill="transparent"
              onMouseOver={() => handleMouseOver(point, i)}
              onMouseOut={handleMouseOut}
              className="cursor-pointer"
            />
          );
        })}
        {data.map((point, i) => {
          const x = padding + i * xStep;
          const y =
            height -
            padding -
            (point.logins / maxValue) * (height - padding * 2);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#0152a4"
              stroke="white"
              strokeWidth="2"
              className="pointer-events-none"
            />
          );
        })}

        {/* Tooltip */}
        {hoveredPoint && (
          <g transform={`translate(${hoveredPoint.x}, ${hoveredPoint.y - 20})`}>
            <rect
              x="-20"
              y="-18"
              width="40"
              height="22"
              rx="4"
              fill="rgba(0, 0, 0, 0.7)"
            />
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              dy="-2"
            >
              {hoveredPoint.value}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Busca apenas as estatísticas e notificações, pois o gráfico é estático
        const [statsRes, notificationsRes] = await Promise.all([
          axios.get("/api/dashboard/stats"),
          axios.get("/api/dashboard/notifications"),
        ]);
        setStats(statsRes.data);
        setNotifications(notificationsRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
        toast.error("Não foi possível carregar os dados do dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const StatCard = ({
    title,
    value,
    icon,
  }: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
  }) => (
    <div className="bg-slate-100 rounded-2xl p-6 shadow-md transition-transform hover:scale-105">
      <div className="flex items-center gap-4">
        <div className="bg-blue-200 p-3 rounded-full">{icon}</div>
        <div>
          <h2 className="[font-family:'League_Spartan',Helvetica] font-semibold text-xl text-slate-600">
            {title}
          </h2>
          <p className="text-4xl font-bold text-[#0152a4]">
            {loading ? "..." : value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-[#0152a4] p-6 shadow-lg">
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

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total de Vans"
            value={stats?.totalVans ?? 0}
            icon={<Bus className="h-8 w-8 text-[#0152a4]" />}
          />
          <StatCard
            title="Vans Ativas"
            value={stats?.vansAtivas ?? 0}
            icon={<BusFront className="h-8 w-8 text-green-600" />}
          />
          <StatCard
            title="Total de Usuários"
            value={stats?.totalUsuarios ?? 0}
            icon={<Users className="h-8 w-8 text-indigo-600" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 bg-slate-100 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-slate-700 mb-4 [font-family:'League_Spartan',Helvetica] flex items-center gap-2">
              <BarChart2 className="h-7 w-7" /> Atividade de Hoje por Hora
            </h2>
            {/* O componente do gráfico agora usa os dados estáticos de hora */}
            {loading ? (
              <p>Carregando gráfico...</p>
            ) : (
              <SimpleLineChart data={hourlyActivityData} />
            )}
          </div>

          <div className="bg-slate-100 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-slate-700 mb-4 [font-family:'League_Spartan',Helvetica] flex items-center gap-2">
              <Bell className="h-7 w-7" /> Últimas Notificações
            </h2>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <ul className="space-y-3">
                {notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className={`p-3 rounded-lg flex items-center gap-3 ${
                      notif.type === "alert" ? "bg-red-200" : "bg-yellow-200"
                    }`}
                  >
                    <div
                      className={`p-1 rounded-full ${
                        notif.type === "alert" ? "bg-red-400" : "bg-yellow-400"
                      }`}
                    >
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-slate-800 truncate">
                      {notif.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {notifications.length === 0 && !loading && (
              <p className="text-slate-500 text-center mt-8">
                Nenhuma notificação recente.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
