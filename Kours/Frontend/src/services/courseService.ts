const API_URL = "http://localhost:3000/api";

// Déposer un cours
export async function depositCourse(formData: FormData) {

    const response = await fetch(`${API_URL}/courses`, {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.errors?.join("\n") ||
            data.message ||
            "Erreur lors du dépôt du cours."
        );
    }

    return data;
}


// Récupérer tous les cours
export async function getAllCourses() {

    const response = await fetch(`${API_URL}/courses`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.data;
}


// Récupérer un cours par son ID
export async function getCourseById(id: number) {

    const response = await fetch(`${API_URL}/courses/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.data;
}