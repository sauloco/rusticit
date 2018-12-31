function aparece()
{
document.getElementById("mues").className = "contenedor1"
}

function recibir()
    {
        var valor = document.getElementById("Ingres").value;
            final = ("Te gusta que te llamen " + valor + "?")
      document.getElementById("mues").value=final;        
        
    }       

function daenter(e) {
	        var tecla = (document.all) ? e.keyCode : e.which;
           if (tecla==13) {validar()}
                   	
}

function validar(){
	var vacio = document.getElementById("Ingres").value;
	if (vacio.length != 0 )  {aparece(); recibir();}
	else
	{alert("Debe ingresar un apodo"); }
}