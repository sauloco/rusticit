const ENTER_ASCII_CODE = 13 

$(document).ready(function(){

    var callback = function(){
    var valor = $("#ingre").val();
     if (valor !== '') {
       $("#muestradiv").show();
       $("#mues").addClass("contenedor1");
       $("#mues").val("Te gusta que te llamen " + valor + "?");
       $("#reset").addClass("boton1");
     
    } else {
           alert('Debe ingresar un apodo...');
        $("#ingre").css("autofocus");
        }

    };

    $("button").click(callback);
    
    $("input").keyup(function(e){ 
    	if (e.which == ENTER_ASCII_CODE) callback();
    })
    var vacia = function(){ 
        $("#muestradiv").hide()
        $("#ingre").val("")
        }
        $("#reset").click(vacia);

});

