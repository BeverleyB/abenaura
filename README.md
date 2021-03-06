# Abenaura

Site vitrine du restaurant Abenaura se situant à Toulouse.

Le site est découpé en plusieurs parties:

- Présentation du restaurant
- Récupération du menu du jour et renvoie sur les plateformes de livraison
- Galerie d'image de divers plats
- Localisation du restaurant avec adresse et horaires
- Partie contact avec formulaire de contact faisant appel à un serveur Node.js

## Galerie d'image

Utilisation de l'API Dropbox permettant de récupérer les images ajoutées par la directrice du restaurant.

## Localisation

Utilisation de l'API Google Map pour récupérer une carte gmap situant le restaurant.

## Menu du jour

En attente du retour d'Uber pour avoir accès aux scopes qui nous permettront d'utiliser l'API Uber afin de récupérer les données du menu du jour.
Pour le moment nous avons dû mettre les données en dures.

## Contact

Envoi de mail possible sur le compte Gmail de la directrice du restaurant grâce à un serveur Node.js se situant dans le dossier `server/` du projet.

# Hebergement et deploiement

Le site est deployé sur un serveur Ngninx depuis une machine virtuelle DigitalOcean. <br />
Le projet Angular est stocké dans le dossier angular et le build dans le html. <br />
Le nom de domaine a été acheté sur OVH. <br />
Le certificat SSL a été généré par Certbot. <br />
Les données sont transférées grâce à FileZila.

# Prérequis

Afin de pouvoir exécuter l'application sur votre poste, vous devez d'aborder installer les dépendances suivantes :

- NodeJS
- Angular cli

# Installation

## Node

1. Télécharger la version LTS de NodeJS [ici](https://nodejs.org/fr/download/)
2. Suivre les étapes d'installation en laissant les options par défaut.

## Angular cli

1. Après avoir installé NodeJS, ouvrir une invite de commande
2. Taper `npm install -g @angular/cli`

# Exécution

1. Ouvrir une invite de commande à la racine du projet
2. S'assurer d'avoir les dépendance npm installées `npm install`

Pour le frontend en local : Exécuter `ng serve`

Puis : Ouvrir un navigateur à l'adresse [http://localhost:4200](http://localhost:4200)

Pour le backend en local : Exécuter `node app.js`

# Build du projet

Executer `ng build --prod --output-hashing none`

# Auteur du site

Beverley Beranger
