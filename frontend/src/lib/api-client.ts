const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export const apiClient = {
  async get<T>(endpoint: string, authenticated = false): Promise<T> {
    const headers = authenticated
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
    if (!response.ok) throw new Error("API request failed");
    return response.json();
  },

  async post<T>(
    endpoint: string,
    data: unknown,
    authenticated = false
  ): Promise<T> {
    const headers = authenticated
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("API request failed");
    return response.json();
  },

  async put<T>(
    endpoint: string,
    data: unknown,
    authenticated = false
  ): Promise<T> {
    const headers = authenticated
      ? getAuthHeaders()
      : { "Content-Type": "application/json" };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("API request failed");
    return response.json();
  },
};
