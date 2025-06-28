import axios, { AxiosInstance } from 'axios';

// Use relative URL for proxy in development
const baseURL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL;

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
    return this.client.delete<T>(url).then((res) => {
      // For 204 No Content responses, return the response status
      if (res.status === 204) {
        return res.status;
      }
      return res.data;
    });
  }
}

export const apiClient = new ApiClient();
