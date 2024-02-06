//sectionMapa
const sectionMapa = document.getElementById('mapa')

//secciones de modalidad de juegos
const sectionMenuPrincipal=document.getElementById('menu-principal')
const btn_1jugador=document.getElementById('btn_unJugador')
const btn_multijugador=document.getElementById('btn_multijugador')


//personajes jugables
const sectionSeleccionPersonaje=document.getElementById('seleccionar-personaje')
let rbtn_hermione
let rbtn_harry
let rbtn_ron
let personajes=[]
let personajeJugador
let personajeEnemigo
let vidaEnemigo
let vidaJugador


//section personajes
const divContenedorPersonajes=document.getElementById('contenedorPersonajes')
const divContenedorAtaques=document.getElementById('contenedorAtaques')
const divContenedorDefensas=document.getElementById('contenedorDefensas')
const personaje_Seleccionado=document.getElementById('btn_personaje')


//section modo-combate
const sectionCombate=document.getElementById('modo-combate')
const vidasJugador=document.getElementById('vidas-jugador')
const nombreJugador=document.getElementById('nombre-jugador')

const vidasEnemigo=document.getElementById('vidas-enemigo')
const nombreEnemigo=document.getElementById('nombre-enemigo')


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

let harryPotter=new Personaje('Harry Potter', './assets/harry_potter.png',10,'harry')
let ronWeasley=new Personaje('Ron Weasley','./assets/Ron_Weasley.png',10,'ron')
let hermioneGranger=new Personaje('Hermione Granger','./assets/Hermione_Granger.png',10,'hermione')

//ataques disponibles
// <p>Expelliarmus, Stupefy, Reducto</p>
// <p>Protego, Escudo Magico</p>

//botones ataques
let btnExpelliarmus
let btnStupefy
let btnReducto
let botonesAtaques=[]
let secuenciaAtaquesJugador=[]
//botones Defensas
let btnProtego
let btnEscudoMagico

const ataquesTipoDaño=[
    {nombre:'Expelliarmus', descripcion:'Desarma al oponente y causa daño moderado', damage:3},
    {nombre:'Stupefy',descripcion:'Aturde al oponente y causa daño leve', damage:2},
    {nombre:'Reducto',descripcion:'Causa daño significativo al oponente', damage:4}
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
        <img src=${personaje.foto} alt=${personaje.id} />
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
    sectionMenuPrincipal.style.display="none"
    btn_1jugador.addEventListener('click', modo_unJugador)
    btn_multijugador.addEventListener('click', modo_multijugador)
    sectionMapa.style.display="none"
    sectionCombate.style.display="none"
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
    if(rbtn_harry.checked){
        personajeJugador=seleccionPersonajeJugador(rbtn_harry.id)
    }else if(rbtn_hermione.checked){
        personajeJugador=seleccionPersonajeJugador(rbtn_hermione.id)
    }else if(rbtn_ron.checked){
        personajeJugador=seleccionPersonajeJugador(rbtn_ron.id)
    }else{
        alert("No has seleccionado ningun personaje")
        return
    }


    
    nombreJugador.innerHTML=personajeJugador.nombre
    vidaJugador=personajeJugador.vida

    alert("El personaje que seleccionaste es: "+personajeJugador.nombre)

    seleccionEnemigo()

    vidaEnemigo=personajeEnemigo.vida
    actualizarVida()
    extraerAtaques(personajeJugador)
    sectionSeleccionPersonaje.style.display="none"
    sectionCombate.style.display="flex"
    //console.log(extraerAtaques(personajeJugador))

}


function seleccionPersonajeJugador(id){
    let apuntador
    personajes.forEach((personaje)=>{
        if(personaje.id==id){
            apuntador=personaje
        }
    })
    return apuntador
}



function seleccionEnemigo(){
    let personajeElegido=aleatorio(0,personajes.length-1)
    personajeEnemigo=personajes[personajeElegido]
   console.log(personajeEnemigo.nombre)
   nombreEnemigo.innerHTML= personajeEnemigo.nombre
   
}


function extraerAtaques(personajeJugador){
    let ataques=personajeJugador.ataques
    let defensas=personajeJugador.defensas
    
    console.log(ataques)
    console.log(defensas)
    mostrarSkills(ataques,'boton-ataques',divContenedorAtaques)
        
    btnExpelliarmus=document.getElementById('Expelliarmus')
    btnStupefy=document.getElementById('Stupefy')
    btnReducto=document.getElementById('Reducto')
    botonesAtaques=document.querySelectorAll('.boton-ataques')
    mostrarSkills(defensas,'boton-defensas',divContenedorDefensas)

    secuenciaCombate()

//botones Defensas
    //btnProtego
    //btnEscudoMagico
}


function secuenciaCombate(){
    botonesAtaques.forEach((boton)=>{
        boton.addEventListener('click',(e)=>{
            if(e.target.textContent=='Expelliarmus'){
                secuenciaAtaquesJugador.push('Expelliarmus')
                //console.log(secuenciaAtaquesJugador)
                lanzarAtaque('Expelliarmus')
                lanzarAtaqueEnemigo()
                boton.style.background='white'
                boton.disabled=true
            }else if(e.target.textContent=='Stupefy'){
                secuenciaAtaquesJugador.push('Stupefy')
                lanzarAtaque('Stupefy')
                lanzarAtaqueEnemigo()
                boton.style.background='white'
                boton.disabled=true
            }else if(e.target.textContent=='Reducto'){
                secuenciaAtaquesJugador.push('Reducto')
                lanzarAtaque('Reducto')

                lanzarAtaqueEnemigo()
                boton.style.background='white'
                boton.disabled=true
            }
            if(secuenciaAtaquesJugador.length==3){
                alert("ya has presionado todos los botones")
            }
        })
    })
    
}

function actualizarVida(){
    vidasEnemigo.innerHTML="vida "+vidaEnemigo
    vidasJugador.innerHTML="vida "+vidaJugador
}

function lanzarAtaque(nombreAtaque){
    if('Expelliarmus'==nombreAtaque){
        vidaEnemigo-=3
        //alert(personajeJugador.nombre+ "Lanza Hechizo "+" a "+personajeEnemigo.nombre)
        actualizarVida()
    }else if('Stupefy'==nombreAtaque){
        vidaEnemigo-=2
        actualizarVida()
    }else{
        vidaEnemigo-=4
        actualizarVida()
    }

}
function lanzarAtaqueEnemigo(){
    
    let atack=ataquesTipoDaño[aleatorio(0,ataquesTipoDaño.length-1)].nombre
    console.log(atack)
    if('Expelliarmus'==atack){
        vidaJugador-=3
        //alert(personajeJugador.nombre+ "Lanza Hechizo "+" a "+personajeEnemigo.nombre)
        actualizarVida()
    }else if('Stupefy'==atack){
        vidaJugador-=2
        actualizarVida()
    }else{
        vidaJugador-=4
        actualizarVida()
    }
}




function mostrarSkills(skills,claseboton,divs){
    
    skills.forEach((skill)=>{
        divs.innerHTML+=`<button id=${skill.nombre} class=${claseboton}>${skill.nombre}</button>`
    })
}




//funciones extra
function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load',main)