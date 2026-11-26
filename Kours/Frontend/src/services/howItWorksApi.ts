import type { HowItWorksResponse } from '../components/Types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchHowItWorks(): Promise<HowItWorksResponse> {
  const response = await fetch(`${API_URL}/api/how-it-works`);
  if (!response.ok) {
    throw new Error('Impossible de charger les informations de la page');
  }
  return response.json();
}