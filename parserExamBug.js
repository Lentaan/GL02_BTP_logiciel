const parserExam = function(cheminFichier = './exam1.gift'){
    // Import de l'ensemble des fichiers contenant les questions
    const fs = require('fs');
    const QUESTION = require('./QUESTION.js');
    const gift = fs.readFileSync(cheminFichier, 'utf-8');

    //================ Étape de tokenisation ==================
    // Un fichier gift est sous la forme gift = *element\n
    // Je récupère donc chaque élément
    let elements = gift.split(/\n+/);
    console.log('Éléments du fichier:', elements); // Vérifie les éléments extraits

    let objetQuestion = [];

    //================= Récupération des groupes et des commentaires ==================
    // Récupère les groupes
    let group = elements.filter(element => element.startsWith('$'));
    console.log('Groupes:', group); // Vérifie les groupes extraits

    // Récupère les commentaires
    let comment = elements.filter(element => element.slice(0,2)==='//');
    console.log('Commentaires:', comment); // Vérifie les commentaires extraits

    //================= Récupération des questions ==================
    let questions = elements.filter(element => element.slice(0,2)==='::');
    console.log('Questions extraites:', questions); // Vérifie les questions extraites

    let parsedQuestion = questions.filter(question => question.match(/(.*{.*}.*)/));
    console.log('Questions parsées:', parsedQuestion); // Vérifie les questions après parsing

    parsedQuestion.forEach(question => {
        let matched = question.match(/~=([^~]+)~/);
        console.log('Question actuelle:', question); // Vérifie chaque question analysée
        console.log('Matched:', matched); // Vérifie si les réponses sont extraites correctement
        if(matched){
            let answer = matched[1];
            let q = new QUESTION(question,answer);
            objetQuestion.push(q);
            console.log('Question ajoutée:', q); // Vérifie les objets Question créés
        }
    });

    return objetQuestion;
}
module.exports = parserExam;
