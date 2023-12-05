  // Realiser la simulation d'un examen: 
  //l'étudiant veut s'entrainer à passer un examen pour tester ses connaissances et 
  //veut un bilan de ses reponses 
  // l'étudiant doit rentrer un fichier d'examen qu'il a selectionne et (cf Florian) on va comparer ses réponses au fichier reponse
  // et on va lui faire un retour sur ses réponses
    //simulation

  const parser = require('./parser');
  const parserExam = require ('./parserExam');
  List_examen = parserExam();
  //on integre une fonction qui nous indique le chemin vers un nouveau fichier 
  const cheminNouveauFichierReponses = 'nouveaufichier.gift' //peut-etre en txt?

  // cette fonction nous dit ce qu'il y a dans le nouveau fichier 
  const contenuNouveauFichierReponses = 'Contenu du nouveau fichier de réponses.\n'
//insert
  command("insert", "Insert a file of answer")
  .argument('<new file>', 'rentrer un fichier GIFT avec des réponses uniquement')
   
    
    