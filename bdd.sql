-- phpMyAdmin SQL Dump
-- version 5.0.4deb2ubuntu5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 10 mars 2022 à 09:46
-- Version du serveur :  8.0.28-0ubuntu0.21.10.3
-- Version de PHP : 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Planning`
--
CREATE DATABASE Planning;
-- --------------------------------------------------------

--
-- Structure de la table `Cours`
--

CREATE TABLE `Cours` (
                         `cours_id` int NOT NULL,
                         `matiere_id` int DEFAULT NULL,
                         `prof_id` int DEFAULT NULL,
                         `debut` int NOT NULL,
                         `fin` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Matieres`
--

CREATE TABLE `Matieres` (
                            `matiere_id` int NOT NULL,
                            `matiere_libelle` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Profs`
--

CREATE TABLE `Profs` (
                         `prof_id` int NOT NULL,
                         `prof_libelle` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Cours`
--
ALTER TABLE `Cours`
    ADD PRIMARY KEY (`cours_id`),
    ADD KEY `fk_matiere_cours` (`matiere_id`),
    ADD KEY `fk_prof_cours` (`prof_id`);

--
-- Index pour la table `Matieres`
--
ALTER TABLE `Matieres`
    ADD PRIMARY KEY (`matiere_id`);

--
-- Index pour la table `Profs`
--
ALTER TABLE `Profs`
    ADD PRIMARY KEY (`prof_id`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Cours`
--
ALTER TABLE `Cours`
    ADD CONSTRAINT `fk_matiere_cours` FOREIGN KEY (`matiere_id`) REFERENCES `Matieres` (`matiere_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_prof_cours` FOREIGN KEY (`prof_id`) REFERENCES `Profs` (`prof_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
