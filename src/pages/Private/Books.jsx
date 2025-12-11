import React, { useEffect, useState } from "react"
import { BooksTab } from "@/components/BooksTab"
import { BookCard } from "@/components/BookCard"
import {getBooks, AdminDeleteBook} from "@/services/BookService"
export const Books = () => {
  const [books,setBooks] = useState([]);

  //chargement des livres 
  useEffect(()=>{
    getBooks()
    .then(res => setBooks(res))
    .catch(err => console.error(err))
  },[])

  const handleDelete = (id) =>{
    const confirm = window.confirm("voulez vous supprimer cet Livre?")
    if(confirm){
      AdminDeleteBook(id)
     .then(() => {
        setBooks(prev => prev.filter(book => book.id !== id));
      })
      .catch(err=> console.log(err));
    };
  }
   const handlePreview = (book) => {
    console.log("Aperçu :", book);
  };

  const toggleStatus = (id, newStatus) => {
    console.log("Changement de statut :", id, newStatus);
  };

  const handleEdit = (book) =>{
    console.log("modifier:",book)
  }
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
          Books Management
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Books</h1>
      </div>
      <div className="flex flex-wrap gap-6">
         {
          books.map((book) =>(
            <BookCard
              key={book.id}
              book={book}
               onEdit={handleEdit}
              onDelete={handleDelete}
              onPreview={handlePreview}
              onToggleStatus={toggleStatus}
            />
          ))
         }
      </div>
      <BooksTab />
    </div>
  )
}
export default Books
