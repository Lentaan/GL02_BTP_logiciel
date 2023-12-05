//Visualition des types de questions sous pour toutes les données ou pour un examen GIFT 
//C'est pour l'enseignant
//centrées sur les questions 
//identifier les types de questions: Listening, READING, grammaire, vocabulaire, 
//Use of English, Adverb, Ultimate, Future Forms, Progress test, Relatives clauses.

//  rewiev a l'air de contenir les reponses
const vegalite = require ('vega-lite');
const vega = require ('vega');
const QUESTION = require('./QUESTION');
const readlineSync = ('readline-sync');
const parserExam = ('./parserExamen.js');
List_examen = parserExam();
//createExamenSheet

  
//// fonction qui permet à un enseignant de visualiser les types de questions présentes dans un examen 
const VisualizeExam = function(){
 
  //demander à l'enseignant d'ecrire le nom de l'examen dont il veut voir les types de questions
      let chooseexamen = readlineSync.QUESTION ('Entrez le nom de l examen :');

    // boucle pour parcourir tous les noms d'examen
      let i = 0;

      //variable qui verifie si le nom de l'examen existe ou pas 
      let nomExamenExiste = true;

      // le while va servir à parcourir tous les noms d'examen 
      while (i<List_examen.length && nomExamenExiste ){  

      //afficher les types de questions de l'examen selectionnée et affiche avec vega
          if(List_examen[i].name.includes(QUESTION)) {
            var visualizeTypesQuestions = {
              "data" : {"url" : "examen1.gift" },
              "mark" : "bar",
              "encoding" : { x : {"field" : "name", "type" : "nominal",
                                            "axis" : { "title" : "Types de questions ' name."}
                                          },
                            y : {"field" : "Nombre de questions","type" : "quantitative"}

              }
                        
            }
          // si pas trouvé le dossier
          }else{
        console.log('Réessaye');
        return chooseexamen;
        //renvoyer l'utilisateur 
          }}}
  
     

module.exports = VisualizeExam;
