//comando para establer conexion

var socket = io();

socket.on('connect', function(){
	console.log("Conectado al servidor")
})

socket.on('disconnect', function(){
	console.log("Desconectado al servidor")
});

var searchParams = new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')){
	window.location = 'index.html';
	throw new Error("El escritorio es necesario");
}

var escritorio = searchParams.get('escritorio');
var label = $('small')
console.log(escritorio)

$('h1').text("Escritorio " + escritorio);

$('button').on('click', function(){
	socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){
		console.log(resp);
		if(resp === 'No hay tickets'){
			alert(resp);
			label.text(resp);
			return;
		}
		label.text("Ticket "+ resp.numero)
	})
})
/*
socket.emit('atenderTicket', function(resp){
	console.log(resp)
	label.text(resp.actual);
});
*/

