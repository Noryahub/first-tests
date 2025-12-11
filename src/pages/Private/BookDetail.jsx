import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "@/services/BookService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!book) {
    return <div className="p-6">Book not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>ISBN: {book.isbn}</span>
          <span>Published: {book.publishedYear}</span>
          <span>Category: {book.category?.name || "N/A"}</span>
          <span>Edition: {book.edition?.name || "N/A"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Book Image */}
        <Card>
          <CardHeader>
            <CardTitle>Cover</CardTitle>
          </CardHeader>
          <CardContent>
            {book.imageUrl ? (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-64 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
                No Image
              </div>
            )}
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{book.description || "No description available"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Authors */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Authors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {book.authors?.map((author) => (
              <Badge key={author.id} variant="secondary">
                {author.name}
              </Badge>
            )) || <span>No authors</span>}
          </div>
        </CardContent>
      </Card>

      {/* Exemplaires */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Exemplaires ({book.copies?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {book.copies?.map((copy) => (
              <div key={copy.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <span className="font-medium">ID: {copy.id}</span>
                  <span className="ml-4">État: {copy.etat === 'abime' ? 'Abîmé' : copy.etat === 'tres_abime' ? 'Très abîmé' : copy.etat}</span>
                  <span className="ml-4">Disponible: {copy.disponible ? "Oui" : "Non"}</span>
                </div>
                <span className="text-sm text-gray-500">{copy.barcode}</span>
              </div>
            )) || <span>No exemplaires</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetail;