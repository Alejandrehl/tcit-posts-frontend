import axios, { AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  get<T>(url: string) {
    return this.client.get<T>(url).then((res) => res.data);
  }

  post<T>(url: string, data: unknown) {
    return this.client.post<T>(url, data).then((res) => res.data);
  }

  delete<T>(url: string) {
    return this.client.delete<T>(url).then((res) => res.data);
  }
}

export const apiClient = new ApiClient();
