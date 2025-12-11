"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AdminUpdateBooks, getAuthors, getEditions } from "@/services/BookService";
import { Edit } from "lucide-react";

export default function EditBookModal({ book, categories, onBookUpdated }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [editions, setEditions] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    publishedYear: "",
    isbn: "",
    categoryId: "",
    editionId: "",
    imageUrl: "",
    authors: [],
  });

  // Load book data into form when modal opens
  useEffect(() => {
    const fetchData = async () => {
      if (book) {
        setForm({
          title: book.title,
          description: book.description || "",
          publishedYear: book.publishedYear || "",
          isbn: book.isbn,
          categoryId: book.categoryId || "",
          editionId: book.editionId || "",
          imageUrl: book.imageUrl || "",
          authors: book.authors?.map(a => a.id.toString()) || [],
        });
        setPreview(book.imageUrl || null);
      }
      if (open) {
        try {
          const [authorsData, editionsData] = await Promise.all([getAuthors(), getEditions()]);
          setAuthors(authorsData);
          setEditions(editionsData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [book, open]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setPreview(base64);
      setForm((prev) => ({ ...prev, imageUrl: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        publishedYear: Number(form.publishedYear),
        categoryId: form.categoryId ? Number(form.categoryId) : null,
        editionId: form.editionId ? Number(form.editionId) : null,
        authors: form.authors.map(id => Number(id)),
      };

      await AdminUpdateBooks(book.id, payload);

      setOpen(false);
      onBookUpdated?.();
    } catch (err) {
      console.error(err);
      alert("Error updating book.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 gap-2 bg-neutral-800 text-white" size="sm" ><Edit/>  Edit</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <Input
            type="number"
            placeholder="Published Year"
            value={form.publishedYear}
            onChange={(e) =>
              setForm({ ...form, publishedYear: e.target.value })
            }
          />

          <Input
            placeholder="ISBN"
            value={form.isbn}
            onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          />

          <select
            className="border p-2 rounded-md"
            value={form.categoryId}
            onChange={(e) =>
              setForm({ ...form, categoryId: e.target.value })
            }
          >
            <option value="">Select category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded-md"
            value={form.editionId}
            onChange={(e) =>
              setForm({ ...form, editionId: e.target.value })
            }
          >
            <option value="">Select edition</option>
            {editions?.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>

          {/* AUTHORS MULTI-SELECT */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Authors</label>
            <select
              multiple
              className="border p-2 rounded-md"
              value={form.authors}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                setForm({ ...form, authors: selected });
              }}
            >
              {authors?.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Book Image</label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />

            {preview && (
              <img
                src={preview}
                className="w-32 h-32 object-cover rounded-md border"
                alt="Preview"
              />
            )}
          </div>

          <Button onClick={handleSubmit} className="bg-blue-700 text-white">
            Update Book
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
