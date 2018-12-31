const ENTER_ASCII_CODE = 13 // Las "const" son variables especiales que no van a cambiar a lo largo de toda la ejecuci�n

/**
*
* Podr�s notar que no hay ninguna variable declarada expl�citamente en todo el c�digo, excepto la constante anterior,
* esto se debe al uso de par�metros. De hecho, las funciones "innecesarias" que armaste (ver explicaciones) las us�
* para demostrar y pr�cticar el uso normal y avanzado de los par�metros.
*
* Queda demostrado que la forma �ptima de resolver este ejercicio es usando el concepto de par�metros.
* Pod�s ver m�s informaci�n en: https://www.w3schools.com/js/js_function_parameters.asp (TIENE TRADUCTOR ARRIBA EH! Vago!)
*
* Nota: Las funciones est�n en orden de como son llamadas para facilitar la lectura. ;) De nada!
*
* Hablando de facilitar la lectura, a partir del pr�ximo ejercicio se quitan puntos si no se indenta como corresponde :)
*
*/

// Esta funci�n fue reducida a su m�nima expresi�n y utilizada como ""envoltorio"" de la funci�n que hace el trabajo
// Se env�a el evento al parametro "evento", una funci�n al par�metro "funcion" y se ""envuelven"" 
// los par�metros que se pasar�n a la siguiente funci�n. Us� el nombre "funcion" para el par�metro, pero lo normal
// es usar el nombre "callback".
function isEnter(evento,funcion,valor) {
	// si existe "document.all" usar el "keyCode" sino "which", �alguno de esos es igual a la constante? �S�? Ejecutar "funcion"
	(((document.all) ? evento.keyCode : evento.which) == ENTER_ASCII_CODE) && funcion(valor)
}

// Esta funci�n es la que hace todo el laburo basicamente, pide el par�metro "valor", pero le coloca, si no trae nada, por defecto el contenido del input.
// De esta manera cuando env�o el "valor" desde el "onkeyup" es f�cil obtenerlo con "this.value", pero cuando lo mando desde el bot�n tendr�a que agregar el
// "document.getEle......" en el HTML, que lo ensucia un poco, asique lo pongo ac�, que es donde est� el JS.
function validar(valor = document.getElementById("Ingres").value){
	if (valor){ // No chequeo el length porque si "valor" es 0, false o "" (vac�o), valida como FALSO y pasa para el else ;)
		
    // "aparece" lo met� dentro de recibir e hice una funci�n pero con poner esta l�nea ac� me ahorraba ese l�o: 
	// document.getElementById("mues").className = "contenedor1"
	// No es una regla, pero es una mezcla de sentido com�n y relaci�n costo beneficio: 
	// si una funci�n la voy a llamar una sola vez y va a hacer una sola l�nea de c�digo... 
	// mejor escribo la l�nea de c�digo y ya....
    recibir(document.getElementById("mues"), valor)
  } else {
    alert("Debe ingresar un apodo")
  }
}

// Con la funci�n "recibir" ten�a un uso �nico, de qu� me sirve una funci�n si solo voy a usarla para algo muy espec�fico? 
// No se podr�a escribir la l�nea en "validar" y listo?
function recibir(objeto,valor) {
  aparece(objeto) // ac� pod�a mandar a la funci�n "aparece" tal como lo planteaste vos o bien pod�a escribir: objeto.className = "contenedor1". 
  objeto.value = armaTexto(valor) // Siguiendo tu l�gica de "aparece" esta funci�n "armaString" hace algo espec�fico y una sola l�nea, no era mejor poner la l�nea ac� (como vos hiciste) y listo??
}

// La funci�n "aparece" es parecida a "recibir", est� media al cuetongo
// Por eso los par�metros, ac� uso "objeto" esperando un objeto javascript al que le puedo agregar una clase.
function aparece(objeto) {
  objeto.className = "contenedor1"
}

// Aprovecho esta funci�n innecesaria para mostrarte c�mo funciona el "return". Se entiende de solo leerlo o se necesita explicaci�n?
function armaTexto(valor){
  return "Te gusta que te llamen " + valor + "?"
}



