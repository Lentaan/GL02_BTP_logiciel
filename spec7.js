const parsfile = require('./parsfile'); //appel du parser
const fs = require('fs');
const readlineSync = require('readline-sync');
const path = require('path');

let exam1;
let exam2;


//=============================choisir un fichier perso=========================================//

// Récupérer la liste des fichiers disponibles dans le répertoire (inutile)
const examfile = fs.readdirSync('./exam'); // Le chemin du répertoire où se trouvent ses propres fichiers

// Afficher les fichiers disponibles à l'utilisateur
console.log('Fichiers disponibles :');
examfile.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
});

// Demander à l'utilisateur de choisir le premier fichier
let choix = readlineSync.questionInt('Choisissez un premier fichier en entrant son numéro : ');

// Vérifier si le choix est valide
if (choix > 0 && choix <= examfile.length) {
    exam1 = './exam/'+examfile[choix - 1];
    console.log(`Vous avez choisi : ${exam1}\n`);

} else {
    console.log('Choix invalide');
}


//========================================demander a quoi on souhaite le comparer====================================//


// Demander à l'utilisateur de choisir le premier fichier
choix = readlineSync.questionInt(`A quoi souhaitez-vous comparer ${exam1} ?\n 1. Vos fichiers personnals \n 2. La base de donnée\n`);

// Vérifier si le choix est valide
if (choix > 0 && choix <= 2) {
    console.log(`Vous avez choisi : ${choix}\n`);

} else {
    console.log('Choix invalide');
}
//===================================choisir le 2eme fichier==============================//
if(choix === 1){
    // Afficher les fichiers disponibles à l'utilisateur
    console.log('Fichiers disponibles :');
    examfile.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });

// Demander à l'utilisateur de choisir le premier fichier
    let choix = readlineSync.questionInt('Choisissez un premier fichier en entrant son numéro : ');

// Vérifier si le choix est valide
    if (choix > 0 && choix <= examfile.length) {
        exam2 = './exam/'+examfile[choix - 1];
        console.log(`Vous avez choisi : ${exam1}\n`);

    } else {
        console.log('Choix invalide');
    }

}else{
    // Récupérer la liste des fichiers disponibles dans le répertoire
    const files = fs.readdirSync('./SujetB_data'); // Le chemin du répertoire où se trouvent tes fichiers

// Afficher les fichiers disponibles à l'utilisateur
    console.log('Fichiers disponibles :');
    files.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });

    choix = readlineSync.questionInt('Choisissez un premier fichier en entrant son numéro : ');

// Vérifier si le choix est valide
    if (choix > 0 && choix <= files.length) {
        exam2 = './SujetB_data/'+files[choix - 1];
        console.log(`Vous avez choisi : ${exam1}`);

    } else {
        console.log('Choix invalide');
    }
}

//==============================Parser les fichiers=================================//
/*let dirPath = path.dirname(exam1);
console.log(dirPath);
console.log(`./${dirPath}/${exam1}`);*/


let questionExam1 = parsfile(exam1);
//console.log(questionExam1);

let questionExam2 = parsfile(exam2);
//console.log(questionExam2);

//=============================== Comparaison des questions des fichiers==================================//
let bool = false;

questionExam1.forEach((question1) => {
    const matchedQuestion = questionExam2.find((question2) => {
        return question1.name === question2.name && question1.answer === question2.answer && question1.type === question2.type;
    });
    if (matchedQuestion) {
        console.log(`La question "${question1.name}" est identique dans les deux examens.`);
        bool = true;
    }
});

if (!bool) {
    console.log('Aucune question identique n\'a été trouvée dans les deux examens.');
}

