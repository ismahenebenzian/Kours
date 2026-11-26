import type { UpdateProfilePayload, UserProfile } from '../components/Types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchMyProfile(): Promise<UserProfile> {
  const res = await fetch(`${API_URL}/api/profile/me`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Impossible de charger le profil');
  }
  return data.profile;
}

export async function updateMyProfile(
  payload: UpdateProfilePayload
): Promise<UserProfile> {
  const res = await fetch(`${API_URL}/api/profile/me`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Erreur lors de la mise à jour');
  }
  return data.profile;
}

export async function deleteMyProfile(): Promise<void> {
  const res = await fetch(`${API_URL}/api/profile/me`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Erreur lors de la suppression du compte');
  }
}