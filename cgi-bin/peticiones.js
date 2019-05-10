const servidor = require('http');
const url = require('url');
const fibo = require('./fibonacci.js');


//Aquí hay que jalar los 'require' adicionales que puedan hacer falta como FileSystem, etc.
const host = '127.0.0.1';
const puerto = '8070';

const svr = servidor.createServer((requerimiento, respuesta) => {
	let resultado = '';
	respuesta.setHeader('Content-Type', 'text/plain');
	if (requerimiento.method == 'GET') {
		resultado = procesaGet(requerimiento);
		console.log("Una petición");
		console.log(fibo.doFibonacci(10000)); //aquí estoy pidiendo los primeros 10 números de la seq fibonacci
		respuesta.statusCode = 200;
	} else if (requerimiento.method == 'POST') {
		respuesta = procesaPost(requerimiento);
		respuesta.statusCode = 200;
	} else {
		respuesta.statusCode = 404;
	}
	respuesta.end(resultado);
});

svr.listen(puerto, host, () => {
	console.log('La aplicación está corriendo en: ' + host + ':' + puerto);
});



function procesaGet(peticion) {
	//Aquí necesitan analizar la URL de la petición, ver qué botón se presionó y actuar en consecuencia.
var palabra = url.parse(peticion.url, true); // ESTO ES PARSEAR
console.log("Posible palíndroma = " + palabra.query.numero);
return fibo.doFibonacci(parseInt(palabra.query.numero)).toString();
}

function procesaPost(peticion) {
	//Igualmente, aquí hay que obtener el valor que venga en la URL...
	console.log(peticion);
	console.log(peticion.body);
}



//RECORDAR CAMBIAR elServidor por donde esté svr
