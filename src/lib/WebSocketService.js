import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.listeners = [];
  }

  connect(baseUrl = "http://localhost:8080") {
    if (this.client) {
      return;
    }

    // Configurar cliente STOMP
    this.client = new Client({
      webSocketFactory: () => new SockJS(`${baseUrl}/ws`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log("WebSocket conectado!");
        this.isConnected = true;

        // Assinar tópico de horários
        this.client.subscribe("/topic/horarios", (message) => {
          try {
            const payload = JSON.parse(message.body);
            this.notifyListeners(payload);
          } catch (error) {
            console.error("Erro ao processar mensagem WebSocket:", error);
          }
        });
      },

      onDisconnect: () => {
        console.log("WebSocket desconectado");
        this.isConnected = false;
      },

      onStompError: (frame) => {
        console.error("Erro no STOMP:", frame.headers["message"]);
        console.error("Detalhes adicionais:", frame.body);
      },
    });

    // Iniciar conexão
    this.client.activate();
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      this.isConnected = false;
    }
  }

  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  notifyListeners(data) {
    this.listeners.forEach((callback) => callback(data));
  }
}

// Criando uma instância singleton
const webSocketService = new WebSocketService();
export default webSocketService;
