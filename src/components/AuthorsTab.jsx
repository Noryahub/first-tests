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
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from "@/services/BookService"
import AddAuthorModal from "@/components/AddAuthorModal"

export function AuthorsTab() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    try {
      const data = await getAuthors()
      setAuthors(data)
    } catch (error) {
      console.error("Error fetching authors:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer cet auteur ?")) {
      try {
        await deleteAuthor(id)
        setAuthors(prev => prev.filter(a => a.id !== id))
      } catch (error) {
        console.error("Error deleting author:", error)
        alert("Erreur lors de la suppression")
      }
    }
  }

  const handleAuthorAdded = () => {
    fetchAuthors()
  }

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 text-gray-900 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
            Authors List
          </h2>
        </div>
        <AddAuthorModal onAuthorAdded={handleAuthorAdded} />
      </div>

      <div className="mt-5 overflow-hidden">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow className="bg-slate-50 text-gray-500 dark:bg-slate-800/60 dark:text-slate-300">
              <TableHead className="w-32 text-gray-500 dark:text-slate-300">
                Author ID
              </TableHead>
              <TableHead className="text-gray-500 dark:text-slate-300">
                Name
              </TableHead>
              <TableHead className="text-gray-500 dark:text-slate-300">
                Biography
              </TableHead>
              <TableHead className="text-right text-gray-500 dark:text-slate-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.map((author) => (
              <TableRow
                key={author.id}
                className="border-b border-slate-100 text-gray-700 last:border-b-0 dark:border-slate-800 dark:text-slate-200"
              >
                <TableCell className="font-semibold text-gray-900 dark:text-slate-100">
                  {author.id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center justify-left gap-3">
                    <p className="font-medium text-gray-900 dark:text-slate-100">
                      {author.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-left text-gray-600 dark:text-slate-300">
                  {author.biography || "No biography"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-row gap-4">
                    <Button className="bg-neutral-700 px-3 hover:bg-neutral-950">Update</Button>
                    <Button onClick={() => handleDelete(author.id)} className="bg-pink-700 hover:bg-pink-600 px-4">Delete</Button>
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