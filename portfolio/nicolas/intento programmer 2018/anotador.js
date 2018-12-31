//const ENTER_ASCII_CODE = 13
//function isEnter(evento,funcion,valor) {
	// si existe "document.all" usar el "keyCode" sino "which", �alguno de esos es igual a la constante? �S�? Ejecutar "funcion"
//	(((document.all) ? evento.keyCode : evento.which) == ENTER_ASCII_CODE) && alert ("pepe"))
//}

function nuenota(){

    document.getElementById("nota").disabled = false;
    document.getElementById("nota").focus()
}

function muesnota(){
    var valor = document.getElementById("nota").value;
    alert(valor);
    location.reload(true);
    
    //document.getElementById('destination').innerHTML += '<br>' + new Date() + ' ' + document.getElementById('text').value;
  //document.getElementById('text').value = '';
}