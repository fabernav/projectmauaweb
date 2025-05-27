import axios from "axios";

// Crie uma instância do axios com a URL base da sua API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  // Você pode adicionar headers padrão aqui, como tokens de autenticação
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Você pode adicionar lógica para lidar com diferentes tipos de erros aqui
    const message =
      error.response?.data?.message ||
      "Ocorreu um erro na comunicação com o servidor";
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

export default api;
