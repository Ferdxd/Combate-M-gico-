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
let ataquesJugador=[]
let defensasJugador=[]
let ataquesEnemigo=[]
let defensasEnemigo=[]
let secuenciaAtaquesJugador=[]


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
let btnAtaque1
let btnAtaque2
let btnAtaque3
let botonesAtaques=[]
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
   extraerAtaquesEnemigo(personajeEnemigo)
   
}

function extraerAtaquesEnemigo(personajeEnemigo){
    //ataquesEnemigo=structuredClone(personajeEnemigo.ataques)//sirve para clonar directamente el objeto y no solo referenciarlo
    ataquesEnemigo.push(...personajeEnemigo.ataques)
    defensasEnemigo.push(...personajeEnemigo.defensas)
    console.log("ataques enemigo")
 //   ataquesEnemigo.pop()
  //  console.log(ataquesEnemigo.splice(0,1))
    console.log(ataquesEnemigo)
    
   
}



function extraerAtaques(personajeJugador){
    ataquesJugador=personajeJugador.ataques
    defensasJugador=personajeJugador.defensas
    
    mostrarSkills(ataquesJugador,'boton-ataques',divContenedorAtaques)
        
    btnAtaque1=document.getElementById(ataquesJugador[0].nombre)
    btnAtaque2=document.getElementById(ataquesJugador[1].nombre)
    btnAtaque3=document.getElementById(ataquesJugador[2].nombre)
    botonesAtaques=document.querySelectorAll('.boton-ataques')
    //mostrarSkills(defensasJugador,'boton-defensas',divContenedorDefensas)

    secuenciaCombate()

//botones Defensas
    //btnProtego
    //btnEscudoMagico
}


function secuenciaCombate(){
    botonesAtaques.forEach((boton)=>{
        boton.addEventListener('click',(e)=>{
            ataquesJugador.forEach((ataque)=>{
                if(e.target.textContent==ataque.nombre){
                    secuenciaAtaquesJugador.push(ataque.nombre)
                    lanzarAtaque(ataque.nombre)
                    lanzarAtaqueEnemigo()
                    boton.style.background='white'
                    boton.disabled=true
                }
            })
            if(secuenciaAtaquesJugador.length==3){
                alert("ya has presionado todos los botones")
            }
            /*
            if(e.target.textContent==ataquesJugador[0].nombre){
                secuenciaAtaquesJugador.push('Expelliarmus')
                //console.log(secuenciaAtaquesJugador)
                lanzarAtaque(ataquesJugador[0].nombre)
                lanzarAtaqueEnemigo()
                boton.style.background='white'
                boton.disabled=true
            }else if(e.target.textContent==ataquesJugador[1].nombre){
                secuenciaAtaquesJugador.push('Stupefy')
                lanzarAtaque(ataquesJugador[1].nombre)
                lanzarAtaqueEnemigo()
                boton.style.background='white'
                boton.disabled=true
            }else if(e.target.textContent==ataquesJugador[2].nombre){
                secuenciaAtaquesJugador.push('Reducto')
                lanzarAtaque(ataquesJugador[2].nombre)

                lanzarAtaqueEnemigo()
                boton.style.background='white'
                boton.disabled=true
            }
            if(secuenciaAtaquesJugador.length==3){
                alert("ya has presionado todos los botones")
            }*/
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
    if(ataquesEnemigo.length!=null){
        let ataqueAleatorio = aleatorio(0,ataquesEnemigo.length-1)
        console.log(personajeEnemigo.nombre+" Lanza "+ataquesEnemigo[ataqueAleatorio].nombre+ " contra:"+ personajeJugador.nombre)
        vidaJugador-=ataquesEnemigo[ataqueAleatorio].damage
        console.log(ataquesEnemigo.splice(ataqueAleatorio,1))
        console.log(ataquesEnemigo)
    }else{
        console.log("Ya no hay mas ataques enemigos")
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