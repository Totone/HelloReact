# Hello React !

## Prise en main de React
Projet réalisé dans le cadre du [cours Open Classroom sur React](https://openclassrooms.com/fr/courses/4664381-realisez-une-application-web-avec-react-js/ "Réalisez une application web avec React.js")

## Objectif
Assimiler les notions propres à React à travers des exercices  d'application  

* Architecture  
* Syntaxe  
* Fonctionnement  
* etc...  

### Exercices 
 
1. Memory  
    Jeu de cartes  
    Plateau de 6x6 cartes, il fut trouver les différentes paires  
    Compteur de cartes et Hall of Fame  

## Concepts étudiés

* Notion de composants et de props  
    Composants: Base de React qui consiste à créer des composants autonomes contenant le nécessaire (structure, styles, comportements) à leur bon fonctionnement  
    Props: Équivalent des attributs en React  
* DOM virtuel  
    Technique permettant d'aller beaucoup plus vite qu'en utilisant le DOM du navigateur en n'actualisant ce dernier que quand et où c'est nécessaire  
* ES2015  
    Utilisation des nouveautés de ES6 pour React (fonctions fléchées, classes, déstructuration, import/export,..)  
* JSX  
    Syntaxe utilisée par React pour écrire des composants, ressemblant un peu à du HTML/XML mais avec ses spécificités  
    * Grappe  
        Portion de code JSX  
* Fonctions pures  
    Première manière d'écrire des composants React et largement plus utilisée. Les fonctions pures renvoient la même chose pour les mêmes arguments, faciles à tester  
* Gestion des événements  
    Conservation de la lisibilité immédiate (déclaration "à la volée") + Optimisation de la gestion des events en interne par React  
* Expressions JSX et conditions  
    * Différence expression/instruction  
        React utilise des expressions, non des instructions  
        -> Boucles, conditions if, etc impossibles  
    * Équivalents de if en JSX  
        Opérateur &&: (cond && expression_à_écrire_si_cond===true)  
        Si cond===false: rien n'est écrit (block ignoré)  
    * Équivalents de if/else  
        Utiliser opérateurs ternaires: cond? si_cond===true : si_cond===false;  
    * Équivalents des boucles en JSX  
        Utiliser la méthode map des arrays  
* Composants parents et enfants  
    Parent: Composant qui appelle le render  
    Enfants: Tous les autres  
* Props techniques  
    * key  
        Clé unique à donner à chaque élément d'un array pour pouvoir mieux les gérer  
    * children  
        Liste auto-renseignée contenant la liste des enfants d'un composant  
    * dangerouslySetInnerHTML  
        Injecter du balisage manuel dans une grappe  
        N'utiliser qu'en dernier recours (dangereux)  
* Propriété statique .defaultProps  
    Donner des valeurs par défaut aux propriétés d'un composant  
* Propriété statique .propTypes (dev only)  
    Définir les types des props passées en paramètres  
