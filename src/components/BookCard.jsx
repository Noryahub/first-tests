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
import { Calendar, Edit, Eye, FolderOpen, Trash2, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditBookModal from "@/components/EditBookModal"


export function BookCard({ book = {}, onEdit, onDelete, onPreview, onToggleStatus, className, isActionLoading = false }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleDeleteConfirm = () => {
    if (onDelete && book.id) {
      onDelete(book.id);
    } else {
      console.error("Impossible de supprimer le livre: ID manquant");
    }
    setShowDeleteDialog(false);
  };

  const handleBookDelete = () => {
    setShowDeleteDialog(true);
  };

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
          {/* Squelette de chargement pour l'image */}
          {!imageLoaded && (
            <div className="w-full h-100 bg-muted animate-pulse" />
          )}
          
          {/* Image du livre avec fallback en cas d'erreur */}
          {!imageError ? (
            <img
              src={book.imageUrl || book.coverImage || "/placeholder-image.jpg"}
              alt={book.title}
              className={cn(
                "w-full h-108 object-cover  transition-opacity duration-300",
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
          
          {/* Overlay avec bouton d'aperçu */}
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
          
          {/* Petit overlay clicable en haut-gauche pour indiquer l'inactivité après ajout */}
              {/* Removed left-top duplicate badge; keep single status badge on top-right */}

          {/* Badge de statut avec couleurs appropriées, cliquable pour basculer */}
          <button
            onClick={() => onToggleStatus && onToggleStatus(book.id, book.status === 'active' ? 'inactive' : 'active')}
            title={book.status === 'active' ? 'Désactiver le livre' : 'Activer le livre'}
            className={cn(
              "absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold focus:outline-none",
              book.status === "active"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-500 hover:bg-gray-600 text-white"
            )}
          >
            {book.status === "active" ? "Actif" : "Inactif"}
          </button>

        </div>
        
        <CardContent className="px-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>

          <div className=" flex flex-row text-sm text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              <span>{book.authors?.map(a => a.name).join(', ') || "Auteur inconnu"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{book.copies?.filter(c => c.disponible === true).length || 0} exemplaires disponibles</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {book.publicationDate || book.addedDate
                  ? new Date(book.publicationDate || book.addedDate).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })
                  : "Date inconnue"}
              </span>
            </div>
          </div>

        </CardContent>
        
        <CardFooter className="p-2 pt-0 flex gap-2">
          <Button
            size="sm"
            onClick={() => navigate(`/private/notifications/${book.id}`)}
            variant="outline"
            className="hover:bg-neutral-400"
            disabled={isActionLoading}
          >
            <Info className="w-4 h-4" />
            Détails
          </Button>
          <EditBookModal
             book={book}
          />
          <Button
            size="sm"
            onClick={handleBookDelete}
            className="flex-1 gap-2 bg-neutral-900 hover:bg-neutral-900"
            disabled={isActionLoading}
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </Button>
        </CardFooter>
      </Card>
      
      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera définitivement le livre "{book.title}".
              Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isActionLoading}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isActionLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isActionLoading ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}