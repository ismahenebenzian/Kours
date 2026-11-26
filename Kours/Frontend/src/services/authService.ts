const API_URL = "http://127.0.0.1:3000/api/auth";

export async function syncUser(accessToken: string) {
  const response = await fetch(`${API_URL}/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Erreur de synchronisation du compte"
    );
  }

  return data.utilisateur;
}
