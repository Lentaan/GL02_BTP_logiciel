const newParser = function(cheminFichier = '.exam1.gift'){
    const fs = require('fs');
    const QUESTION = require('./QUESTION.js');
    const gift = fs.readFileSync(cheminFichier, 'utf-8');

    let elements = gift.split(/\n+/);
    let objetQuestion = [];

    let questions = elements.filter(element => element.startsWith('::'));

    questions.forEach(question => {
        let questionText = '';
        let answers = [];

        let matched = question.match(/(.+?)(\{.+?\})?$/);
        if (matched) {
            questionText = matched[1].trim();
            if (matched[2]) {
                answers = matched[2].slice(1, -1).split('=').map(ans => ans.trim());
            }
        }

        let q = new QUESTION(questionText, ...answers);
        objetQuestion.push(q);
    });

    return objetQuestion;
}

module.exports = newParser;
