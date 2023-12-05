const fs = require('fs');
const colors = require('colors');
//const VpfParser = require('./VpfParser.js');

const vg = require('vega');
const vegalite = require('vega-lite');

const cli = require("@caporal/core").default;

cli
	.version('vpf-parser-cli')
	.version('0.07')	

	
	.command('Visualize','Visualize by a graph the types of questions contain in all dates or in examen')
  	.argument('<file>', 'choisir un fichier examen ou tous')

				
cli.run(process.argv.slice(2));
parseArgumentSynopsis();
	