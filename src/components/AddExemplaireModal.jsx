"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createExemplaire, getBooks } from "@/services/BookService";

export default function AddExemplaireModal({ onExemplaireAdded }) {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    bookId: "",
    etat: "neuf",
    disponible: true,
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    if (open) fetchBooks();
  }, [open]);

  const resetForm = () => {
    setForm({
      bookId: "",
      etat: "neuf",
      disponible: true,
    });
  };

  const handleSubmit = async () => {
    if (!form.bookId) {
      alert("Book selection is required.");
      return;
    }

    try {
      const payload = {
        ...form,
        bookId: Number(form.bookId),
        barcode: `BK${form.bookId}EX${Date.now()}`,
      };
      await createExemplaire(payload);
      resetForm();
      setOpen(false);
      onExemplaireAdded?.();
    } catch (err) {
      console.error(err);
      alert("Error adding exemplaire.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">+ Add Exemplaire</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Exemplaire</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          <select
            className="border p-2 rounded-md"
            value={form.bookId}
            onChange={(e) => setForm({ ...form, bookId: e.target.value })}
          >
            <option value="">Select Book</option>
            {books?.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded-md"
            value={form.etat}
            onChange={(e) => setForm({ ...form, etat: e.target.value })}
          >
            <option value="neuf">Neuf</option>
            <option value="bon">Bon</option>
            <option value="abime">Abîmé</option>
            <option value="tres_abime">Très abîmé</option>
            <option value="perdu">Perdu</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.disponible}
              onChange={(e) => setForm({ ...form, disponible: e.target.checked })}
            />
            <label>Disponible</label>
          </div>

          <Button onClick={handleSubmit} className="bg-emerald-800 text-white">
            Save Exemplaire
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}