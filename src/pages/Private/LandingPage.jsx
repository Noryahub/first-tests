import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('readers');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.pageYOffset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <div className="bg-biblio-dark text-gray-300 font-sans scroll-smooth">
            <style jsx global>{`
                /* Effet Verre Dépoli (Glassmorphism) chic */
                .glass-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .glass-header {
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                /* Scrollbar masquée pour le carrousel */
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

                .bg-hero-pattern {
                    background-image: linear-gradient(to right bottom, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.85)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
                }
            `}</style>

            {/* Header */}
            <header className={`fixed w-full z-50 transition-all duration-300 top-0 left-0 ${scrolled ? 'glass-header py-2' : 'bg-transparent py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <i className="fa-solid fa-book-bookmark text-biblio-accent text-2xl"></i>
                        <span className="font-serif text-2xl font-bold text-white tracking-wider">BiblioTech</span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8 font-medium">
                        <button onClick={() => scrollToSection('features')} className="hover:text-biblio-accent transition">Fonctionnalités</button>
                        <button onClick={() => scrollToSection('roles')} className="hover:text-biblio-accent transition">Portails</button>
                        <button onClick={() => scrollToSection('showcase')} className="hover:text-biblio-accent transition">Vitrine</button>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-white hover:text-biblio-accent transition px-4 py-2">Espace Lecteur</a>
                        <a href="#" className="bg-biblio-accent text-biblio-dark px-5 py-2.5 rounded-sm font-bold hover:bg-yellow-600 transition shadow-lg flex items-center">
                            <i className="fa-solid fa-user-shield mr-2"></i> Accès Staff
                        </a>
                    </div>

                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white text-2xl">
                        <i className={mobileMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'}></i>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden glass-header absolute w-full px-4 pt-4 pb-8 shadow-xl">
                        <nav className="flex flex-col space-y-4 font-medium text-center">
                            <button onClick={() => scrollToSection('features')} className="hover:text-biblio-accent py-2">Fonctionnalités</button>
                            <button onClick={() => scrollToSection('roles')} className="hover:text-biblio-accent py-2">Portails</button>
                            <a href="#" className="text-biblio-accent font-bold border border-biblio-accent py-2 mx-10 rounded-sm">Espace Lecteur</a>
                            <a href="#" className="bg-biblio-accent text-biblio-dark font-bold py-2 mx-10 rounded-sm">Accès Staff</a>
                        </nav>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 bg-hero-pattern bg-cover bg-center bg-fixed">
                <div className="absolute top-1/4 left-0 w-64 h-64 bg-biblio-accent opacity-10 blur-3xl rounded-full"></div>
                <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-900 opacity-20 blur-3xl rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
                    <div className="md:w-3/5 text-center md:text-left mb-12 md:mb-0">
                        <span className="text-biblio-accent font-bold tracking-widest uppercase text-sm mb-4 inline-block">Système de Gestion Intégré v1.0</span>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                            L'Excellence au service de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-biblio-accent to-yellow-200">Connaissance.</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 md:pr-12 font-light leading-relaxed">
                            Une plateforme unifiée orchestrant le cycle de vie des ouvrages, de l'acquisition à l'emprunt. Conçue pour les professionnels, pensée pour les lecteurs.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <button onClick={() => scrollToSection('showcase')} className="bg-biblio-accent text-biblio-dark px-8 py-4 rounded-sm font-bold text-lg hover:bg-yellow-600 transition shadow-lg shadow-biblio-accent/20 flex items-center justify-center">
                                Explorer le Catalogue <i className="fa-solid fa-arrow-right ml-3"></i>
                            </button>
                            <button onClick={() => scrollToSection('features')} className="border-2 border-gray-500 text-gray-300 px-8 py-4 rounded-sm font-bold text-lg hover:border-biblio-accent hover:text-biblio-accent transition flex items-center justify-center group">
                                Découvrir l'Architecture <i className="fa-solid fa-sitemap ml-3 text-gray-500 group-hover:text-biblio-accent transition"></i>
                            </button>
                        </div>
                    </div>
                    <div className="md:w-2/5 relative">
                        <div className="glass-card p-2 rounded-2xl transform rotate-2 hover:rotate-0 transition duration-500 shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Interface Dashboard" className="rounded-xl shadow-inner opacity-90" />
                            <div className="absolute top-4 right-4 bg-biblio-accent text-biblio-dark text-xs font-bold px-3 py-1 rounded-full">
                                Live Sync
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
                    <i className="fa-solid fa-chevron-down text-2xl"></i>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-biblio-primary border-y border-gray-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                    <div className="text-center">
                        <div className="text-4xl font-serif font-bold text-white mb-2">15k+</div>
                        <div className="text-biblio-accent uppercase text-sm tracking-wider font-bold">Ouvrages Référencés</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-serif font-bold text-white mb-2">4,500</div>
                        <div className="text-biblio-accent uppercase text-sm tracking-wider font-bold">Abonnés Actifs</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-serif font-bold text-white mb-2">98%</div>
                        <div className="text-biblio-accent uppercase text-sm tracking-wider font-bold">Disponibilité Système</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-serif font-bold text-white mb-2">24/7</div>
                        <div className="text-biblio-accent uppercase text-sm tracking-wider font-bold">Accès Numérique</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-biblio-dark relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Architecture Fonctionnelle</h2>
                        <div className="w-24 h-1 bg-biblio-accent mx-auto mb-6"></div>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Basé sur une modélisation de données rigoureuse, notre système distingue l'œuvre intellectuelle de sa copie physique pour une gestion sans faille.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        <div className="glass-card p-8 rounded-xl hover:bg-white/5 transition duration-300 group">
                            <div className="w-16 h-16 bg-biblio-accent/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-biblio-accent transition">
                                <i className="fa-solid fa-database text-biblio-accent text-2xl group-hover:text-biblio-dark"></i>
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-white mb-4">Catalogue Structuré (ISBN)</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Gestion centralisée des titres (LIVRE), auteurs et catégories. Une base de données normalisée garantissant l'intégrité des informations bibliographiques.
                            </p>
                        </div>
                        <div className="glass-card p-8 rounded-xl hover:bg-white/5 transition duration-300 group mt-0 md:-mt-8 border-biblio-accent/30">
                            <div className="w-16 h-16 bg-biblio-accent/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-biblio-accent transition">
                                <i className="fa-solid fa-barcode text-biblio-accent text-2xl group-hover:text-biblio-dark"></i>
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-white mb-4">Traçabilité à l'Exemplaire</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Chaque copie physique possède son code-barre unique. Suivez l'état et la localisation exacte de chaque objet en temps réel.
                            </p>
                        </div>
                        <div className="glass-card p-8 rounded-xl hover:bg-white/5 transition duration-300 group">
                            <div className="w-16 h-16 bg-biblio-accent/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-biblio-accent transition">
                                <i className="fa-solid fa-rotate text-biblio-accent text-2xl group-hover:text-biblio-dark"></i>
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-white mb-4">Flux de Circulation Hybride</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Système intelligent gérant les Prêts (sur exemplaire disponible) et les Réservations (sur titre indisponible) avec gestion de file d'attente.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roles Section */}
            <section id="roles" className="py-24 bg-biblio-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="md:flex md:items-center md:justify-between mb-16">
                        <div className="mb-8 md:mb-0">
                            <h2 className="font-serif text-4xl font-bold text-white mb-4">Portails Dédiés</h2>
                            <p className="text-xl text-gray-400">Interfaces optimisées selon le profil utilisateur.</p>
                        </div>
                        <div className="glass-card p-1 rounded-lg inline-flex">
                            <button
                                onClick={() => setActiveTab('readers')}
                                className={`px-6 py-3 rounded-md font-bold transition flex items-center ${activeTab === 'readers' ? 'bg-biblio-accent text-biblio-dark shadow-md' : 'text-gray-400 hover:text-white'}`}
                            >
                                <i className="fa-solid fa-book-reader mr-3"></i> Espace Lecteurs
                            </button>
                            <button
                                onClick={() => setActiveTab('staff')}
                                className={`px-6 py-3 rounded-md font-bold transition flex items-center ml-2 ${activeTab === 'staff' ? 'bg-biblio-accent text-biblio-dark shadow-md' : 'text-gray-400 hover:text-white'}`}
                            >
                                <i className="fa-solid fa-user-tie mr-3"></i> Back-Office Staff
                            </button>
                        </div>
                    </div>

                    <div className="glass-card p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-biblio-accent opacity-5 blur-3xl rounded-full pointer-events-none"></div>

                        {activeTab === 'readers' && (
                            <div className="md:flex items-center transition-opacity duration-300">
                                <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
                                    <h3 className="font-serif text-3xl font-bold text-white mb-6">Votre Bibliothèque, partout.</h3>
                                    <ul className="space-y-5 mb-8">
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-check-circle text-biblio-accent mt-1 mr-4"></i>
                                            <div>
                                                <h4 className="font-bold text-white">Recherche Intuitive</h4>
                                                <p className="text-sm text-gray-400">Filtrage par titre, auteur ou ISBN avec affichage de disponibilité en temps réel.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-check-circle text-biblio-accent mt-1 mr-4"></i>
                                            <div>
                                                <h4 className="font-bold text-white">Réservations One-Click</h4>
                                                <p className="text-sm text-gray-400">Positionnez-vous sur un ouvrage indisponible et suivez votre rang.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fa-solid fa-check-circle text-biblio-accent mt-1 mr-4"></i>
                                            <div>
                                                <h4 className="font-bold text-white">Tableau de Bord Personnel</h4>
                                                <p className="text-sm text-gray-400">Historique des lectures, alertes de retour et gestion du profil.</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <button className="bg-transparent border-2 border-biblio-accent text-biblio-accent px-8 py-3 rounded-sm font-bold hover:bg-biblio-accent hover:text-biblio-dark transition">
                                        Se Connecter / S'inscrire
                                    </button>
                                </div>
                                <div className="md:w-1/2">
                                    <img src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Lecteur" className="rounded-xl shadow-2xl opacity-80 hover:opacity-100 transition duration-500 border border-white/10" />
                                </div>
                            </div>
                        )}

                        {activeTab === 'staff' && (
                            <div className="md:flex items-center transition-opacity duration-300">
                                <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12 order-2">
                                    <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Staff Dashboard" className="rounded-xl shadow-2xl opacity-80 hover:opacity-100 transition duration-500 border border-white/10" />
                                </div>
                                <div className="md:w-1/2 order-1 md:pr-12">
                                    <div className="inline-block bg-biblio-accent text-biblio-dark text-xs font-bold px-3 py-1 rounded-full mb-4">Accès Sécurisé Requis</div>
                                    <h3 className="font-serif text-3xl font-bold text-white mb-6">Administration & Logistique</h3>
                                    <p className="text-gray-300 mb-8">
                                        Interface professionnelle pour les Bibliothécaires et Administrateurs, permettant une gestion granulaire des ressources.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="glass-card p-4 rounded-lg">
                                            <i className="fa-solid fa-boxes-packing text-biblio-accent mb-2"></i>
                                            <h4 className="font-bold">Inventaire</h4>
                                            <p className="text-xs text-gray-400">Ajout/Scan d'exemplaires</p>
                                        </div>
                                        <div className="glass-card p-4 rounded-lg">
                                            <i className="fa-solid fa-users-cog text-biblio-accent mb-2"></i>
                                            <h4 className="font-bold">CRM Abonnés</h4>
                                            <p className="text-xs text-gray-400">Inscriptions et radiations</p>
                                        </div>
                                        <div className="glass-card p-4 rounded-lg">
                                            <i className="fa-solid fa-hand-holding-hand text-biblio-accent mb-2"></i>
                                            <h4 className="font-bold">Circulation</h4>
                                            <p className="text-xs text-gray-400">Prêts et retours rapides</p>
                                        </div>
                                        <div className="glass-card p-4 rounded-lg bg-biblio-accent/10 border-biblio-accent/30">
                                            <i className="fa-solid fa-shield-halved text-biblio-accent mb-2"></i>
                                            <h4 className="font-bold">Admin Super.</h4>
                                            <p className="text-xs text-gray-400">Gestion du staff HR</p>
                                        </div>
                                    </div>
                                    <button className="bg-biblio-accent text-biblio-dark px-8 py-3 rounded-sm font-bold hover:bg-yellow-600 transition shadow-md">
                                        <i className="fa-solid fa-lock mr-2"></i> Connexion Back-Office
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Showcase Section */}
            <section id="showcase" className="py-24 bg-biblio-dark overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="font-serif text-3xl font-bold text-white mb-2">Dernières Acquisitions</h2>
                        <p className="text-gray-400">Sélection des ouvrages récemment ajoutés au catalogue.</p>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <button className="glass-card w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-biblio-accent hover:text-biblio-dark transition">
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button className="glass-card w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-biblio-accent hover:text-biblio-dark transition">
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar no-scrollbar snap-x snap-mandatory px-4 md:px-0 space-x-6 max-w-7xl mx-auto">
                    <div className="flex-shrink-0 w-64 snap-center group">
                        <div className="relative rounded-lg overflow-hidden shadow-2xl h-96 mb-4">
                            <img src="https://m.media-amazon.com/images/I/81GeAcdMCAL._SY466_.jpg" alt="Book Cover" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-biblio-dark via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-biblio-accent text-biblio-dark text-xs font-bold px-2 py-1 rounded-sm uppercase">Nouveau</span>
                            </div>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-white hover:text-biblio-accent transition truncate">Dune</h3>
                        <p className="text-sm text-gray-400">Frank Herbert</p>
                    </div>
                    <div className="flex-shrink-0 w-64 snap-center group mt-8">
                        <div className="relative rounded-lg overflow-hidden shadow-2xl h-96 mb-4">
                            <img src="https://m.media-amazon.com/images/I/91b0C2YNSrL._SY466_.jpg" alt="Book Cover" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-biblio-dark via-transparent to-transparent opacity-60"></div>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-white hover:text-biblio-accent transition truncate">Harry Potter à l'école des sorciers</h3>
                        <p className="text-sm text-gray-400">J.K. Rowling</p>
                    </div>
                    <div className="flex-shrink-0 w-64 snap-center group">
                        <div className="relative rounded-lg overflow-hidden shadow-2xl h-96 mb-4">
                            <img src="https://m.media-amazon.com/images/I/71Q1Iu4suSL._SY466_.jpg" alt="Book Cover" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-biblio-dark via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Populaire</span>
                            </div>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-white hover:text-biblio-accent transition truncate">Le Seigneur des Anneaux</h3>
                        <p className="text-sm text-gray-400">J.R.R. Tolkien</p>
                    </div>
                    <div className="flex-shrink-0 w-64 snap-center group mt-8">
                        <div className="relative rounded-lg overflow-hidden shadow-2xl h-96 mb-4">
                            <img src="https://m.media-amazon.com/images/I/81WcnNQ-TBL._SY466_.jpg" alt="Book Cover" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-biblio-dark via-transparent to-transparent opacity-60"></div>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-white hover:text-biblio-accent transition truncate">Big Data</h3>
                        <p className="text-sm text-gray-400">Viktor Mayer-Schönberger</p>
                    </div>
                    <div className="flex-shrink-0 w-64 snap-center group">
                        <div className="relative rounded-lg overflow-hidden shadow-2xl h-96 mb-4">
                            <img src="https://m.media-amazon.com/images/I/71kxa1-0mfL._SY466_.jpg" alt="Book Cover" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-biblio-dark via-transparent to-transparent opacity-60"></div>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-white hover:text-biblio-accent transition truncate">1984</h3>
                        <p className="text-sm text-gray-400">George Orwell</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-biblio-primary pt-20 pb-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <i className="fa-solid fa-book-bookmark text-biblio-accent text-3xl"></i>
                            <span className="font-serif text-3xl font-bold text-white tracking-wider">BiblioTech</span>
                        </div>
                        <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
                            La solution de référence pour la gestion moderne des centres de ressources documentaires. Allie rigueur technique et expérience utilisateur fluide.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-biblio-accent hover:bg-white/10 transition">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a href="#" className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-biblio-accent hover:bg-white/10 transition">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="#" className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-biblio-accent hover:bg-white/10 transition">
                                <i className="fa-brands fa-github"></i>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-biblio-accent transition flex items-center">
                                <i className="fa-solid fa-chevron-right text-xs mr-2"></i> Catalogue
                            </a></li>
                            <li><a href="#" className="text-gray-400 hover:text-biblio-accent transition flex items-center">
                                <i className="fa-solid fa-chevron-right text-xs mr-2"></i> Espace Membre
                            </a></li>
                            <li><a href="#" className="text-gray-400 hover:text-biblio-accent transition flex items-center">
                                <i className="fa-solid fa-chevron-right text-xs mr-2"></i> Portail Staff
                            </a></li>
                            <li><a href="#" className="text-gray-400 hover:text-biblio-accent transition flex items-center">
                                <i className="fa-solid fa-chevron-right text-xs mr-2"></i> API Documentation
                            </a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Contact Pro</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start">
                                <i className="fa-solid fa-location-dot mt-1 mr-3 text-biblio-accent"></i>
                                101, Avenue de la Culture, TechParc
                            </li>
                            <li className="flex items-center">
                                <i className="fa-solid fa-phone mr-3 text-biblio-accent"></i>
                                +33 1 23 45 67 89
                            </li>
                            <li className="flex items-center">
                                <i className="fa-solid fa-envelope mr-3 text-biblio-accent"></i>
                                support@bibliotech.io
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; 2025 BiblioTech Solutions. Tous droits réservés.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-300 transition">Mentions Légales</a>
                        <a href="#" className="hover:text-gray-300 transition">Politique de Confidentialité</a>
                        <a href="#" className="hover:text-gray-300 transition">SLA</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;