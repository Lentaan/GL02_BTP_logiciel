  // Realiser la simulation d'un examen: 
  //l'étudiant veut s'entrainer à passer un examen pour tester ses connaissances et 
  //veut un bilan de ses reponses 
  // l'étudiant doit rentrer un fichier d'examen qu'il a selectionne et (cf Florian) on va comparer ses réponses au fichier reponse
  // et on va lui faire un retour sur ses réponses
    //simulation

  const parser = require('./parser');
  const parserExam = require ('./parserExam');
  List_examen = parserExam();


//insert
  .command("insert", "Insert a file of answer")
  .argument('<new file>', 'rentrer un fichier GIFT avec des réponses uniquement')
   
    const insert = function(){
      let insertcopie = readline.
    }