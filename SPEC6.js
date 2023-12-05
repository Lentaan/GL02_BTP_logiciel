//Visualition des types de questions sous pour toutes les données ou pour un examen GIFT 
//C'est pour l'enseignant
//centrées sur les questions 
//identifier les types de questions: Listening, READING, grammaire, vocabulaire, 
//Use of English, Adverb, Ultimate, Future Forms, Progress test, Relatives clauses.

//  rewiev a l'air de contenir les reponses
const vegalite = require ('vega-lite');
const vega = require ('vega');
const parser = require('./parser');
const QUESTION = require('./QUESTION');
const readline = ('readline');
const parserExam = ('./parserExamen');
List_examen = parserExam();


//visualize
   command('VisualizeExam','Visualize by a graph the types of questions contain in examen')
  .argument('<file>', 'choisir un fichier examen')
  
//// fonction qui permet à un enseignant de visualiser les types de questions présentes dans un examen 
    const VisualizeExam = function(){
 
  //demander à l'enseignant d'ecrire le nom de l'examen dont il veut voir les types de questions
      let chooseexamen = readline.QUESTION ('Entrez le nom de l examen :');

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
          }}
  
     // si choix des types de questions de toutes les données alors il faut les afficher avec vega
      command('Visualize all data', 'Vizualise by graph the types of questions in all the datas ')
      .argument ('<file>', 'All files')
          const VisualiseAllData = function() {
            const urls = ['EM-U4-p32_33-Review.gitf', 'EM-U5-p34-Gra-Expressions_of_quantity.gift', 'EM-U5-p34-Voc.gift','EM-U5-p35-Gra-Subject_verb_agreement.gift'];

            // Fonction pour charger les données depuis une URL
              const fetchData = async (url) => {
                 const response = await fetch(url);
                 const data = await response.json();
                   return data;
                    };

          // Charger les données depuis chaque URL
          const dataPromises = urls.map(url => fetchData(url));

          // Attendre que toutes les promesses soient résolues
          Promise.all(dataPromises)
          .then(datasets => {
         // Combinez les jeux de données si nécessaire
          const combinedData = datasets.reduce((acc, dataset) => acc.concat(dataset), []);

            var visualizeTypesQuestions ={
             "data" : {"values": combinedData}, 
              "mark" : "bar",
              "encoding" : { x : { "field" : "name", "type" : "nominal", 
                                    "axis": {"title": "Types de questions ' name."}
                                  },
                             y : {"field" : "Nombre de questions","type" : "quantitative"}
                            }
                          }
            visualizeTypesQuestions.render()

    })
  }
}

module.exports = visualizeTypesQuestions;
