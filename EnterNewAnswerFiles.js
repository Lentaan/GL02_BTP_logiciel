  // Realiser la simulation d'un examen: 
  //l'étudiant veut s'entrainer à passer un examen pour tester ses connaissances et 
  //veut un bilan de ses reponses 

const { error } = require('console');
const QUESTION = require ('./QUESTION.js');
const fs = require('fs');
List_exam = parserExam();


 //// ******la fonction insertAnswerFile permet à l'utilisateur de créer et d'insérer un fichier réponse d'examen*****////
//insertAnswerfile
function AskExam () {
  // Trouver l'examen que l'etudiant veut passer
  let examen =fs.readFileSync.question('Quel examen souhaitez-vous préparez?');
  let resultat = List_exam.find((e) => e.name.includes(examen));
  if(resultat){
    return resultat.name;
  }else{
    return null;
  }
}

  // création de la fonction pour créer un fichier de reponse 
  function createNewAnswerFile () { 
  // Le fichier est crée et peut-etre modifié à partir de la grâce à fs.appendFile
    fs.appendFile(`${fileName}.gift`, answers,'utf8', function(err) {
      // en cas d'erreur l'utilisateur le sait 
      if(err){
       console.log("erreur");
       return;
      }

      console.log('Fichier crée. Vous pouvez ecrire vos réponses');
      })
    
    };

//comparer le fichier de l'etudiant avec le fichier de l'examen passé cf Florian
async function compareExams(fileName,resultat ) {
  // Verification des réponses
  const commonAnswer = fileName.filter(answer => resultat.includes(anwser));
  return commonAnswer;
  return ;

}





module.exports = {compareExams, AskExam, createNewAnswerFile };

    

    

    
    
    