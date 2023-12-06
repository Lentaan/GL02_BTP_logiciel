const fs = require("fs");
const path = require("path");
const QUESTION = require("./QUESTION");

const parsfile = function(file) {
    let objetQuestion = [];

    // Lecture du fichier
    const gift = fs.readFileSync(file, 'utf-8');
    let elements = gift.split(/\n+/);

    let group = elements.filter(element => element.startsWith('$'));
    let comment = elements.filter(element => element.slice(0,2) === '//');

    let questions = elements.filter(element => element.slice(0,2) === '::');
    let parsedQuestion = questions.filter(question => question.match(/(.*{.*}.*)/));

    parsedQuestion.forEach(question => {
        let matched = question.match(/~=([^~]+)~/);
        let listening = question.match(/^(.*lis.*)|(.*Listening.*)/);
        let grammar = question.match(/(.*Gra.*)/);
        let vocabulary = question.match(/(.*Voc.*)/);
        let reading = question.match(/(.*Reading.*)/);

        if(matched){
            let answer = matched[1];
            let type = "reading";

            if(listening){
                type = "listening"
            } else if(grammar){
                type = "grammar"
            } else if(vocabulary){
                type = "vocabulary"
            } else if(reading){
                type = "reading"
            }

            let q = new QUESTION(question, answer, type);
            objetQuestion.push(q);
        }
    });

    return objetQuestion;
}

module.exports = parsfile;
