# MusiqueAPI
MusiqueAPI est une plateforme robuste et flexible pour explorer, gérer et partager des collections musicales. Avec une documentation complète via Swagger UI et une suite de tests complets.

## Caractéristiques

Swagger: Une documentation interactive de l'API accessible via Swagger UI pour faciliter la compréhension et l'utilisation des endpoints disponibles.

Tests: Une suite de tests unitaires et d'intégration garantissant la fiabilité et la robustesse du code.

Musique: Des fonctionnalités complètes pour la gestion et l'accès à une vaste collection de musique, y compris la recherche, le filtrage, et la personnalisation.

## Installation
Pour commencer à utiliser MusiqueAPI, clonez le dépôt et installez les dépendances nécessaires en suivant ces étapes :

```
git clone https://github.com/wllmz/tp-node-musique.git
cd API
npm install
```
 ## Utilisation

Pour démarrer le serveur, exécutez :

```
npm start
```
Une fois le serveur en fonction, la documentation Swagger peut être consultée à :
```
http//localhost:5000/api-docs
```

## Routes
L'API fournit les routes suivantes :

moduleRoute.js: endpoints pour la gestion des modules.

musicRoute.js: endpoints pour parcourir, ajouter, et modifier des entrées musicales.

userRoute.js: endpoints pour la gestion des utilisateurs.

voteRoute.js: endpoints permettant aux utilisateurs de voter pour leurs morceaux préférés.


## Tests
Pour exécuter la suite de tests, utilisez la commande suivante :

```
npm run test
```
