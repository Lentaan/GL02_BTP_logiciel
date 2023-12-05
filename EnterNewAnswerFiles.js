  // Realiser la simulation d'un examen: 
  //l'étudiant veut s'entrainer à passer un examen pour tester ses connaissances et 
  //veut un bilan de ses reponses 
  // l'étudiant doit rentrer un fichier d'examen qu'il a selectionne et (cf Florian) on va comparer ses réponses au fichier reponse
  // et on va lui faire un retour sur ses réponses
    //simulation
  const { error } = require('console');
  const QUESTION = require ('./QUESTION.js');
const fs = require('fs');

 //// la fonction insertAnswerFile permet à l'utilisateur d'insérer un fichier réponse d'examen
//insertAnswerfile
const insertAnswerFile = function() {
  // création de la variable 
  var createNewAnswerFile = 'Réponses de l etudiant à un examen';
  // Le fichier est crée et peut-etre modifié à partir de la grâce à fs.appendFile
    fs.appendFile('NewFileAnswer.gift', answer,'utf8', function(err) {
      if(err){
       console.log("erreur");
       return;
      }

      console.log('Fichier crée. Vous pouvez ecrire vos réponses');
    
    })
    
    };

//comparer le fichier de l'etudiant avec le fichier de l'examen passé cf Florian

// faire un compte rendu de la passation de l'examen
    

    

    
    
    