# Api-cinema-nestJS

## Information
---
Bdd: Mysql

Database: projet_cinema_nestjs

Dependances: npm

---

## Base de données

#### Table Cinémas:

**``Structure``** :

-   cinema_id | int | AUTO_INCREMENT | PRIMARY KEY
-   nom | varchar | 

**``Régle``** : Le nom est unique pour empécher la création de deux cinémas identiques.

#### Table Salles:

**``Structure``** :
-   salle_id | int | AUTO_INCREMENT | PRIMARY KEY
-   numero | int |
-   nbPlaces | int
-   cinemaId | int | FOREIGN KEY (cinema_id)

**``Régle``** : La combinaison du numero et du cinemaId est unique, pour empécher qu'un cinema et deux salles identiques.

#### Table Films:

**``Structure``** :

-   film_id | int | AUTO_INCREMENT | PRIMARY KEY
-   nom | varchar |
-   duree | int

**``Régle``** : Le nom est unique pour empécher la création de deux films identiques.

#### Table Seances:

**``Structure``** :

-   senace_id | int | AUTO_INCREMENT | PRIMARY KEY
-   date | timestamp |
-   duree | int |
-   cinemaId | int | FOREIGN KEY (cinema_id)
-   salleId | int | FOREIGN KEY (salle_id)
-   filmId | int | FOREIGN KEY (film_id)

**``Régle``** : La combinaison du champ date, cinemaId et salleId est unique afin d'empêcher d'avoir de seance dans la même salle au même moment

---
### Liste des actions
#### Cinema :
-   Get cinemas
-   Get cinema By Id
-   Post cinema
-   Patch cinema
-   Delete cinema
#### Salle : 
-   Get salles
-   Get salle by id
-   Get salle by Cinema
-   Post salle
-   Patch salle
-   Delete salle
#### Film :
-   Get film
-   Get film by id
-   Get film by cinema
-   Get film by cinema pagination
-   Get film by cinema with seance
-   Post film
-   Patch film
-   Delete film
#### Séance:
-   Get seance
-   Get seance by id
-   Post seance
-   Patch seance
-   Delete seance
#### Ticket
-   Get Ticket

---

### Swaggger

En plus de Postman, Il est possible d'utiliser swagger sur l'URL suivante : "http://localhost:3000/api/"