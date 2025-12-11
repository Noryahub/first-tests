import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { getExemplaires, createExemplaire, updateExemplaire, deleteExemplaire, getBooks } from "@/services/BookService"
import AddExemplaireModal from "@/components/AddExemplaireModal"

export function ExemplairesTab() {
  const [exemplaires, setExemplaires] = useState([])
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchExemplaires()
    fetchBooks()
  }, [])

  const fetchExemplaires = async () => {
    try {
      const data = await getExemplaires()
      setExemplaires(data)
    } catch (error) {
      console.error("Error fetching exemplaires:", error)
    }
  }

  const fetchBooks = async () => {
    try {
      const data = await getBooks()
      setBooks(data)
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer cet exemplaire ?")) {
      try {
        await deleteExemplaire(id)
        setExemplaires(prev => prev.filter(e => e.id !== id))
      } catch (error) {
        console.error("Error deleting exemplaire:", error)
        alert("Erreur lors de la suppression")
      }
    }
  }

  const handleExemplaireAdded = () => {
    fetchExemplaires()
  }

  const getBookTitle = (bookId) => {
    const book = books.find(b => b.id === bookId)
    return book ? book.title : "Unknown Book"
  }

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 text-gray-900 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
            Exemplaires List
          </h2>
        </div>
        <AddExemplaireModal onExemplaireAdded={handleExemplaireAdded} />
      </div>

      <div className="mt-5 overflow-hidden">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow className="bg-slate-50 text-gray-500 dark:bg-slate-800/60 dark:text-slate-300">
              <TableHead className="w-32 text-gray-500 dark:text-slate-300">
                Exemplaire ID
              </TableHead>
              <TableHead className="text-gray-500 dark:text-slate-300">
                Book
              </TableHead>
              <TableHead className="text-gray-500 dark:text-slate-300">
                État
              </TableHead>
              <TableHead className="text-gray-500 dark:text-slate-300">
                Disponible
              </TableHead>
              <TableHead className="text-gray-500 dark:text-slate-300">
                Barcode
              </TableHead>
              <TableHead className="text-right text-gray-500 dark:text-slate-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exemplaires.map((exemplaire) => (
              <TableRow
                key={exemplaire.id}
                className="border-b border-slate-100 text-gray-700 last:border-b-0 dark:border-slate-800 dark:text-slate-200"
              >
                <TableCell className="font-semibold text-gray-900 dark:text-slate-100">
                  {exemplaire.id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center justify-left gap-3">
                    <p className="font-medium text-gray-900 dark:text-slate-100">
                      {getBookTitle(exemplaire.bookId)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-left text-gray-600 dark:text-slate-300">
                  {exemplaire.etat === 'abime' ? 'Abîmé' : exemplaire.etat === 'tres_abime' ? 'Très abîmé' : exemplaire.etat}
                </TableCell>
                <TableCell className="text-left text-gray-600 dark:text-slate-300">
                  {exemplaire.disponible ? "Oui" : "Non"}
                </TableCell>
                <TableCell className="text-left text-gray-600 dark:text-slate-300">
                  {exemplaire.barcode}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-row gap-4">
                    <Button className="bg-neutral-700 px-3 hover:bg-neutral-950">Update</Button>
                    <Button onClick={() => handleDelete(exemplaire.id)} className="bg-pink-700 hover:bg-pink-600 px-4">Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-right text-sm font-medium text-sky-500 dark:text-sky-400">
        See All
      </div>
    </div>
  )
}