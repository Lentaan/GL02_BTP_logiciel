const parser = require('./parser.js');//parser pour tous les exams
const parserExam = require('./parserExam.js');//parser pour lire 1 seul examen
/*const readline= require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});*/

list_question = parser();

//On recupere les questions des examens
exam1 = parserExam('./exam1.gift');
exam2 = parserExam('./exam2.gift');

console.log(exam1);


/*
// Fonction pour comparer les questions de deux examens
function compareExams(exam1, exam2) {
    // Comparaison basique : vérification des questions identiques
    const commonQuestions = exam1.filter(question => exam2.includes(question));
    return commonQuestions;
}




        // Extraire les questions du second examen
        const exam2Questions = extractQuestions(data2);

        // Comparer les questions des deux examens
        const commonQuestions = compareExams(exam1Questions, exam2Questions);

        // Afficher les questions communes
        console.log('Questions communes entre les deux examens :');
        commonQuestions.forEach((question, index) => {
            console.log(`${index + 1}. ${question}`);
        });
    });
});
*/