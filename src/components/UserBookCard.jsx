import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, Eye, FolderOpen, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function BookCardUser({ 
    book = {}, 
    onPreview, 
    onBorrow, 
    onReserve, 
    className, 
    isActionLoading = false 
}) {
    
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const availableCopies = book.copies?.filter(c => c.disponible).length || 0;

  return (
    <>
      <Card
        className={cn(
          " w-85 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group",
          isActionLoading && "opacity-50 pointer-events-none",
          className
        )}
      >
        <div className="relative">

          {/* Squelette Image */}
          {!imageLoaded && (
            <div className="w-full h-100 bg-muted animate-pulse" />
          )}

          {/* Image */}
          {!imageError ? (
            <img
              src={book.imageUrl || "/placeholder-image.jpg"}
              alt={book.title}
              className={cn(
                "w-full h-108 object-cover transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0 absolute"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-48 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Image non disponible</span>
            </div>
          )}

          {/* Overlay Aperçu */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPreview(book)}
              className="gap-2 backdrop-blur-sm"
              disabled={isActionLoading}
            >
              <Eye className="w-4 h-4" />
              Aperçu
            </Button>
          </div>

        </div>

        {/* Infos Livre */}
        <CardContent className="px-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>

          <div className="flex flex-col text-sm text-muted-foreground space-y-2">

            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              <span>{book.authors?.map(a => a.name).join(', ') || "Auteur inconnu"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{availableCopies} exemplaires disponibles</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {book.publishedYear || "Année inconnue"}
              </span>
            </div>

          </div>
        </CardContent>

        {/* Boutons Utilisateur */}
        <CardFooter className="p-2 pt-0 flex gap-2 justify-between">

          <Button
            size="sm"
            onClick={() => navigate(`/private/book/${book.id}`)}
            className="gap-2 bg-sky-600 hover:bg-sky-700 flex-1"
            disabled={isActionLoading}
          >
            <Info className="w-4 h-4" />
            Détails
          </Button>

          <Button
            size="sm"
            className="gap-2 bg-zinc-900 hover:bg-neutral-800 flex-1"
            disabled={isActionLoading || availableCopies === 0}
            onClick={() => onBorrow(book)}
          >
             Emprunter
          </Button>

          <Button
            size="sm"
            className="gap-2 bg-emerald-900 hover:bg-emerald-900 flex-1"
            disabled={isActionLoading}
            onClick={() => onReserve(book)}
          >
            Réserver
          </Button>
          
        </CardFooter>

      </Card>
    </>
  );
}
