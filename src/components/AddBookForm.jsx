"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createBook, getAuthors } from "@/services/bookService";

export default function AddBookModal({ categories, onBookAdded }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [authors, setAuthors] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    publishedYear: "",
    isbn: "",
    categoryId: "",
    imageUrl: "",
    authorIds: [],
    numExemplaires: "",
  });

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authorsData = await getAuthors();
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    if (open) fetchAuthors();
  }, [open]);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      publishedYear: "",
      isbn: "",
      categoryId: "",
      imageUrl: "",
      authorIds: [],
      numExemplaires: "",
    });
    setPreview(null);
  };

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
    if (!form.title || !form.publishedYear || !form.isbn) {
      alert("Title, Published Year and ISBN are required.");
      return;
    }

    try {
      const payload = {
        ...form,
        publishedYear: Number(form.publishedYear),
        categoryId: form.categoryId ? Number(form.categoryId) : null,
        authorIds: form.authorIds.map(id => Number(id)),
        numExemplaires: form.numExemplaires ? Number(form.numExemplaires) : 0,
      };

      await createBook(payload);

      resetForm();
      setOpen(false);
      onBookAdded?.();
    } catch (err) {
      console.error(err);
      alert("Error adding book.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">+ Add Book</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
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
            onChange={(e) => setForm({ ...form, publishedYear: e.target.value })}
          />

          <Input
            placeholder="ISBN"
            value={form.isbn}
            onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          />

          <select
            className="border p-2 rounded-md"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          >
            <option value="">Select category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* AUTHORS MULTI-SELECT */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Authors</label>
            <select
              multiple
              className="border p-2 rounded-md"
              value={form.authorIds}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                setForm({ ...form, authorIds: selected });
              }}
            >
              {authors?.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* NUMBER OF EXEMPLAIRES */}
          <Input
            type="number"
            placeholder="Number of exemplaires"
            value={form.numExemplaires}
            onChange={(e) => setForm({ ...form, numExemplaires: e.target.value })}
          />

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

          <Button onClick={handleSubmit} className="bg-emerald-800 text-white">
            Save Book
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
