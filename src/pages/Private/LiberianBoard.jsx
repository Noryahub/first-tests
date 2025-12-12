import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCards } from "./StatsCards";
import { AlarmClock, BookCopy, Clock9, FileStack, Users, Calendar, BookOpen } from "lucide-react";
import { ExemplairesTab } from "@/components/ExemplairesTab";
import { AuthContext } from "@/context/ExpressAuthContext";
import { getEmprunts, returnEmprunt } from "@/services/EmpruntService";
import { getReservations } from "@/services/ResevationService";
import { adminGetUsers } from "@/services/userService";

export const LiberianBoard = () => {
    const { user } = React.useContext(AuthContext);
    const [stats, setStats] = useState({
        totalLoans: 0,
        activeLoans: 0,
        overdueLoans: 0,
        totalReservations: 0,
        pendingReservations: 0,
        totalUsers:0,
    });
    const [loans, setLoans] = useState([]);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [loansData, reservationsData, usersData] = await Promise.all([
                getEmprunts(),
                getReservations(),
                adminGetUsers(),
            ]);

            const activeLoans = loansData.filter(loan => !loan.returnDate);
            const overdueLoans = activeLoans.filter(loan => new Date(loan.dueDate) < new Date());
            const pendingReservations = reservationsData.filter(res => res.status === 'PENDING');

            setStats({
                totalLoans: loansData.length,
                activeLoans: activeLoans.length,
                overdueLoans: overdueLoans.length,
                totalReservations: reservationsData.length,
                pendingReservations: pendingReservations.length,
                totalUsers:usersData.length,
            });

            setLoans(activeLoans);
            setReservations(pendingReservations);
        } catch (error) {
            console.error("Error loading stats:", error);
        }
    };

    const handleReturn = async (loanId) => {
        try {
            await returnEmprunt(loanId);
            loadStats(); // Refresh data
            alert("Emprunt retourné avec succès");
        } catch (error) {
            console.error("Error returning loan:", error);
            alert("Erreur lors du retour");
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Tableau de Bord Bibliothécaire</h1>
                <p className="text-gray-600">Bonjour, <span className="text-sky-500 font-semibold">{user?.nom}</span>! Gérez les emprunts et exemplaires.</p>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-wrap gap-4 py-4">
                <StatsCards
                    title="Emprunts Totaux"
                    amount={stats.totalLoans.toString()}
                    icon={<FileStack size={20} />}
                />
                <StatsCards
                    title="Emprunts Actifs"
                    amount={stats.activeLoans.toString()}
                    icon={<BookOpen size={20} />}
                />
                <StatsCards
                    title="Emprunts en Retard"
                    amount={stats.overdueLoans.toString()}
                    icon={<AlarmClock size={20} />}
                    className="border-red-200 bg-red-50"
                />
                <StatsCards
                    title="Réservations Totales"
                    amount={stats.totalReservations.toString()}
                    icon={<Calendar size={20} />}
                />
                <StatsCards
                    title="Réservations en Attente"
                    amount={stats.pendingReservations.toString()}
                    icon={<Clock9 size={20} />}
                />
                <StatsCards
                    title="Utilisateurs total"
                    amount={stats.totalUsers.toString()}
                    icon={<Users size={20} />}
                />
            </div>

            {/* Management Sections */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Gestion des Exemplaires</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ExemplairesTab />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Gestion des Emprunts ({loans.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loans.length === 0 ? (
                            <p className="text-gray-500">Aucun emprunt actif</p>
                        ) : (
                            <div className="space-y-4">
                                {loans.map((loan) => (
                                    <div key={loan.id} className="flex justify-between items-center p-4 border rounded-lg">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg">{loan.copy?.book?.title}</h4>
                                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                                                <p>Utilisateur: {loan.user?.nom} ({loan.user?.email})</p>
                                                <p>Emprunté le: {new Date(loan.loanDate).toLocaleDateString('fr-FR')}</p>
                                                <p>À retourner avant: {new Date(loan.dueDate).toLocaleDateString('fr-FR')}</p>
                                                <p>État exemplaire: {loan.copy?.etat}</p>
                                            </div>
                                        </div>
                                        <Button onClick={() => handleReturn(loan.id)} className="bg-green-600 hover:bg-green-700">
                                            Retourner
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Réservations en Attente ({reservations.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {reservations.length === 0 ? (
                            <p className="text-gray-500">Aucune réservation en attente</p>
                        ) : (
                            <div className="space-y-4">
                                {reservations.map((reservation) => (
                                    <div key={reservation.id} className="flex justify-between items-center p-4 border rounded-lg">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg">{reservation.book?.title}</h4>
                                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                                                <p>Utilisateur: {reservation.user?.nom} ({reservation.user?.email})</p>
                                                <p>Réservé le: {new Date(reservation.reservationDate).toLocaleDateString('fr-FR')}</p>
                                                <p>Auteurs: {reservation.book?.authors?.map(a => a.name).join(', ') || "Auteur inconnu"}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-yellow-600 font-medium">En attente</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LiberianBoard;
