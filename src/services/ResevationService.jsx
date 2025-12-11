import api from "./api";

// Get all reservations
export const getReservations = async () => {
  try {
    const response = await api.get('/reservations');
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération des réservations");
  }
};

// Get reservation by ID
export const getReservationById = async (id) => {
  try {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération de la réservation");
  }
};

// Create new reservation
export const createReservation = async (reservationData) => {
  try {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur création de la réservation");
  }
};

// Update reservation
export const updateReservation = async (id, reservationData) => {
  try {
    const response = await api.put(`/reservations/${id}`, reservationData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur mise à jour de la réservation");
  }
};

// Delete reservation
export const deleteReservation = async (id) => {
  try {
    const response = await api.delete(`/reservations/${id}`);
    return true;
  } catch (error) {
    throw new Error("Erreur suppression de la réservation");
  }
};

// Get reservations by user
export const getReservationsByUser = async (userId) => {
  try {
    const response = await api.get(`/reservations?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération des réservations de l'utilisateur");
  }
};

// Get reservations by book
export const getReservationsByBook = async (bookId) => {
  try {
    const response = await api.get(`/reservations?bookId=${bookId}`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération des réservations du livre");
  }
};

// Update reservation status
export const updateReservationStatus = async (id, status) => {
  try {
    const response = await api.put(`/reservations/${id}`, { status });
    return response.data;
  } catch (error) {
    throw new Error("Erreur mise à jour du statut de la réservation");
  }
};

// Confirm reservation
export const confirmReservation = async (id) => {
  return updateReservationStatus(id, 'CONFIRMED');
};

// Cancel reservation
export const cancelReservation = async (id) => {
  return updateReservationStatus(id, 'CANCELLED');
};