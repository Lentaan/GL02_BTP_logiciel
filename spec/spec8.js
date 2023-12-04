const parser = require('../parser.js');
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
