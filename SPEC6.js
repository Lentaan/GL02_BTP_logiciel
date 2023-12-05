//Visualition des types de questions sous pour toutes les données ou pour un examen GIFT 
//C'est pour l'enseignant
//centrées sur les questions 
//identifier les types de questions: Listening, READING, grammaire, vocabulaire, 
//Use of English, Adverb, Ultimate, Future Forms, Progress test, Relatives clauses.

//  rewiev a l'air de contenir les reponses
const vegalite = require ('vega-lite');
const parser = require('./parser');
const readlineSync = ('readline');
const parserExam = ('./parserExamen');
List_examen = parserExam();


//visualize
   command('VisualizeExam','Visualize by a graph the types of questions contain in examen')
  .argument('<file>', 'choisir un fichier examen')
  
//// fonction qui permet à un enseignant de visualiser les types de questions présentes dans un examen ou sur toutes les données///
    const VisualizeExam = function(){
 
  //recupération de la décision de l'enseignant : un examen (donc il faut en selectionner un ou toutes les données)
      let chooseexamen = readline.QUESTION ('Entrez le nom de l examen :');
  // boucle pour parcourir les noms d'examen

      let i = 0;
  // si choix de l'examen: demander d'entrer le nom de l'examen
        
      while (i<List_examen.length ){
          
        let nomExamenExiste = true;}
      //afficher les types de questions de l'examen selectionnée et affiche avec vega
          if(nomExamenExiste) {
            var visualizeTypesQuestions = {
              "data" : {"url" : "examen1.gift" },
              "mark" : "bar",
              "encoding" : { x : {"field" : "Types de questions", "type" : "nominal"},
                            y : {"aggragate": "count"},

              }
                        
            }
        
            // si pas trouvé le dossier
          }else{
        console.log('Réessaye');
          }
     // si choix des types de questions de toutes les données alors il faut les afficher avec vega
      command('Visualize all data', 'Vizualise by graph the types of questions in all the datas ')
      .argument ('<file>', 'All files')
          const VisualiseAllData = function() {
            var visualizeTypesQuestions ={
             "data" : {"url": "EM-U4-p32_33-Review.gift"}, 
              "mark" : "bar",
              "encoding" : { x : { "field" : "Types de questions", "type" : "nominal"},
                             y : {"aggregate" : "count"}}}

    } 
  }

module.exports = visualizeTypesQuestions;
