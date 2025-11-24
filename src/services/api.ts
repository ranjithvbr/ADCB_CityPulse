import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://6717943db910c6a6e028f799.mockapi.io/agenda',
});

export interface CityPulseEvent {
  id: string;
  City: string;
  CreatedBy: string;
  Event: string;
  createdAt: string;
}

export async function fetchEvents(): Promise<CityPulseEvent[]> {
  const response = await api.get<CityPulseEvent[]>('/cityPulse');
  return response.data;
}
