const parserExam = require("./parserExam");

//=========================fonction qui vérifie si l'examen est valide=======================
const isValid = function (file) {
  // parse l'examen
  const list = parserExam(file);
  console.log(list.length);

  let bool = false;

  // vérifie si le nombre de questions est entre 15 et 20
  if (list.length >= 15 && list.length <= 20) {
    bool = true;
  }

  let isUnique = true;
  // boucle pour vérifier si toutes les questions sont uniques
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      // si une question est identique à une autre, isUnique devient false
      if (
        list[i].name === list[j].name &&
        list[i].answer === list[j].answer &&
        list[i].type === list[j].type
      ) {
        isUnique = false;
        break;
      }
    }
    if (!isUnique) {
      break;
    }
  }

  // si l'examen contient des doublons, affiche un message
  if (!isUnique) {
    console.log("l'examen contient des doublons de questions.");
  }

  // retourne vrai si l'examen est valide (nombre de questions correct et pas de doublons)
  return bool && isUnique;
};

// récupération du nom du fichier
let file = readlineSync.question("entrez le chemin du fichier : ");
// appel de la fonction isValid
isValid(`${file}`);
