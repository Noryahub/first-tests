import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AuthContext } from "@/context/ExpressAuthContext";
import { useContext } from "react";
import { updateCurrentUser } from "@/services/userService";
import { getEmpruntsByUser } from "@/services/EmpruntService";
import { getReservationsByUser } from "@/services/ResevationService";
import { User, Mail, Calendar, BookOpen, Clock, Edit, Key, Save, X } from "lucide-react";

export const CurrentUserProfile = () => {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userStats, setUserStats] = useState({
        totalLoans: 0,
        activeLoans: 0,
        totalReservations: 0,
        activeReservations: 0
    });

    // Form states
    const [formData, setFormData] = useState({
        nom: '',
        email: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Load user data and stats
    useEffect(() => {
        if (user) {
            setFormData({
                nom: user.nom || '',
                email: user.email || ''
            });
            loadUserStats();
        }
    }, [user]);

    const loadUserStats = async () => {
        try {
            const [loansData, reservationsData] = await Promise.all([
                getEmpruntsByUser(user.id),
                getReservationsByUser(user.id)
            ]);

            const activeLoans = loansData.filter(loan => !loan.returnDate);
            const activeReservations = reservationsData.filter(res => res.status !== 'CANCELLED');

            setUserStats({
                totalLoans: loansData.length,
                activeLoans: activeLoans.length,
                totalReservations: reservationsData.length,
                activeReservations: activeReservations.length
            });
        } catch (error) {
            console.error("Error loading user stats:", error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            const updatedUser = await updateCurrentUser(formData);
            setIsEditing(false);
            // The AuthContext should automatically update via the API call
            alert("Profil mis à jour avec succès!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Erreur lors de la mise à jour du profil: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            alert("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }

        try {
            setLoading(true);
            await updateCurrentUser({
                currentPassword: passwordData.currentPassword,
                password: passwordData.newPassword
            });
            setIsChangingPassword(false);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            alert("Mot de passe changé avec succès!");
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Erreur lors du changement de mot de passe: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'ADMIN': return 'bg-violet-700 text-white';
            case 'LIBRARIAN': return 'bg-yellow-500 text-white';
            case 'MEMBER': return 'bg-emerald-700 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const getRoleLabel = (role) => {
        switch (role) {
            case 'ADMIN': return 'Administrateur';
            case 'LIBRARIAN': return 'Bibliothécaire';
            case 'MEMBER': return 'Membre';
            default: return role;
        }
    };

    if (!user) {
        return <div className="p-6">Chargement...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Mon Profil</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Information */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Informations Personnelles
                                </CardTitle>
                                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <Edit className="w-4 h-4 mr-2" />
                                            Modifier
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Modifier le profil</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="nom">Nom complet</Label>
                                                <Input
                                                    id="nom"
                                                    value={formData.nom}
                                                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                                                    placeholder="Votre nom complet"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                    placeholder="votre.email@example.com"
                                                />
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                                    <X className="w-4 h-4 mr-2" />
                                                    Annuler
                                                </Button>
                                                <Button onClick={handleUpdateProfile} disabled={loading}>
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Sauvegarder
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Nom complet</p>
                                    <p className="font-medium">{user.nom}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-3">
                                <Badge className={getRoleColor(user.role)}>
                                    {getRoleLabel(user.role)}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Key className="w-5 h-5" />
                                Sécurité
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Key className="w-4 h-4 mr-2" />
                                        Changer le mot de passe
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Changer le mot de passe</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                                            <Input
                                                id="currentPassword"
                                                type="password"
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                                placeholder="Votre mot de passe actuel"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                                            <Input
                                                id="newPassword"
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                                placeholder="Minimum 6 caractères"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                                placeholder="Confirmer le nouveau mot de passe"
                                            />
                                        </div>
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" onClick={() => setIsChangingPassword(false)}>
                                                <X className="w-4 h-4 mr-2" />
                                                Annuler
                                            </Button>
                                            <Button onClick={handleChangePassword} disabled={loading}>
                                                <Save className="w-4 h-4 mr-2" />
                                                Changer
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </div>

                {/* Statistics */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                Mes Emprunts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-700">{userStats.activeLoans}</div>
                                <p className="text-sm text-gray-600">emprunts actifs</p>
                            </div>
                            <Separator />
                            <div className="text-center">
                                <p className="text-sm text-gray-600">total des emprunts</p>
                                <div className="text-3xl font-bold text-green-800">{userStats.totalLoans}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Mes Réservations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-600">{userStats.activeReservations}</div>
                                <p className="text-sm text-gray-600">réservations actives</p>
                            </div>
                            <Separator />
                            <div className="text-center">
                                <div className="text-xl font-semibold text-cyan-700">{userStats.totalReservations}</div>
                                <p className="text-sm text-gray-600">total des réservations</p>
                            </div>
                        </CardContent>
                    </Card>

                   
                </div>
                
            </div>
             <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Activité
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {userStats.totalLoans + userStats.totalReservations}
                                </div>
                                <p className="text-sm text-gray-600">actions totales</p>
                            </div>
                        </CardContent>
                    </Card>
        </div>
    );
};

export default CurrentUserProfile;


