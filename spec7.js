const parsfile = require('./parsfile');
//const parser = require('./parser.js');//parser pour tous les exams
const fs = require('fs');
const readlineSync = require('readline-sync');

let exam1 = './exam/exam1.gift';
let exam2 = './exam/exam2.gift';






// Récupérer la liste des fichiers disponibles dans le répertoire (inutile)
/*const files = fs.readdirSync('./SujetB_data'); // Le chemin du répertoire où se trouvent tes fichiers

// Afficher les fichiers disponibles à l'utilisateur
console.log('Fichiers disponibles :');
files.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
});

// Demander à l'utilisateur de choisir le premier fichier
const choix1 = readlineSync.questionInt('Choisissez un premier fichier en entrant son numéro : ');

// Vérifier si le choix est valide
if (choix1 > 0 && choix1 <= files.length) {
    exam1 = files[choix1 - 1];
    console.log(`Vous avez choisi : ${exam1}`);
    console.log('coucou',exam1);

} else {
    console.log('Choix invalide');
}
console.log('coucou',exam1);
// Demander à l'utilisateur de choisir le deuxième fichier
const choix2 = readlineSync.questionInt('Choisissez un deuxieme fichier en entrant son numéro : ');

// Vérifier si le choix est valide
if (choix2 > 0 && choix2 <= files.length) {
    exam2 = files[choix2 - 1];
    console.log(`Vous avez choisi : ${exam2}`);


    // Maintenant tu peux utiliser le fichier choisi comme tu le souhaites
    // Par exemple : fs.readFileSync(fichierChoisi, 'utf-8');
} else {
    console.log('Choix invalide');
}
*/


let questionExam1 = parsfile(exam1);
console.log(questionExam1);

let questionExam2 = parsfile('./exam/exam2.gift');
console.log(questionExam2);

// Comparaison des questions
questionExam1.forEach((question1) => {
    const matchedQuestion = questionExam2.find((question2) => {
        return question1.name === question2.name && question1.answer === question2.answer && question1.type === question2.type;
    });

    if (matchedQuestion) {
        console.log(`La question "${question1.name}" est identique dans les deux examens.`);
    }
});



/*list_question = parser();
console.log(exam1);*/



/*function listQuestionsFile(exam) {
    let questionsExam = list_question.filter(question => question.nomFichier === exam);
    return questionsExam;
}


let questionExam1 = listQuestionsFile(exam1);
console.log(questionExam1);*/

/*// Filtrer les questions pour afficher uniquement celles ayant le même nomFichier que exam1
const questionsExam1 = list_question.filter(question => question.nomFichier === exam1);

// Afficher les questions de exam1
console.log('Questions de', exam1);
questionsExam1.forEach(question => {
    console.log(question.toString());
});*/





//console.log(list_question[choix1-1]);







/*const readline= require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

*/


//On recupere les questions des examens
//exam1 = parserExam('./exam1.gift');
//exam2 = parserExam('./exam2.gift');

//console.log(list_question);
//console.log(exam2);


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