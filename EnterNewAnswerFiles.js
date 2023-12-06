  // Realiser la simulation d'un examen: 
  //l'étudiant veut s'entrainer à passer un examen pour tester ses connaissances et 
  //veut un bilan de ses reponses 
  //demander le fichier VCard pour identifier l'utilisateur

const { error } = require('console');
const QUESTION = require ('./QUESTION.js');
const parserExam = require('./parserExam.js');
const fs = require('fs');
List_exam =  require('./parserExam.js');
const programme = ('@caporal/core');


 //// ******la fonction insertAnswerFile permet à l'utilisateur de créer et d'insérer un fichier réponse d'examen*****////
//insertAnswerfile
programme
.command('AskExam', 'l utilisateur passe un examen et veut un retour sur sa passation')
.argument('examen', 'examen to prepare')
.action( function AskExam () {
  // Trouver l'examen que l'etudiant veut passer
    let examen = args.examen || readFileSync.question('Quel examen souhaitez-vous préparez?');
    let resultat = List_exam.find((e) => e.name.includes(examen));
    if(resultat){
      console.log(resultat.name);
    }else{
      console.log("Examen non trouvé.");
    }})
  

    // création de la fonction pour créer un fichier de reponse 
programme
.command('CreateAnswerFile', 'L utilisateur va ecrire ses réponses')
.action(function createNewAnswerFile () { 
    // Le fichier est crée et peut-etre modifié à partir de la grâce à fs.appendFile
      let fileName = fs.readFileSync.question('Nom du fichier de reponses.')
      let answers = fs.readFileSync.question('Entrez vos réponses');
      fs.writeFileSyncFile(`${fileName}.gift`, answers,'utf8', function(err) {
        // en cas d'erreur l'utilisateur le sait 
        if(err){
        console.log("erreur");
        return;
        }

        console.log('Fichier crée. Vous pouvez ecrire vos réponses');
        })})
      
      

  //comparer le fichier de l'etudiant avec le fichier de l'examen passé cf Florian
  .command('CompareAnswer','L utilisateur va comparer ses réponses au fichier d examen qu il a choisit')
  .argument('fileName', 'Nom du fichier de réponses de l utilisateur')
  .argument('resultat', 'fichier d examen que l utilisateur veut passer')
  .action( function compareExams(fileName,resultat ) {
    // Lecture des deux fichiers examen et reponses en créeant une array
    const userAnswers = fs.readFile(args.fileName, 'utf8').split('/n');
    const examenAnswers = fs.readFileSync(args.resultat, 'utf8').split('/n');

    // Retirer les lignes vides dans les deux fichiers
    const cleaningUserAnswers = userAnswers.filter(answer => answer.trim() !== '');
    const cleaningexamenAnswers = examenAnswers.filter(answer => answer.trim !== '');
    // Trouver les réponses communes entre les deux fichiers
    const commonAnswers = cleaningUserAnswers.filter(answer => cleaningexamenAnswers.includes(anwser));
    // Faire le retour sur la passation de l'examen
    //Calculer le total de questions passé
    const totalQuestions = cleaningexamenAnswers.length;
    // Calculer le nombre de réponses correctes
    const correctAnswersCount = commonAnswers.length;
    // Calculer le nombre de réponses fausses
    const incorrectAnswersCount = cleaningUserAnswers.length - correctAnswersCount;
    // Calculer la note de l'utilisateur
    const accuracy = (correctAnswersCount / totalQuestions) * 100;
    //Afficher le retour de la passation de l'examen
    console.log(`Nombre total de questions: ${totalQuestions}`);
    console.log(`Nombre de réponses correctes: ${correctAnswersCount}`);
    console.log(`Nombre de réponses incorrectes: ${incorrectAnswersCount}`);
    console.log(`Précision: ${accuracy.toFixed(2)}%`);
    
    

  })



programme.run(process.argv.slice(2));



    

    

    
    
    