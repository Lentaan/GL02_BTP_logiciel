//Visualition des types de questions sous pour toutes les données ou pour un examen GIFT 
//C'est pour l'enseignant
//centrées sur les questions 
//identifier les types de questions: Listening, READING, grammaire, vocabulaire, 
//Use of English, Adverb, Ultimate, Future Forms, Progress test, Relatives clauses.

//  rewiev a l'air de contenir les reponses
const data = require('./data');
const parser = require('./parser');
const readlineSync = ('readline-sync');
//const select = (examen);
List_examen = parser();


//visualize
   command('Visualize','Visualize by a graph the types of questions contain in all dates or in examen')
  .argument('<file>', 'choose un fichier examen ou toutes les données')
//// fonction qui permet à un enseignant de visualiser les types de questions présentes dans un examen ou sur toutes les données///
    const visualizeTypesQuestions = function(examen, all){
 
  //recupération de la décision de l'enseignant : un examen (donc il faut en selectionner un ou toutes les données)
      

      let i = 0;
  // si choix de l'examen: demander d'entrer le nom de l'examen
        if(examen)
          while (i<List_examen.length && //select === examen//
        ){
          let chooseexamen = readlineSync.QUESTION ('Entrez le nom de l examen :');
          let nomexamenexiste = true;
      //afficher les types de questions de l'examen selectionnée et affiche avec vega
          if(nomexamenexiste) {
            var 
        
            // si pas trouvé le dossier
          }else{
        console.log('Réessaye');
          }
     // si choix des types de questions de toutes les données alors il faut les afficher avec vega
      }else{
        var visualizeTypesQuestions =
        "data" : {"url" : "U11-p114-Mixed_conditionals.gift", "U10-p106-Reading.gift", "U9-p95-Third_cond-4.gift","U9-p94-Listening.gift","U8-p84-Voc-Linking_words.gift", "U7-p77-It is,there is.gift","U7-p77-6.gift","U7-p76_77-So,such,too,enough.gift","U7-p76-Relative_clauses.gift"},
        "mark" : "bar",
        "encoding" : { x : { "field" : "Types de questions", "type" : "nominal"}
                      y : {"aggregate" : "count"}

    }}

module.exports = visualizeTypesQuestions;
