const parser = require('./parser.js');
const readlineSync = require('readline-sync');
List_question = parser();

// fonction qui retourne une question à partir de ce qu'a saisi l'enseignant
const search = function(){
    // récupération de la question saisie par l'enseignant sur le terminal à l'aide de la fonction question de la bibliothèque readline-sync
    let question = readlineSync.question('Entrez votre recherche : ');
    // question trouvée ou non à l'aide la méthode find
    let result = List_question.find(q => q.name.includes(question));
    // si la question est trouvée, on retourne son intitulé
    if(result){
        return result.name;
    // sinon on retourne null
    } else {
        return null;
    }
}

// fonction qui retourne une liste regroupant les questions saisies par l'enseignant en se servant de la fonction search
const listQuestionExam = function(){
    // création de liste qui va contenir les questions
    let questions_exam = Array();
    // création d'une variable question
    let question;
    // création d'une variable qui va détermniner si l'enseignant veut ajouter une question
    let insert = readlineSync.question('Voulez-vous ajouter une question (oui/non) : ');
    // tant que l'enseignant veut ajouter des questions, elles seront ajoutées à la liste
    do{
        // utilisation de la fonction search
        question = search();
        // si la question a été trouvée, elle est ajoutée à la liste
        if(question != null){
            questions_exam.push(question);
            console.log('La question a été ajoutée \n')
        // sinon elle n'est pas ajoutée
        } else {
            console.log('La question n\'a pas été trouvée, elle n\'a pas été ajoutée \n')
        }
        // on demande à l'enseignant s'il veut ajouter une question
        insert = readlineSync.question('Voulez-vous ajouter une question (oui/non) : ');
    } while(insert.toLowerCase() == 'oui');
    // on retourne la liste de questions
    return questions_exam;
}