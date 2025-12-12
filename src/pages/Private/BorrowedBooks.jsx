import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEmpruntsByUser, returnEmprunt } from "@/services/EmpruntService";
import { getReservationsByUser, cancelReservation } from "@/services/ResevationService";
import { AuthContext } from "@/context/ExpressAuthContext";
import { useContext } from "react";

export const BorrowedBooks = () => {
    const [allLoans, setAllLoans] = useState([]);
    const [userReservations, setUserReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchData();
    }, [user]);

    const fetchData = async () => {
        try {
            const [loansData, reservationsData] = await Promise.all([
                user ? getEmpruntsByUser(user.id) : Promise.resolve([]),
                user ? getReservationsByUser(user.id) : Promise.resolve([])
            ]);

            setAllLoans(loansData);
            setUserReservations(reservationsData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Separate active and returned loans
    const activeLoans = allLoans.filter(loan => !loan.returnDate);
    const returnedLoans = allLoans.filter(loan => loan.returnDate);

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
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold mb-6">Mes Emprunts et Réservations</h1>

            {/* Current Loans */}
            <Card>
                <CardHeader>
                    <CardTitle>Mes Emprunts Actuels ({activeLoans.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {activeLoans.length === 0 ? (
                        <p className="text-gray-500">Aucun emprunt en cours</p>
                    ) : (
                        <div className="space-y-4">
                            {activeLoans.map((loan) => (
                                <div key={loan.id} className="flex justify-between items-center p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg">{loan.copy?.book?.title}</h4>
                                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                                            <p>Emprunté le: {new Date(loan.loanDate).toLocaleDateString('fr-FR')}</p>
                                            <p>À retourner avant: {new Date(loan.dueDate).toLocaleDateString('fr-FR')}</p>
                                            <p>État de l'exemplaire: {loan.copy?.etat === 'abime' ? 'Abîmé' : loan.copy?.etat === 'tres_abime' ? 'Très abîmé' : loan.copy?.etat}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            onClick={() => handleReturn(loan.id)}
                                            className="bg-sky-600 hover:bg-sky-700"
                                        >
                                            Retourner
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Returned Loans */}
            {returnedLoans.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Historique des Emprunts ({returnedLoans.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {returnedLoans.map((loan) => (
                                <div key={loan.id} className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg">{loan.copy?.book?.title}</h4>
                                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                                            <p>Emprunté le: {new Date(loan.loanDate).toLocaleDateString('fr-FR')}</p>
                                            <p>Retourné le: {new Date(loan.returnDate).toLocaleDateString('fr-FR')}</p>
                                            <p>État de l'exemplaire: {loan.copy?.etat === 'abime' ? 'Abîmé' : loan.copy?.etat === 'tres_abime' ? 'Très abîmé' : loan.copy?.etat}</p>
                                        </div>
                                        <Badge variant="secondary" className="mt-2">Retourné</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Current Reservations */}
            <Card>
                <CardHeader>
                    <CardTitle>Mes Réservations ({userReservations.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {userReservations.length === 0 ? (
                        <p className="text-gray-500">Aucune réservation</p>
                    ) : (
                        <div className="space-y-4">
                            {userReservations.map((reservation) => (
                                <div key={reservation.id} className="flex justify-between items-center p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg">{reservation.book?.title}</h4>
                                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                                            <p>Réservé le: {new Date(reservation.reservationDate).toLocaleDateString('fr-FR')}</p>
                                            <p>Auteurs: {reservation.book?.authors?.map(a => a.name).join(', ') || "Auteur inconnu"}</p>
                                        </div>
                                        <Badge
                                            variant={
                                                reservation.status === 'CONFIRMED' ? 'default' :
                                                reservation.status === 'CANCELLED' ? 'destructive' : 'secondary'
                                            }
                                            className="mt-2"
                                        >
                                            {reservation.status === 'CONFIRMED' ? 'Confirmée' :
                                             reservation.status === 'CANCELLED' ? 'Annulée' : 'En attente'}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {reservation.status === 'PENDING' && (
                                            <Button
                                                onClick={() => handleCancelReservation(reservation.id)}
                                                variant="outline"
                                                className="border-red-300 text-red-600 hover:bg-red-50"
                                            >
                                                Annuler
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default BorrowedBooks;
