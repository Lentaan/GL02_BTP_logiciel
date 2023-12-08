const vegalite = require('vega-lite');
const vega = require('vega');
const readlineSync = require('readline-sync'); // Import correct
const parserExam = require('./parserExam.js');
const List_examen = require('./parserExam.js');
const caporal = require('@caporal/core').default; // Import correct

// Fonction qui permet à un enseignant de visualiser le nombre de types de questions présentes dans un examen
function VisualizeExam() {
    // Demander à l'enseignant d'écrire le nom de l'examen dont il veut voir les types de questions
    let chooseexamen = readlineSync.question('Entrez le nom de l examen :');

    // Variable qui vérifie si le nom de l'examen existe ou pas
    let nomExamenExiste = false;

    // La boucle for permet de balayer l'ensemble des examens
    for (let i = 0; i < List_examen.length; i++) {
        // If vérifie si l'examen existe
        if (List_examen[i].name.includes(chooseexamen)) {
            nomExamenExiste = true;
            // Visualisation du nombre de types de questions de l'examen avec Vega-Lite
            var visualize = {
                "data": { "url": List_examen[i].dataUrl },
                "mark": "bar",
                "encoding": {
                    x: {
                        "field": "type",
                        "type": "nominal",
                        "axis": { "title": "Types de questions" }
                    },
                    y: { "aggregate": "count", "title": "Nombre de questions" }
                }
            };
            console.log(visualize);
            // Arrêter la boucle
            break;
        }
    }

    // Si pas trouvé le dossier
    if (!nomExamenExiste) {
        console.log('Réessayez');
        return chooseexamen;
    }
}
VisualizeExam()
//module.exports = VisualizeExam;