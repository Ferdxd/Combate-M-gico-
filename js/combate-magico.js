//secciones de modalidad de juegos
const btn_1jugador=document.getElementById('btn_unJugador')
const btn_multijugador=document.getElementById('btn_multijugador')


//personajes jugables
let rbtn_hermione
let rbtn_harry
let rbtn_ron
let personajes=[]

//section personajes
const divContenedorPersonajes=document.getElementById('contenedorPersonajes')

const personaje_Seleccionado=document.getElementById('btn_personaje')

//estructura de cada personaje
class Personaje{
    constructor(nombre,foto, vida, id){
        this.id=id
        this.nombre=nombre
        this.foto=foto
        this.vida=vida
        this.ataques=[]
        this.defensas=[]
        this.ancho=40
        this.alto=40
        this.velocidadX=0
        this.velocidadY=0
    }

    pintarPersonaje(){

    }
}

//creacion de personajes jugables

let harryPotter=new Personaje('Harry Potter', './assets/harry_potter.png',5,'harry')
let ronWeasley=new Personaje('Ron Weasley','./assets/Ron_Weasley.png',5,'ron')
let hermioneGranger=new Personaje('Hermione Granger','./assets/Hermione_Granger.png',5,'hermione')

//ataques disponibles
// <p>Expelliarmus, Stupefy, Reducto</p>
// <p>Protego, Escudo Magico</p>

const ataquesTipoDaño=[
    {nombre:'Expelliarmus', descripcion:'Desarma al oponente y causa daño moderado'},
    {nombre:'Stupefy',descripcion:'Aturde al oponente y causa daño leve'},
    {nombre:'Reducto',descripcion:'Causa daño significativo al oponente'}
]

const hechizosDefensa=[
    {nombre:'Protego',descripcion:'Reduce el daño recibido'},
    {nombre:'Escudo Magico',descripcion:'Absorbe una cantidad fija de daño.'}
]

harryPotter.ataques.push(...ataquesTipoDaño)
harryPotter.defensas.push(...hechizosDefensa)

hermioneGranger.ataques.push(...ataquesTipoDaño)
hermioneGranger.defensas.push(...hechizosDefensa)

ronWeasley.ataques.push(...ataquesTipoDaño)
ronWeasley.defensas.push(...hechizosDefensa)

personajes.push(harryPotter,ronWeasley,hermioneGranger)

function personajesSeleccionables(){
    let opcionPersonajes=null;
    personajes.forEach((personaje)=>{
        opcionPersonajes=`<input type="radio" id=${personaje.id} name="personaje"/>
        <label class="tarjeta-personaje" for=${personaje.id}>
        <img src=${personaje.foto} alt=${personaje.id} height="60px" widht="60px"/>
        <p>${personaje.nombre}</p>
        </label>`
        divContenedorPersonajes.innerHTML+=opcionPersonajes
    })
    rbtn_hermione=document.getElementById('hermione')
    rbtn_harry=document.getElementById('harry')
    rbtn_ron=document.getElementById('ron')
}

//funcion principal
function main(){
    btn_1jugador.addEventListener('click', modo_unJugador)
    btn_multijugador.addEventListener('click', modo_multijugador)
    personajesSeleccionables()
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

    alert("El personaje que seleccionaste es: "+nombre_personaje)

}

window.addEventListener('load',main)