"use strict";

// Création des caractéristiques de la scène

let persocat=["Nerd","Sportif","Blonde","Musicien","The Rock","Prof","Chevaucheur de cochon","Policier","Beau gosse","Eminem","Skieur"];
function choixcat(){ // Je créer une fonction qui choisit parmi la liste des musiques une musique au hasard grâce à son index dans le tableau
    let categorie = Math.floor(Math.random() *11); // Génère un chiffre entier entre 0 (inclus) et 10 (inclus). J'utilise math.random, couplé avec floor pour arrondir en dessous de la valeur. Je multiplie par 11 car sinon c'est juste entre 0 et 1.
    return persocat[categorie]; // Renvoie la categorie du personnage
}

let noms=["Pacôme","Agnes","Andre","Maddie","Luc","Maud","Balthazar","Paula","Emilien","Emily","Stanislas","Flavie"];
function choixnom(){
    let choix = Math.floor(Math.random() * 12);
    return noms[choix];
}

class Entagoniste{ // Création de la classe correspondant à une personne
    constructor(Categorie,nom,probadegats,probamort,probamortdeg,pdv){
        this.Categorie=Categorie;
        this.nom=nom;
        this.probadegats=probadegats;
        this.probamort=probamort;
        this.probamortdeg=probamortdeg;
        this.pdv=pdv;
    }
    Attaque(Perso){ // Je créer le principe de l'attaque de Jason
        if(this.nom==="Jason"){
            if(Math.random()<Perso.probamort){ // Tout est laissé au hasard avec Math.random
                if(Math.random()>Perso.probamortdeg){
                    this.pdv-=15; // J'enlève 15 pv à Jason
                    Perso.pdv=0; // Je met les pv de la victime choisie au hasard à 0
                    console.log(`Jason à tué ${Perso.nom} mais à subi 15 de dégats.`);
                }else{
                    if(Math.random()>Perso.probadegats){
                        this.pdv-=10;
                        console.log(`${Perso.nom} à esquivé une attaque de Jason et lui à infligé 10 de dégats.`);
                    }else{
                        console.log(`${Perso.nom} à esquivé une attaque de Jason`);
                    }
                }
            }else{
                Perso.pdv=0
                console.log(`Jason à tué ${Perso.nom}`);
            }
        }
    }
}

// Création des personnages

let Jason=new Entagoniste("Tueur","Jason",1,1,1,100); // Je créer les personnages avec Jason qui à une caatégorie spéciale à lui.
let P1=new Entagoniste(choixcat(),choixnom(),Math.random(),Math.random(),Math.random(),100);
let P2=new Entagoniste(choixcat(),choixnom(),Math.random(),Math.random(),Math.random(),100); // Toutes les caractéristiques des personnages sont choisies au hasard
let P3=new Entagoniste(choixcat(),choixnom(),Math.random(),Math.random(),Math.random(),100);
let P4=new Entagoniste(choixcat(),choixnom(),Math.random(),Math.random(),Math.random(),100);
let P5=new Entagoniste(choixcat(),choixnom(),Math.random(),Math.random(),Math.random(),100);

let entagonistes=[P1,P2,P3,P4,P5]; // Je rassemble les personnages dans un tableau
function choixvictime(){ // Je sélectionne dans ce tableau une victime de Jason au hasard
    let choice = Math.floor(Math.random() * 5);
    return entagonistes[choice];
}

// Mise en scène et actions
let nbvictimes=0; // J'initialise un compteur de victimes pour le cas ou Jason arrive à tuer tout le monde
let morts=[]; // J'initialise un tableau vide qui va stocker les noms des personnes tuées pour les retourner à la fin
while(Jason.pdv>0 && nbvictimes<5){ // Tant que Jason n'est pas mort ou que toute les personnes sont mortes
    let victime=choixvictime(); // Jason choisi une personne au hasard dans le tableau
    if(victime.pdv==0){ // Mais si cette personne est déjà morte
        if(morts.includes(victime.nom)==false){ // et que son nom n'est pas inscrite dans le tableau des morts, alors on l'inscris
            morts.push(victime.nom);
            nbvictimes++
            victime.Categorie="Mort";
        }else{ // Sinon on choisis une autre victime
            let victime =choixvictime();
        }
    }else{ // Si la victime choisie n'est pas morte, alors Jason l'attaque
        Jason.Attaque(victime);
    }
}
if(Jason.pdv<=0){ // Or si Jason est mort, les survivants ont gagnés et on affiche le nom des morts s'il y en a
    if(morts.length>0){
        console.log(`Les survivants ont gagnés mais RIP à ${morts}`);
    }else{
        console.log("Les survivants ont gagnés face à Jason");
    }
}
if(nbvictimes==5){ // Si le nombre de survivants est égal à 5, alors on affiche la phrase comme quoi Jason à gagner
    console.log("Les survivants ne sont plus de ce monde, Jason les as tous tués.");
}