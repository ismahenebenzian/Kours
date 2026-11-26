import { supabase } from "../SupabaseClient";

const API_URL = "http://127.0.0.1:3000/api";


// DÃ©poser un cours
export async function depositCourse(formData: FormData) {

    // RÃ©cupÃ©rer la session Supabase
    const { data: sessionData, error } =
        await supabase.auth.getSession();

    if (error || !sessionData.session) {
        throw new Error("Vous devez Ãªtre connectÃ©.");
    }

    // RÃ©cupÃ©rer le token de l'utilisateur
    const accessToken = sessionData.session.access_token;

    // Envoyer le formulaire avec le token
    const response = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.errors?.join("\n") ||
            data.message ||
            "Erreur lors du dÃ©pÃ´t du cours."
        );
    }

    return data;
}


// RÃ©cupÃ©rer tous les cours
export async function getAllCourses() {

    const response = await fetch(`${API_URL}/courses`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.data;
}


// RÃ©cupÃ©rer un cours par son ID
export async function getCourseById(id: number) {

    const response = await fetch(`${API_URL}/courses/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.data;
}
