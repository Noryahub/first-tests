import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddBookModal from "@/components/AddBookForm"
import { getBooks, getCategories, AdminDeleteBook } from "@/services/BookService"

export function BooksTab() {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchBooks()
    fetchCategories()
  }, [])

  const fetchBooks = async () => {
    try {
      const data = await getBooks()
      setBooks(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleBookAdded = () => {
    fetchBooks()
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.authors?.some(author => author.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Voulez-vous supprimer ce livre ?")
    if (confirmDelete) {
      AdminDeleteBook(id)
        .then(() => setBooks(prev => prev.filter(b => b.id !== id)))
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 text-gray-900 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Books List</h2>

        <AddBookModal
          categories={categories}
          onBookAdded={handleBookAdded}
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-6 overflow-hidden">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="py-3 pl-6">Book ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id} className="border-b dark:border-slate-800">
                
                {/* ID */}
                <TableCell className="pl-6 font-semibold">{book.id}</TableCell>

                {/* Title */}
                <TableCell className="font-medium">{book.title}</TableCell>

                {/* Available */}
                <TableCell>{book.copies?.filter(c => c.disponible === true).length || 0}</TableCell>

                {/* IMAGE DISPLAY */}
                <TableCell>
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl.startsWith("data:")
                        ? book.imageUrl
                        : `data:image/jpeg;base64,${book.imageUrl}`
                      }
                      alt={book.title}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </TableCell>

                {/* ACTIONS */}
                <TableCell className="pr-6 text-right">
                  <div className="flex justify-end gap-3">
                    <Button className="bg-neutral-700 hover:bg-sky-950 px-3 text-white">Update</Button>
                    <Button
                      onClick={() => handleDelete(book.id)}
                      className="bg-pink-600 hover:bg-pink-600 px-4 text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  )
}

export default BooksTab
