"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createAuthor } from "@/services/BookService";

export default function AddAuthorModal({ onAuthorAdded }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    biography: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      biography: "",
    });
  };

  const handleSubmit = async () => {
    if (!form.name) {
      alert("Name is required.");
      return;
    }

    try {
      await createAuthor(form);
      resetForm();
      setOpen(false);
      onAuthorAdded?.();
    } catch (err) {
      console.error(err);
      alert("Error adding author.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">+ Add Author</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Author</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          <Input
            placeholder="Author Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Textarea
            placeholder="Biography (optional)"
            value={form.biography}
            onChange={(e) => setForm({ ...form, biography: e.target.value })}
          />

          <Button onClick={handleSubmit} className="bg-emerald-800 text-white">
            Save Author
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}