import api from "./api";

// Admin create book
export const createBook = async(payload) =>{
    try {
        const response = await api.post('/books', payload);
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erreur d'ajout");
    }
};
//get book by id
export const getBookById = async(id) =>{
   try {
    const response = await api.get(`/books/${id}`);
    return response.data;
   } catch (error) {
    throw new Error("Erreur récupération du livre");
   }

}


// get books
export const getBooks = async () =>{
    try{
        const response = await api.get('/books');
        return response.data;
    }catch(error){
        throw new Error("Erreur récupération des livres");
    }
};

// updateBook
export const AdminUpdateBooks = async (id, data) =>{
    try {
        const response = await api.put(`/books/${id}`,data);
        return response.data;
    } catch (error) {
        throw new Error("Erreur de mise a jour des livres");
    }
}

//Amin delete book

export const AdminDeleteBook = async (id) =>{
    try {
        const response = await api.delete(`/books/${id}`);
        return true
    } catch (error) {
        throw new Error("erreur de suppression du livre")
    }
}

// get categories
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération des catégories");
  }
};

// get authors
export const getAuthors = async () => {
  try {
    const response = await api.get('/authors');
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération des auteurs");
  }
};

// create author
export const createAuthor = async (authorData) => {
  try {
    const response = await api.post('/authors', authorData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur création auteur");
  }
};

// update author
export const updateAuthor = async (id, authorData) => {
  try {
    const response = await api.put(`/authors/${id}`, authorData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur mise à jour auteur");
  }
};

// delete author
export const deleteAuthor = async (id) => {
  try {
    const response = await api.delete(`/authors/${id}`);
    return true;
  } catch (error) {
    throw new Error("Erreur suppression auteur");
  }
};

// get editions
export const getEditions = async () => {
  try {
    const response = await api.get('/editions');
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération des éditions");
  }
};

// get exemplaires
export const getExemplaires = async () => {
  try {
    const response = await api.get('/exemplaires');
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération des exemplaires");
  }
};

// create exemplaire
export const createExemplaire = async (exemplaireData) => {
  try {
    const response = await api.post('/exemplaires', exemplaireData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur création exemplaire");
  }
};

// update exemplaire
export const updateExemplaire = async (id, exemplaireData) => {
  try {
    const response = await api.put(`/exemplaires/${id}`, exemplaireData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur mise à jour exemplaire");
  }
};

// delete exemplaire
export const deleteExemplaire = async (id) => {
  try {
    const response = await api.delete(`/exemplaires/${id}`);
    return true;
  } catch (error) {
    throw new Error("Erreur suppression exemplaire");
  }
};

