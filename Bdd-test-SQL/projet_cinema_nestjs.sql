-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 02 sep. 2021 à 14:30
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `projet_cinema_nestjs`
--

-- --------------------------------------------------------

--
-- Structure de la table `cinemas`
--

DROP TABLE IF EXISTS `cinemas`;
CREATE TABLE IF NOT EXISTS `cinemas` (
  `cinema_id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`cinema_id`),
  UNIQUE KEY `IDX_5723a8ea9a7ab9f74c46704c00` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cinemas`
--

INSERT INTO `cinemas` (`cinema_id`, `nom`) VALUES
(1, 'Kinepolis Lomme'),
(2, 'Kinepolis Mulhouse'),
(3, 'Kinepolis Nancy'),
(4, 'Kinepolis Nîmes');

-- --------------------------------------------------------

--
-- Structure de la table `films`
--

DROP TABLE IF EXISTS `films`;
CREATE TABLE IF NOT EXISTS `films` (
  `film_id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `duree` int(11) NOT NULL,
  PRIMARY KEY (`film_id`),
  UNIQUE KEY `IDX_e21f2dd2c8b0889547cbd808ba` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `films`
--

INSERT INTO `films` (`film_id`, `nom`, `duree`) VALUES
(1, 'Dune', 155),
(2, 'Shang-Chi et la légende des dix anneaux', 134),
(3, 'Malignant', 111),
(4, 'Kaamelott - Premier volet', 120),
(5, 'Free Guy', 115),
(6, 'OSS 117 : Alerte rouge en Afrique noire', 116),
(7, 'OSS 117 :The Suicide Squad', 132),
(8, 'Space Jam : Nouvelle ère', 115),
(9, 'Baby Boss 2 : une affaire de famille', 107);

-- --------------------------------------------------------

--
-- Structure de la table `salles`
--

DROP TABLE IF EXISTS `salles`;
CREATE TABLE IF NOT EXISTS `salles` (
  `salle_id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` int(11) NOT NULL,
  `nbPlaces` int(11) NOT NULL,
  `cinemaId` int(11) DEFAULT NULL,
  PRIMARY KEY (`salle_id`),
  UNIQUE KEY `UQ_NAMES` (`numero`,`cinemaId`),
  KEY `FK_049078da704550e80d7561ccaf6` (`cinemaId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `salles`
--

INSERT INTO `salles` (`salle_id`, `numero`, `nbPlaces`, `cinemaId`) VALUES
(1, 1, 150, 1),
(2, 2, 200, 1),
(3, 3, 180, 1),
(4, 1, 200, 2),
(5, 2, 200, 2),
(6, 3, 200, 2),
(7, 1, 200, 3),
(8, 2, 200, 3),
(9, 1, 100, 4),
(10, 2, 350, 4),
(12, 3, 150, 3),
(13, 3, 169, 4);

-- --------------------------------------------------------

--
-- Structure de la table `seances`
--

DROP TABLE IF EXISTS `seances`;
CREATE TABLE IF NOT EXISTS `seances` (
  `seance_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `cinemaId` int(11) DEFAULT NULL,
  `salleId` int(11) DEFAULT NULL,
  `filmId` int(11) DEFAULT NULL,
  PRIMARY KEY (`seance_id`),
  UNIQUE KEY `UQ_NAMES` (`date`,`cinemaId`,`salleId`),
  KEY `FK_0a19479b98bbb90f80ef3f6680c` (`cinemaId`),
  KEY `FK_41e56c5d3e1398a63cd926a186c` (`salleId`),
  KEY `FK_d51edb270a60e579eed02dc1eeb` (`filmId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `seances`
--

INSERT INTO `seances` (`seance_id`, `date`, `cinemaId`, `salleId`, `filmId`) VALUES
(1, '2021-09-19 13:57:59', 1, 1, 1),
(2, '2021-09-02 13:57:10', 1, 1, 1),
(3, '2021-09-11 13:57:59', 1, 1, 1),
(4, '2021-09-11 17:57:59', 1, 2, 1),
(5, '2021-08-31 17:57:59', 1, 2, 1),
(6, '2021-09-08 10:57:59', 1, 2, 1),
(7, '2021-09-09 10:57:59', 1, 2, 1),
(8, '2021-09-04 10:57:59', 1, 3, 2),
(9, '2021-09-09 16:57:59', 1, 3, 3),
(10, '2021-09-09 09:00:59', 2, 4, 7),
(11, '2021-09-13 14:20:37', 2, 4, 7),
(12, '2021-09-11 09:00:59', 3, 7, 5),
(13, '2021-09-12 14:28:19', 2, 4, 5);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `salles`
--
ALTER TABLE `salles`
  ADD CONSTRAINT `FK_049078da704550e80d7561ccaf6` FOREIGN KEY (`cinemaId`) REFERENCES `cinemas` (`cinema_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `seances`
--
ALTER TABLE `seances`
  ADD CONSTRAINT `FK_0a19479b98bbb90f80ef3f6680c` FOREIGN KEY (`cinemaId`) REFERENCES `cinemas` (`cinema_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_41e56c5d3e1398a63cd926a186c` FOREIGN KEY (`salleId`) REFERENCES `salles` (`salle_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d51edb270a60e579eed02dc1eeb` FOREIGN KEY (`filmId`) REFERENCES `films` (`film_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
