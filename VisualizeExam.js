//Visualition des types de questions sous pour toutes les données ou pour un examen GIFT 
//C'est pour l'enseignant
//centrées sur les questions 
//identifier les types de questions: Listening, READING, grammaire, vocabulaire, 


//  rewiev a l'air de contenir les reponses
const vegalite = require ('vega-lite');
const vega = require ('vega');
const QUESTION = require('./QUESTION');
const readlineSync = ('readline-sync');
const parserExam = require('./parserExam.js');
List_examen = require('./parserExam.js');
const caporal = ('@caporal/core').default;
//createExamenSheet

  
//// fonction qui permet à un enseignant de visualiser les types de questions présentes dans un examen 
programme
  .command('VisualizeExam', 'Visualize by a graph types of questions of one exam')
  .argument('<examen>', 'fichier d examen choisi pour voir le nombre de types de question')
  .action(  function() {
  
    //demander à l'enseignant d'ecrire le nom de l'examen dont il veut voir les types de questions
        let chooseexamen = readlineSync.QUESTION ('Entrez le nom de l examen :');

      // boucle pour parcourir tous les noms d'examen
        let i = 0;

        //variable qui verifie si le nom de l'examen existe ou pas 
        let nomExamenExiste = true;

        // le while va servir à parcourir tous les noms d'examen 
        while (i<List_examen.length && nomExamenExiste ){  

        //afficher les types de questions de l'examen selectionnée et affiche avec vega
            if(List_examen[i].name.includes(examen)) {
              var visualize = {
                "data" : {"url" : {examen} },
                "mark" : "bar",
                "encoding" : { x : {"field" : "type", "type" : "nominal",
                                              "axis" : { "title" : "Types de questions ' name."}
                                            },
                              y : {"field" : "Nombre de questions","aggregate" : "count"}
                                          }           
                              }
                console.log(visualize);
            

            // si pas trouvé le dossier
            }else{
          console.log('Réessaye');
          return chooseexamen;
          //renvoyer l'utilisateur 
            }}})
    
     
programme.run(process.argv.slice(2));
module.exports = VisualizeExam;
