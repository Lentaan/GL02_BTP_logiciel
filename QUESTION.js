
var QUESTION = function(nm,ans,type){
	this.name = nm;
	this.answer = ans;
	this.type = type;
}

//Methode tostring retourne la chaine de caractere avec laquelle afficher l'objet question
QUESTION.prototype.toString = function(){
	return `${this.name}\n\n`;
}



module.exports = QUESTION;



