import React, { useState, useEffect } from "react";
import { BookCardUser } from "@/components/UserBookCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon } from "lucide-react";
import { getBooks } from "@/services/BookService";
import { getEmpruntsByUser, returnEmprunt, createEmprunt } from "@/services/EmpruntService";
import { getReservationsByUser, cancelReservation, createReservation } from "@/services/ResevationService";
import { AuthContext } from "@/context/ExpressAuthContext";
import { useContext } from "react";
export const UserView = () => {
    const [books, setBooks] = useState([]);
    const [userLoans, setUserLoans] = useState([]);
    const [userReservations, setUserReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user} = useContext(AuthContext);

    useEffect(() => {
        fetchData();
    }, [user]);

    const fetchData = async () => {
        try {
            const [booksData, loansData, reservationsData] = await Promise.all([
                getBooks(),
                user ? getEmpruntsByUser(user.id) : Promise.resolve([]),
                user ? getReservationsByUser(user.id) : Promise.resolve([])
            ]);

            setBooks(booksData);
            setUserLoans(loansData);
            setUserReservations(reservationsData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBorrow = async (book) => {
        try {
            // Find an available exemplaire
            const availableCopy = book.copies?.find(copy => copy.disponible === true);

            if (!availableCopy) {
                alert("Aucun exemplaire disponible pour ce livre");
                return;
            }

            // Calculate due date (30 days from now)
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 30);

            // Create emprunt
            await createEmprunt({
                copyId: availableCopy.id,
                userId: user.id,
                dueDate: dueDate.toISOString().split('T')[0] // YYYY-MM-DD format
            });

            // Refresh data
            fetchData();
            alert(`Emprunt créé avec succès pour "${book.title}"`);
        } catch (error) {
            console.error("Error creating emprunt:", error);
            alert("Erreur lors de la création de l'emprunt");
        }
    };

    const handleReserve = async (book) => {
        try {
            // Check if user already has a reservation for this book
            const existingReservation = userReservations.find(res => res.bookId === book.id);

            if (existingReservation) {
                alert("Vous avez déjà une réservation pour ce livre");
                return;
            }

            // Create reservation
            await createReservation({
                userId: user.id,
                bookId: book.id
            });

            // Refresh data
            fetchData();
            alert(`Réservation créée avec succès pour "${book.title}"`);
        } catch (error) {
            console.error("Error creating reservation:", error);
            alert("Erreur lors de la création de la réservation");
        }
    };

    const handleReturn = async (loanId) => {
        try {
            await returnEmprunt(loanId);
            fetchData(); // Refresh data
            alert("Emprunt retourné avec succès");
        } catch (error) {
            console.error("Error returning loan:", error);
            alert("Erreur lors du retour");
        }
    };

    const handleCancelReservation = async (reservationId) => {
        try {
            await cancelReservation(reservationId);
            fetchData(); // Refresh data
            alert("Réservation annulée");
        } catch (error) {
            console.error("Error canceling reservation:", error);
            alert("Erreur lors de l'annulation");
        }
    };

    if (loading) {
        return <div className="p-6">Chargement...</div>;
    }

    return (
        <div className="flex flex-wrap gap-4 py-4 ">
            {/* User Info */}
             <Card className="relative w-90 h-40 rounded-2xl border border-slate-100 bg-white text-gray-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">

                <CardHeader>
                    <CardTitle>Mon Profil</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div>
                            <h3 className="text-lg font-semibold">{user?.nom}</h3>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>
                         <Badge
                          className={`
                            px-2 py-1 text-xs font-semibold rounded-md flex items-center gap-1
                            ${
                              user.role === "ADMIN"
                                ? "bg-violet-700 text-white"
                                : user.role === "LIBRARIAN"
                                ? "bg-yellow-500 text-white"
                                : user.role === "MEMBER"
                                ? "bg-emerald-700 text-white"
                                : "bg-yellow-500 text-black"
                            }
                          `}
                        >
                          {(user.role === "ADMIN" || user.role === "LIBRARIAN") && (
                            <BadgeCheckIcon className="w-3 h-3" />
                          )}

                          {user.role}
                      </Badge>
                    </div>
                </CardContent>
            </Card>
                    
            {/* Current Loans */}
              <Card className="relative w-90 h-40 rounded-2xl border border-slate-100 bg-white text-gray-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">

                <CardHeader>
                    <CardTitle>Mes Emprunts Actuels</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-slate-700 mb-2">{userLoans.length}</div>
                        <p className="text-gray-600">emprunt(s) en cours</p>
                    </div>
                </CardContent>
            </Card>

           {/* Current Reservations */}
       <Card className="relative w-90 h-40 rounded-2xl border border-slate-100 bg-white text-gray-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">

               <CardHeader>
                   <CardTitle>Mes Réservations</CardTitle>
               </CardHeader>
               <CardContent>
                   <div className="text-center">
                       <div className="text-3xl font-bold text-slate-700 mb-2">{userReservations.length}</div>
                       <p className="text-gray-600">réservation(s) active(s)</p>
                   </div>
               </CardContent>
           </Card>

            {/* Available Books */}
            <div className="gap-6">
                <h2 className="text-xl font-semibold mb-4">Livres Disponibles</h2>
                <div className="flex flex-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <BookCardUser
                            key={book.id}
                            book={book}
                            onBorrow={() => handleBorrow(book)}
                            onReserve={() => handleReserve(book)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserView;
