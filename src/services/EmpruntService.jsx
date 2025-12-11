import api from "./api";

// Get all emprunts
export const getEmprunts = async () => {
  try {
    const response = await api.get('/emprunts');
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération des emprunts");
  }
};

// Get emprunt by ID
export const getEmpruntById = async (id) => {
  try {
    const response = await api.get(`/emprunts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération de l'emprunt");
  }
};

// Create new emprunt
export const createEmprunt = async (empruntData) => {
  try {
    const response = await api.post('/emprunts', empruntData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur création de l'emprunt");
  }
};

// Update emprunt
export const updateEmprunt = async (id, empruntData) => {
  try {
    const response = await api.put(`/emprunts/${id}`, empruntData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur mise à jour de l'emprunt");
  }
};

// Delete emprunt
export const deleteEmprunt = async (id) => {
  try {
    const response = await api.delete(`/emprunts/${id}`);
    return true;
  } catch (error) {
    throw new Error("Erreur suppression de l'emprunt");
  }
};

// Get emprunts by user
export const getEmpruntsByUser = async (userId) => {
  try {
    const response = await api.get(`/emprunts?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération des emprunts de l'utilisateur");
  }
};

// Get emprunts by exemplaire
export const getEmpruntsByExemplaire = async (exemplaireId) => {
  try {
    const response = await api.get(`/emprunts?copyId=${exemplaireId}`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération des emprunts de l'exemplaire");
  }
};

// Return emprunt (update return date)
export const returnEmprunt = async (id, returnDate = new Date()) => {
  try {
    const response = await api.put(`/emprunts/${id}`, { returnDate });
    return response.data;
  } catch (error) {
    throw new Error("Erreur retour de l'emprunt");
  }
};