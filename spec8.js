const parsfile = require('./parsfile');
const fs = require("fs");
const readlineSync = require("readline-sync");

//================================recupeper le fichier=======================//

const isValid = function(file) {

    const list = parsfile(file);
    console.log(list.length);

    let bool = false;

    if(list.length >=15 && list.length <= 20){
        bool = true;
    }

    const uniqueQuestions = new Set(list);
    const isUnique = uniqueQuestions.size === list.length;

    if (isUnique) {
        console.log("Le tableau ne contient que des questions uniques.");
    } else {
        console.log("Le tableau contient des doublons de questions.");
    }

    return bool && isUnique;

}


//console.log(isValid('SujetB_data/EM-U5-p36_37-Reading.gift'));
console.log(isValid('./exam/exam2.gift'));

















/*const parser = require('./parser.js');
const readlineSync = require('readline-sync');
list_question = parser();

function validerExamen(examen) {
    const nombreQuestions = examen.questions.length;
const parser = require('./parser.js');
const readlineSync = require('readline-sync');
list_question = parser();

function validerExamen(examen) {
    const nombreQuestions = examen.questions.length;

    // Vérifier que le nombre de questions est entre 15 et 20
    const estValideNombreQuestions = nombreQuestions >= 15 && nombreQuestions <= 20;

    // Vérifier s'il y a des questions en double
    const questionsUniques = new Set(examen.questions);
    const estValideQuestionsUniques = questionsUniques.size === nombreQuestions;

    // Vérifier si l'examen est valide en fonction des critères
    const estExamenValide = estValideNombreQuestions && estValideQuestionsUniques;

    return estExamenValide;
}

// Exemple d'utilisation :
const examen = parser.analyserExamen(); // Supposons que le parser retourne un objet avec les questions de l'examen

if (validerExamen(examen)) {
    console.log("L'examen est valide !");
} else {
    console.log("L'examen est invalide. Veuillez vérifier les critères.");
}

    // Vérifier que le nombre de questions est entre 15 et 20
    const estValideNombreQuestions = nombreQuestions >= 15 && nombreQuestions <= 20;

    // Vérifier s'il y a des questions en double
    const questionsUniques = new Set(examen.questions);
    const estValideQuestionsUniques = questionsUniques.size === nombreQuestions;

    // Vérifier si l'examen est valide en fonction des critères
    const estExamenValide = estValideNombreQuestions && estValideQuestionsUniques;

    return estExamenValide;
}

// Exemple d'utilisation :
const examen = parser.analyserExamen(); // Supposons que le parser retourne un objet avec les questions de l'examen

if (validerExamen(examen)) {
    console.log("L'examen est valide !");
} else {
    console.log("L'examen est invalide. Veuillez vérifier les critères.");
}
*/