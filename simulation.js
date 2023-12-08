const readlineSync = require("readline-sync");
const parserExam = require("./parserExam");
const fs = require("fs");

//==================fonction qui permet de simuler un examen======================
function simulation() {
  // nom de l'examen qui doit être simulé
  console.log("Entrer le nom de l'examen à simuler au format exam.gift");
  let nomExam = readlineSync.prompt();

  // on récupère les questions de l'examen
  let questionExam = parserExam(nomExam);

  // tableau des réponses utilisateurs
  let tabAnswer = new Array();

  console.log(
    "Vous allez passer le test de l'exam" +
      nomExam +
      "\n repondez aux questions en entrant juste une des reponses"
  );

  // boucle sur les questions et on récupère les réponses de l'utilisateur
  for (let i = 0; i < questionExam.length; i++) {
    console.log(`${questionExam[i].name}: `);
    let answer = readlineSync.prompt();
    console.log("Votre réponse est " + answer);
    tabAnswer.push(answer);
  }

  //------------------construction du fichier de compte rendu de l'examen------------------------
  // chaine de caractere ecrit dans le fichier de compte rendu
  let compteRendu = "";

  // on compare les entrées de l'étudiant et la réponse correcte à la question. Si c'est vrai on met right sinon wrong
  let note = 0;
  for (let numero = 0; numero < questionExam.length; numero++) {
    let appreciation = "faux";
    if (tabAnswer[numero] === questionExam[numero].answer) {
      note++;
      appreciation = "vrai";
    }
    compteRendu += `question ${numero}: ${appreciation}, correction: ${questionExam[numero].answer}\n`;
  }

  note = (note / questionExam.length) * 100;
  compteRendu += `vous avez ${note}% de bonne réponse à l'examen`;

  // on récupère le nom du fichier dans lequel l'utilisateur veut avoir son bilan
  let fileCompteRendu = readlineSync.question(
    "Entrez le nom du fichier dans lequel vous voulez lire le compte rendu de l'examen : "
  );
  fileCompteRendu = fileCompteRendu + ".txt";
  fs.writeFileSync(fileCompteRendu, compteRendu);

  console.log(
    `vous avez ${note}% de bonne reponse à l'examen. Vous pourrez trouver le compte rendu dans le fichier ${fileCompteRendu}`
  );
}

// appel de la fonction simulation
simulation();
