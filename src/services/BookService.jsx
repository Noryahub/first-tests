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

// get editions
export const getEditions = async () => {
  try {
    const response = await api.get('/editions');
    return response.data;
  } catch (error) {
    throw new Error("Erreur récupération des éditions");
  }
};

