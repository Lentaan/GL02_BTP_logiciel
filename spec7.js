/*const newParser = require('./newParser.js');//parser pour lire 1 seul examen
const cheminFichier = './exam2.gift';
const exam3 = newParser(cheminFichier);
console.log(exam3);*/

const parser = require('./parser.js');//parser pour tous les exams
const fs = require('fs');
const readlineSync = require('readline-sync');

// Récupérer la liste des fichiers disponibles dans le répertoire
const files = fs.readdirSync('./SujetB_data'); // Le chemin du répertoire où se trouvent tes fichiers

// Afficher les fichiers disponibles à l'utilisateur
console.log('Fichiers disponibles :');
files.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
});

// Demander à l'utilisateur de choisir le premier fichier
const choix1 = readlineSync.questionInt('Choisissez un premier fichier en entrant son numéro : ');

// Vérifier si le choix est valide
if (choix1 > 0 && choix1 <= files.length) {
    const exam1 = files[choix1 - 1];
    console.log(`Vous avez choisi : ${exam1}`);


    // Maintenant tu peux utiliser le fichier choisi comme tu le souhaites
    // Par exemple : fs.readFileSync(fichierChoisi, 'utf-8');
} else {
    console.log('Choix invalide');
}

// Demander à l'utilisateur de choisir le deuxième fichier
const choix2 = readlineSync.questionInt('Choisissez un deuxieme fichier en entrant son numéro : ');

// Vérifier si le choix est valide
if (choix2 > 0 && choix2 <= files.length) {
    const exam2 = files[choix2 - 1];
    console.log(`Vous avez choisi : ${exam2}`);


    // Maintenant tu peux utiliser le fichier choisi comme tu le souhaites
    // Par exemple : fs.readFileSync(fichierChoisi, 'utf-8');
} else {
    console.log('Choix invalide');
}

list_question = parser();

// trouver les questions contenues dans le fichier

const questionsFiltrees = list_question.filter(question => {
    return question.name.includes('EM U5 p34 Voc1');
});

console.log(questionsFiltrees);


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