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

  
//// fonction qui permet à un enseignant de visualiser le nombre de types de questions présentes dans un examen 
programme
  .command('VisualizeExam', 'Visualize by a graph types of questions of one exam')
  .argument('<examen>', 'fichier d examen choisi pour voir le nombre de types de question')
  .action( ({args,logger,options}) => {
  
    //demander à l'enseignant d'ecrire le nom de l'examen dont il veut voir les types de questions
        let chooseexamen = readlineSync.question('Entrez le nom de l examen :');

        //variable qui verifie si le nom de l'examen existe ou pas 
        let nomExamenExiste = false;

        // la boucle for permet de balayer l'ensemble des examens
         for (let i = 0; i<List_examen.length; i++){  

        // if verifie si l'examen existe 
            if(List_examen[i].name.includes(chooseexamen)) {
              nomExamenExiste = true;
            // Visualisation du nombre de types de questions de l'examen avec Vega-Lite
              var visualize = {
                "data" : {"url" : List_examen[i].dataUrl },
                "mark" : "bar",
                "encoding" : { x : {"field" : "type", "type" : "nominal",
                                              "axis" : { "title" : "Types de questions ' name."}
                                            },
                              y : {"field" : "Nombre de questions","aggregate" : "count"}
                                          }           
                              }
                console.log(visualize);
            //Arreter la boucle 
                break;
            

            // si pas trouvé le dossier
            } if (!nomExamenExiste){
          console.log('Réessaye');
          return chooseexamen;
        }
          //renvoyer l'utilisateur 
            }})
    
     
programme.run(process.argv.slice(2));
module.exports = VisualizeExam;
