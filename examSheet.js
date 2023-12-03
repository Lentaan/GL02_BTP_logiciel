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
        console.log('Il y a une erreur dans votre saisie, veuillez recommencer');
        return null;
    }
}