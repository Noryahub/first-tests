import React, { useState, useEffect } from "react";
import { BookCardUser } from "@/components/UserBookCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBooks } from "@/services/BookService";
import { getEmpruntsByUser, returnEmprunt } from "@/services/EmpruntService";
import { getReservationsByUser, cancelReservation } from "@/services/ResevationService";
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
        // TODO: Implement borrow logic
        alert(`Demande d'emprunt pour "${book.title}"`);
    };

    const handleReserve = async (book) => {
        // TODO: Implement reserve logic
        alert(`Demande de réservation pour "${book.title}"`);
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
                    <CardTitle>Mes Emprunts Actuels ({userLoans.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {userLoans.length === 0 ? (
                        <p className="text-gray-500">Aucun emprunt en cours</p>
                    ) : (
                        <div className="space-y-3">
                            {userLoans.map((loan) => (
                                <div key={loan.id} className="flex justify-between items-center p-3 border rounded">
                                    <div>
                                        <h4 className="font-medium">{loan.copy?.book?.title}</h4>
                                        <p className="text-sm text-gray-600">
                                            Emprunté le: {new Date(loan.loanDate).toLocaleDateString('fr-FR')}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            À retourner avant: {new Date(loan.dueDate).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                    <Button
                                        size="sm"
                                        onClick={() => handleReturn(loan.id)}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        Retourner
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

           {/* Current Reservations */}
        <Card className="relative w-90 h-40 rounded-2xl border border-slate-100 bg-white text-gray-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">

                <CardHeader>
                    <CardTitle>Mes Réservations ({userReservations.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {userReservations.length === 0 ? (
                        <p className="text-gray-500">Aucune réservation</p>
                    ) : (
                        <div className="space-y-3">
                            {userReservations.map((reservation) => (
                                <div key={reservation.id} className="flex justify-between items-center p-3 border rounded">
                                    <div>
                                        <h4 className="font-medium">{reservation.book?.title}</h4>
                                        <p className="text-sm text-gray-600">
                                            Réservé le: {new Date(reservation.reservationDate).toLocaleDateString('fr-FR')}
                                        </p>
                                        <Badge variant={
                                            reservation.status === 'CONFIRMED' ? 'default' :
                                            reservation.status === 'CANCELLED' ? 'destructive' : 'secondary'
                                        }>
                                            {reservation.status}
                                        </Badge>
                                    </div>
                                    {reservation.status === 'PENDING' && (
                                        <Button
                                            size="sm"
                                            onClick={() => handleCancelReservation(reservation.id)}
                                            variant="outline"
                                        >
                                            Annuler
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
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
                            onBorrow={handleBorrow}
                            onReserve={handleReserve}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserView;
