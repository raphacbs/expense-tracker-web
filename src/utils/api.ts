// Certifique-se de que este arquivo é importado corretamente em seu projeto
import axios from 'axios';

console.log('Interceptor setup code is being executed');
console.log(process.env.REACT_APP_BASE_URL);

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
});

// Adicionar logs para garantir que o interceptor está sendo configurado
console.log('Setting up request interceptor');

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Adicionado para debug
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Config:', config); // Adicionado para debug
    return config;
  },
  (error) => {
    console.error('Request error:', error); // Adicionado para debug
    return Promise.reject(error);
  }
);

// Função genérica para POST
export async function postRequest<T>(url: string, data: T) {
  const response = await axiosInstance.post(url, data);
  return response.data;
}

// Função genérica para GET
export async function getRequest<T>(url: string, params?: T) {
  const response = await axiosInstance.get(url, { params });
  return response.data;
}

// Função genérica para PUT
export async function putRequest<T>(url: string, data: T) {
  const response = await axiosInstance.put(url, data);
  return response.data;
}


export default axiosInstance;
