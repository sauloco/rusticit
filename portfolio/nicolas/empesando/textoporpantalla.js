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