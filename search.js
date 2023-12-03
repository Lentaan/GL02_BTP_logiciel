const parser = require('./parser.js');
const readlineSync = require('readline-sync');
List_question = parser();

//===================fonction qui permet à l'enseignant de rechercher une question ou la choisir dans une liste de questions=======================
const searchQuestion = function(){
    // récupération de la question saisie par l'enseignant sur le terminal à l'aide de la fonction question de la bibliothèque readline-sync
    let question = readlineSync.question('Entrez votre question : ');
    // variable booléenne qui va nous permettre de savoir si la question a été trouvée ou non
    let  questionFound = false;
    // initialisation de l'indice de parcours de la liste de questions
    let i = 0;
    // création d'une boucle permmettant de parcourir les questions tout en recherchant la question saisie par l'enseignant
    while(i<List_question.length && !questionTrouvee){
        // utilisation d'une instruction conditionnelle afin de savoir si la question ou le mot sasisi par l'enseignant est contenu dans la liste de questions
        if(List_question[i].name.includes(question)){
            questionFound = true;
            console.log(`La saisie ${question} a été trouvée, voici l'intitulé  de la question et sa réponse : \n ${List_question[i].name} \n ${List_question[i].answer}`);
        }
        i++;
    }
    // si la question n'est pas trouvée, on affiche un message d'erreur
    if(!questionTrouvee){
        console.log(`La question ${question} n'a pas été trouvée`);
    }
}

// exportation de la fonction searchQuestion
module.exports = searchQuestion;