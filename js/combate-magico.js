//secciones de modalidad de juegos
const btn_1jugador=document.getElementById('btn_unJugador')
const btn_multijugador=document.getElementById('btn_multijugador')


//personajes jugables
const rbtn_hermione=document.getElementById('hermione')
const rbtn_harry=document.getElementById('harry')
const rbtn_ron=document.getElementById('ron')

const personaje_Seleccionado=document.getElementById('btn_personaje')

//funcion principal
function main(){
    btn_1jugador.addEventListener('click', modo_unJugador)
    btn_multijugador.addEventListener('click', modo_multijugador)
    personaje_Seleccionado.addEventListener('click',seleccionPersonaje)
}

//funciones de botones
function modo_unJugador(){
    alert("Seleccionaste el modo de un jugador")
}

function modo_multijugador(){
    alert("Seleccionaste el modo multijugador")
}

function seleccionPersonaje(){
    let nombre_personaje
    if(rbtn_harry.checked){
        nombre_personaje=rbtn_harry.id
    }else if(rbtn_hermione.checked){
        nombre_personaje=rbtn_hermione.id
    }else if(rbtn_ron.checked){
        nombre_personaje=rbtn_ron.id
    }else{
        alert("No has seleccionado ningun personaje")
        return
    }

    alert("El persnaje que seleccionaste es: "+nombre_personaje)

}

window.addEventListener('load',main)