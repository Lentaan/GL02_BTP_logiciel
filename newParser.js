const parserExam = function(cheminFichier){
    const fs = require('fs');
    const QUESTION = require('./QUESTION.js');
    const gift = fs.readFileSync(cheminFichier, 'utf-8');

    let elements = gift.split(/\n+/);
    let objetQuestion = [];

    let questions = elements.filter(element => element.slice(0,2) === '::');

    let parsedQuestion = questions.filter(question => question.match(/(.+{.+}.+)/));

    parsedQuestion.forEach(question => {
        let matched = question.match(/(.+{.+}.+)/);
        if(matched){
            let questionPart = matched[1].split('{');
            let questionText = questionPart[0].trim();
            let answerPart = questionPart[1].split('}');
            let answers = answerPart[0].split('=').map(ans => ans.trim());
            let q = new QUESTION(questionText, ...answers);
            objetQuestion.push(q);
        }
    });

    return objetQuestion;
}

module.exports = parserExam;
