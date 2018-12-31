const ENTER_ASCII_CODE = 13 // Las "const" son variables especiales que no van a cambiar a lo largo de toda la ejecución

/**
*
* Podrás notar que no hay ninguna variable declarada explícitamente en todo el código, excepto la constante anterior,
* esto se debe al uso de parámetros. De hecho, las funciones "innecesarias" que armaste (ver explicaciones) las usé
* para demostrar y prácticar el uso normal y avanzado de los parámetros.
*
* Queda demostrado que la forma óptima de resolver este ejercicio es usando el concepto de parámetros.
* Podés ver más información en: https://www.w3schools.com/js/js_function_parameters.asp (TIENE TRADUCTOR ARRIBA EH! Vago!)
*
* Nota: Las funciones están en orden de como son llamadas para facilitar la lectura. ;) De nada!
*
* Hablando de facilitar la lectura, a partir del próximo ejercicio se quitan puntos si no se indenta como corresponde :)
*
*/

// Esta función fue reducida a su mínima expresión y utilizada como ""envoltorio"" de la función que hace el trabajo
// Se envía el evento al parametro "evento", una función al parámetro "funcion" y se ""envuelven"" 
// los parámetros que se pasarán a la siguiente función. Usé el nombre "funcion" para el parámetro, pero lo normal
// es usar el nombre "callback".
function isEnter(evento,funcion,valor) {
	// si existe "document.all" usar el "keyCode" sino "which", ¿alguno de esos es igual a la constante? ¿Sí? Ejecutar "funcion"
	(((document.all) ? evento.keyCode : evento.which) == ENTER_ASCII_CODE) && funcion(valor)
}

// Esta función es la que hace todo el laburo basicamente, pide el parámetro "valor", pero le coloca, si no trae nada, por defecto el contenido del input.
// De esta manera cuando envío el "valor" desde el "onkeyup" es fácil obtenerlo con "this.value", pero cuando lo mando desde el botón tendría que agregar el
// "document.getEle......" en el HTML, que lo ensucia un poco, asique lo pongo acá, que es donde está el JS.
function validar(valor = document.getElementById("Ingres").value){
	if (valor){ // No chequeo el length porque si "valor" es 0, false o "" (vacío), valida como FALSO y pasa para el else ;)
		
    // "aparece" lo metí dentro de recibir e hice una función pero con poner esta línea acá me ahorraba ese lío: 
	// document.getElementById("mues").className = "contenedor1"
	// No es una regla, pero es una mezcla de sentido común y relación costo beneficio: 
	// si una función la voy a llamar una sola vez y va a hacer una sola línea de código... 
	// mejor escribo la línea de código y ya....
    recibir(document.getElementById("mues"), valor)
  } else {
    alert("Debe ingresar un apodo")
  }
}

// Con la función "recibir" tenía un uso único, de qué me sirve una función si solo voy a usarla para algo muy específico? 
// No se podría escribir la línea en "validar" y listo?
function recibir(objeto,valor) {
  aparece(objeto) // acá podía mandar a la función "aparece" tal como lo planteaste vos o bien podía escribir: objeto.className = "contenedor1". 
  objeto.value = armaTexto(valor) // Siguiendo tu lógica de "aparece" esta función "armaString" hace algo específico y una sola línea, no era mejor poner la línea acá (como vos hiciste) y listo??
}

// La función "aparece" es parecida a "recibir", está media al cuetongo
// Por eso los parámetros, acá uso "objeto" esperando un objeto javascript al que le puedo agregar una clase.
function aparece(objeto) {
  objeto.className = "contenedor1"
}

// Aprovecho esta función innecesaria para mostrarte cómo funciona el "return". Se entiende de solo leerlo o se necesita explicación?
function armaTexto(valor){
  return "Te gusta que te llamen " + valor + "?"
}



