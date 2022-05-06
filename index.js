window.onload = seleccion;

function seleccion(){
    document.getElementById("info").style = 'display:block';

    //AddEventListener a los botones de inicar partida. Llama a la funcion para obtener los valores
    document.getElementById("btnCrear").addEventListener("click", obtener_valores, false);
    document.getElementById("btnUnirse").addEventListener("click", obtener_valores, false);
}

function obtener_valores(){
    //Obtenemos los nombres de cada jugador
    accion = this.id;
    nombre_jugador_1 = document.getElementById("jugador1").value;
    
    validar_valores();
}

function validar_valores(){
    //Si no a rellenado un campo se lo indicamos visualmente
    if(nombre_jugador_1 == ""){
        document.getElementById("jugador1").value = nombre_jugador_1;

        if(nombre_jugador_1 == ""){
            document.getElementById("jugador1").style = "background-color: rgba(238, 164, 164, 0.945)";
        }else{
            document.getElementById("jugador1").style = "background-color: rgba(209, 248, 200, 0.719)";
        }
        
        //Volvemos a llamar la funcion de "Seleccion" 
        seleccion()
    }else{
        //Al tener los 2 nombres escondemos el formulario y generamos el tablero
        //document.getElementById("info").style = 'display:none';
        if(accion == "btnUnirse"){
            unirsePartidaMenu();
        }else{
            crearPartidaMenu();
        }
    }
    
}

function unirsePartidaMenu(){
    document.getElementById("primerMenu").style = 'display:none';
    document.getElementById("unirseMenu").style = 'display:block';

    
    document.getElementById("btnUnirseMenu").addEventListener("click", unirsePartida, false);
}

function unirsePartida(){
    console.log("FDFFF");
    document.getElementById("info").style = 'diplay:none';
    nombrePartida = document.getElementById("partida").value;
    jugador ="O";
    setInterval(infoPartida,500);
    generarEscuchas();
}

function crearPartidaMenu(){

    document.getElementById("primerMenu").style = 'display:none';
    document.getElementById("crearMenu").style = 'display:block';
    document.getElementById("btnCrear").removeEventListener("click", obtener_valores, false);
    document.getElementById("btnCrearMenu").addEventListener("click", crearPartida, false);
}

function crearPartida(){
    
    document.getElementById("info").style = 'diplay:none';
    nombrePartida = document.getElementById("partida").value;
    passwordPartida = document.getElementById("password").value;

    //console.log(nombrePartida + "  " + passwordPartida);

    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                jugador = "X";
            }
        };
        xhttp.open("POST", "https://tictactoe.codifi.cat/", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send('{"action": "createGame","gameName": "' + nombrePartida + '","gamePassword": "' + passwordPartida + '"}');
        setInterval(infoPartida,500);
    generarEscuchas();
}

function generarEscuchas(){
    
    var celdas = document.getElementsByClassName("celda");

    for(var celda of celdas){
        celda.addEventListener("click", jugada, false);
    }

    document.getElementById("Peti").addEventListener("click", infoPartida, false);
}

function jugada(){
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                var jsonResponse = JSON.parse(this.responseText);
                if(jsonResponse.response != "Movement correct."){
                    alertaError(jsonResponse.response);
                }
            }
        };
        xhttp.open("POST", "https://tictactoe.codifi.cat/", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send('{"action": "playGame","gameName": "' + nombrePartida + '","movement": "' + this.id + '","player": "' + jugador + '"}');
}

function infoPartida(){
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                var jsonResponse = JSON.parse(this.responseText);
                turnoJugador = jsonResponse.player;
                rellenarTablero(jsonResponse.gameInfo);
            }
        };
        xhttp.open("POST", "https://tictactoe.codifi.cat/", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send('{"action": "infoGame","gameName": "' + nombrePartida + '"}');
}

function rellenarTablero(arrayGame){
    //console.log(arrayGame);
    for(var key in arrayGame){
        if(arrayGame[key] != "" ){
            document.getElementById(key).innerHTML = '<img src="' + arrayGame[key] + '.png">';
        }
    }
}

function alertaError(mensaje){
    alert(mensaje);
}