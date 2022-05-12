window.onload = seleccion;

function seleccion(){
    document.getElementById("info").style = 'display:block';
    document.getElementById("primerMenu").style = 'display:block';
    document.getElementById("crearMenu").style = 'display:none';
    document.getElementById("unirseMenu").style = 'display:none';
    //AddEventListener a los botones de inicar partida. Llama a la funcion para obtener los valores
    document.getElementById("btnCrear").addEventListener("click", obtener_valores, false);
    document.getElementById("btnUnirse").addEventListener("click", obtener_valores, false);
}

function obtener_valores(){
    accion = this.id;

    if(accion == "btnUnirse"){
        unirsePartidaMenu();
    }else{
        crearPartidaMenu();
    }

}

function unirsePartidaMenu(){
    document.getElementById("primerMenu").style = 'display:none';
    document.getElementById("unirseMenu").style = 'display:block';

    
    document.getElementById("btnUnirseMenu").addEventListener("click", unirsePartida, false);
    document.getElementById("btnVolver").addEventListener("click", seleccion, false);
}

function unirsePartida(){
    console.log("FDFFF");
    document.getElementById("info").style = 'diplay:none';
    nombrePartida = document.getElementById("partida").value;
    jugador ="O";
    intervalID = setInterval(infoPartida,500);
    generarEscuchas();
}

function crearPartidaMenu(){

    document.getElementById("primerMenu").style = 'display:none';
    document.getElementById("crearMenu").style = 'display:block';
    document.getElementById("btnCrear").removeEventListener("click", obtener_valores, false);
    document.getElementById("btnCrearMenu").addEventListener("click", crearPartida, false);
    document.getElementById("btnVolver2").addEventListener("click", seleccion, false);
}

function crearPartida(){
    
    document.getElementById("info").style = 'display:none';
    nombrePartida = document.getElementById("partida").value;
    passwordPartida = document.getElementById("password").value;

    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                jugador = "X";

                if(JSON.parse(this.responseText).status == "KO"){
                    document.getElementById('mensajes').innerHTML = "Contraseña incorrecta";
                    document.getElementById("info").style = 'display:block';
                    crearPartidaMenu();
                }else{
                    intervalID = setInterval(infoPartida,500);
            generarEscuchas();
                }
                
            }
        };
        xhttp.open("POST", "https://tictactoe.codifi.cat/", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send('{"action": "createGame","gameName": "' + nombrePartida + '","gamePassword": "' + passwordPartida + '"}');
        
        
}

function generarEscuchas(){
    
    var celdas = document.getElementsByClassName("celda");

    for(var celda of celdas){
        celda.addEventListener("click", jugada, false);
    }
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
                var jsonResponse = JSON.parse(this.responseText);
                turnoJugador = jsonResponse.player;
                rellenarTablero(jsonResponse.gameInfo);
                turno(jsonResponse.player);
            }
        };
        xhttp.open("POST", "https://tictactoe.codifi.cat/", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send('{"action": "infoGame","gameName": "' + nombrePartida + '"}');
}

function comprobarFinPartida(arrayGame){
    console.log("A1:" + arrayGame['A1'] + "  A2:" + arrayGame['A2'] + "  A3:" + arrayGame['A3']);
    if((arrayGame['A1'] == arrayGame['A2']) && (arrayGame['A2'] == arrayGame['A3']) && (arrayGame['A2'] != "")){
        clearInterval(intervalID);
        finPartida(arrayGame['A1']);
    }else if((arrayGame['B1'] == arrayGame['B2']) && (arrayGame['B2'] == arrayGame['B3']) && (arrayGame['B2'] != "")){
        clearInterval(intervalID);
        finPartida(arrayGame['B1']);
    }else if((arrayGame['C1'] == arrayGame['C2']) && (arrayGame['C2'] == arrayGame['C3']) && (arrayGame['C2'] != "")){
        clearInterval(intervalID);
        finPartida(arrayGame['C1']);
    }else if((arrayGame['A1'] == arrayGame['B1']) && (arrayGame['B1'] == arrayGame['C1']) && (arrayGame['A1'] != "")){
        clearInterval(intervalID);
        finPartida(arrayGame['A1']);
    }else if((arrayGame['A2'] == arrayGame['B2']) && (arrayGame['B2'] == arrayGame['C2']) && (arrayGame['A2'] != "")){
        clearInterval(intervalID);
        finPartida(arrayGame['A2']);
    }else if((arrayGame['A3'] == arrayGame['B3']) && (arrayGame['B3'] == arrayGame['C3']) && (arrayGame['A3'] != "")){
        clearInterval(intervalID);
        finPartida(arrayGame['A3']);
    }else if((arrayGame['A1'] == arrayGame['B2']) && (arrayGame['B2'] == arrayGame['C3']) && (arrayGame['A1'] != "")){ 
        clearInterval(intervalID);
        finPartida(arrayGame['A1']);
    }else if((arrayGame['A3'] == arrayGame['B2']) && (arrayGame['B2'] == arrayGame['C1']) && (arrayGame['A3'] != "")){
        clearInterval(intervalID);
        finPartida(arrayGame['A3']);
    }else if((arrayGame['A1'] != "") &&(arrayGame['A2'] != "") &&(arrayGame['A3'] != "") &&(arrayGame['B1'] != "") &&(arrayGame['B2'] != "") &&(arrayGame['B3'] != "") &&(arrayGame['C1'] != "") &&(arrayGame['C2'] != "") &&(arrayGame['C3'] != "") ){
        clearInterval(intervalID);
        finPartida("");
    }
}

function finPartida(ganador){
    if(ganador == ""){
        document.getElementById('ganadorH2').innerHTML = "EMPATE";
    }else{
        document.getElementById('ganadorH2').innerHTML = "HA GANADO " + ganador;
    }
    
    document.getElementById("unirseMenu").style = 'display:none';
    document.getElementById("crearMenu").style = 'display:none';

    setTimeout(() => { seleccion(); }, 1000);
}


function rellenarTablero(arrayGame){
    //console.log(arrayGame);
    for(var key in arrayGame){
        if(arrayGame[key] != "" ){
            document.getElementById(key).innerHTML = '<img src="' + arrayGame[key] + '.png">';
        }else{
            document.getElementById(key).innerHTML = ''; 
        }
    }
    comprobarFinPartida(arrayGame);
}

function alertaError(mensaje){
    document.getElementById("tablero_id").style.boxShadow = "0 0px 20px 10px red"
    setTimeout(function() {document.getElementById("tablero_id").style.boxShadow = "0 0px 20px 10px black";}, 150);
    setTimeout(function() {document.getElementById("tablero_id").style.boxShadow = "0 0px 20px 10px red";}, 300);
    setTimeout(function() {document.getElementById("tablero_id").style.boxShadow = "0 0px 20px 10px black";}, 450);
        
    return; 
}

function turno(turnoJugada){
    if(jugador == turnoJugada){
        document.getElementById("Turno").style = 'background-color: green';
        document.getElementById("Turno").textContent = "TU TURNO";
    }else if(turnoJugada == ""){
        document.getElementById("Turno").style = 'background-color: orange';
        document.getElementById("Turno").textContent = "INICIA EL MAS RAPIDO !";
    }else{
        document.getElementById("Turno").style = 'background-color: red';
        document.getElementById("Turno").textContent = "TURNO DEL ENEMIGO";
    }
    
 
}