//sectionMapa
const sectionMapa = document.getElementById('mapa')

//secciones de modalidad de juegos
const sectionMenuPrincipal=document.getElementById('menu-principal')
const btn_1jugador=document.getElementById('btn_unJugador')
const btn_multijugador=document.getElementById('btn_multijugador')

const barraVida = document.getElementById('vida-player')
const spanVida = document.querySelector('.barra-vida span')
const barraVidaEnemigo=document.getElementById('vida-enemy')
const spanVidasEnemigo=document.querySelector('.barra-vida-enemigo span')

const infoAtaqueJugador=document.querySelector('.info-ataque-jugador span')
const infoAtaqueEnemigo=document.querySelector('.info-ataque-enemigo span')


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
let ataqueJugador
let ataqueEnemigo
let proteccionJugador
let proteccionEnemigo
let ataquesContador=0



//section personajes
const divContenedorPersonajes=document.getElementById('contenedorPersonajes')
const divContenedorAtaques=document.getElementById('contenedorAtaques')
const divContenedorDefensas=document.getElementById('contenedorDefensas')
const personaje_Seleccionado=document.getElementById('btn_personaje')


//section modo-combate
const resultadoFinal=document.getElementById('resultado')
const sectionCombate=document.getElementById('modo-combate')

const fotoJugador=document.getElementById('foto-jugador')
const vidasJugador=document.getElementById('vidas-jugador')
const nombreJugador=document.getElementById('nombre-jugador')
const mensajeJugador=document.getElementById('mensajes-ataque-jugador')

const fotoEnemigo=document.getElementById('foto-enemigo')
const vidasEnemigo=document.getElementById('vidas-enemigo')
const nombreEnemigo=document.getElementById('nombre-enemigo')
const mensajeEnemigo=document.getElementById('mensajes-ataque-enemigo')


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

class Hechizo{
    constructor(nombre, descripcion){
        this.nombre=nombre
        this.descripcion=descripcion
    }
}

class HechizoAtaque extends Hechizo{
    constructor(nombre,descripcion,damage){
        super(nombre,descripcion)
        this.damage=damage

    }
}

class HechizoDefensa extends Hechizo{
    constructor(nombre, descripcion, reduccionDaño, fortaleza, reduccionExtra){
        super(nombre, descripcion)
        this.reduccionDaño=reduccionDaño
        this.fortaleza=fortaleza
        this.reduccionExtra=reduccionExtra
    }
}

//hechizosAtaque 
const expelliarmus=new HechizoAtaque('Expelliarmus','Desarma al oponente y causa daño moderado',30)
const stupefy=new HechizoAtaque('Stupefy','Aturde al oponente y causa daño leve',20)
const reducto=new HechizoAtaque('Reducto','Causa daño significativo al oponente',40)

//hechizosDefensa
const protego=new HechizoDefensa('Protego','Reduce el daño recibido',10, 'Stupefy', 5)
const escudoMagico=new HechizoDefensa('Escudo Magico','Absorbe una cantidad fija de daño.',20, 'Reducto',10)

//creacion de personajes jugables

let harryPotter=new Personaje('Harry Potter', './assets/harry_potter.png',100,'harry')
let ronWeasley=new Personaje('Ron Weasley','./assets/Ron_Weasley.png',100,'ron')
let hermioneGranger=new Personaje('Hermione Granger','./assets/Hermione_Granger.png',100,'hermione')

//ataques disponibles
// <p>Expelliarmus, Stupefy, Reducto</p>
// <p>Protego, Escudo Magico</p>

//botones ataques
let btnAtaque1
let btnAtaque2
let btnAtaque3
let botonesAtaques=[]
//botones Defensas
let btnDefensa1
let btnDefensa2


harryPotter.ataques.push(expelliarmus,stupefy,reducto)
harryPotter.defensas.push(protego,escudoMagico)

hermioneGranger.ataques.push(expelliarmus,stupefy,reducto)
hermioneGranger.defensas.push(protego,escudoMagico)

//ronWeasley.ataques.push(...ataquesTipoDaño)
ronWeasley.ataques.push(expelliarmus,stupefy,reducto)
ronWeasley.defensas.push(protego,escudoMagico)

personajes.push(harryPotter,ronWeasley,hermioneGranger)



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


    fotoJugador.innerHTML=`<img src=${personajeJugador.foto} />`
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
   nombreEnemigo.innerHTML= personajeEnemigo.nombre
   fotoEnemigo.innerHTML=`<img src=${personajeEnemigo.foto} />`
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
    mostrarSkills(defensasJugador,'boton-ataques',divContenedorDefensas) 
    btnAtaque1=document.getElementById(ataquesJugador[0].nombre)
    btnAtaque2=document.getElementById(ataquesJugador[1].nombre)
    btnAtaque3=document.getElementById(ataquesJugador[2].nombre)
    botonesAtaques=document.querySelectorAll('.boton-ataques')
    

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
                    proteccionJugador=null
                    ataqueJugador=ataque
                    lanzarAtaque(ataqueJugador)
                    reaccionEnemigo()
                    boton.style.background='white'
                    boton.disabled=true
                    ataquesContador++
                }      
            })
            defensasJugador.forEach((defensa)=>{
                if(e.target.textContent==defensa.nombre){
                ataqueJugador=null
                proteccionJugador=defensa
                activarDefensa(proteccionJugador)
                reaccionEnemigo();
                boton.style.background='white'
                boton.disabled=true
                ataquesContador++
                }
                    }
                )
                if(ataquesContador==5){
                    Ganador()
                }
        })
    })
    
}

function lanzarAtaque(x){
    infoAtaqueJugador.textContent="Nombre: "+x.nombre + "\n\n"
    //caracteristicas del ataque
    infoAtaqueJugador.textContent+="Descripción: "+ x.descripcion+ "\n\n"
    infoAtaqueJugador.textContent+="Daño del hechizo: "+ x.damage
}

function activarDefensa(x){
    infoAtaqueJugador.textContent="Nombre: "+x.nombre+ "\n"
    //caracteristicas del ataque
    infoAtaqueJugador.textContent+="Descripción: "+ x.descripcion + "\n"
    //reduccion de damage
    infoAtaqueJugador.textContent+="Reduccion de daño: "+ x.reduccionDaño+ "\n"
    //si es fuerte contra un hechizo se le aplicara una bonificacion y reducira mas el damage
    infoAtaqueJugador.textContent+="Fuerte contra: "+ x.fortaleza+ "\n"
    infoAtaqueJugador.textContent+="Reduccion extra: "+x.reduccionExtra
}

function reaccionEnemigo(){
    let tipoAtaque=aleatorio(1,2)
   
    if(tipoAtaque==1){
        if(ataquesEnemigo!=null){
            lanzarAtaqueEnemigo()
        }else{
            //no hay ataques disponibles
            activarDefensaEnemigo()
        }
        
    }else if(tipoAtaque==2){
        if(defensasEnemigo!=null){
            activarDefensaEnemigo()
        }else{
            lanzarAtaqueEnemigo()
            //no hay defensas disponibles
        }
        
    }
}

function lanzarAtaqueEnemigo(){
    proteccionEnemigo=null
    let ataqueAleatorio=aleatorio(0,ataquesEnemigo.length-1)
    console.log(ataqueAleatorio)
    infoAtaqueEnemigo.textContent="Nombre: "+ ataquesEnemigo[ataqueAleatorio].nombre+"\n"
    infoAtaqueEnemigo.textContent+="Descripcion: "+ataquesEnemigo[ataqueAleatorio].descripcion+"\n"
    infoAtaqueEnemigo.textContent+="Daño de hechizo: "+ataquesEnemigo[ataqueAleatorio].damage+"\n"

    ataqueEnemigo=ataquesEnemigo[ataqueAleatorio]
   
    ataquesEnemigo.splice(ataqueAleatorio,1)
    
    console.log(ataquesEnemigo)
    choqueAtaques()
   
}

function activarDefensaEnemigo(){
    ataqueEnemigo=null
    let defensaAleatoria
    if(defensasEnemigo.length>0){
        defensaAleatoria=aleatorio(0,defensasEnemigo.length-1)
    }else{
        defensaAleatoria=0
    }
    
    console.log(defensasEnemigo)
    infoAtaqueEnemigo.textContent="Nombre: "+ defensasEnemigo[defensaAleatoria].nombre+"\n"
    infoAtaqueEnemigo.textContent+="Descripcion: "+defensasEnemigo[defensaAleatoria].descripcion+"\n"
    infoAtaqueEnemigo.textContent+="Reduccion de daño: "+defensasEnemigo[defensaAleatoria].reduccionDaño+"\n"
    infoAtaqueEnemigo.textContent+="Fuerte contra: "+defensasEnemigo[defensaAleatoria].fortaleza+"\n"
    infoAtaqueEnemigo.textContent+="Reduccion Extra: "+defensasEnemigo[defensaAleatoria].reduccionExtra+"\n"

    proteccionEnemigo=defensasEnemigo[defensaAleatoria]

    defensasEnemigo.splice(defensaAleatoria,1)

    choqueAtaques()

}

function choqueAtaques(){
    let damageTotalJugador
    let damageTotalEnemigo
    if(ataqueJugador!=null && ataqueEnemigo!=null){
        vidaEnemigo-=ataqueJugador.damage
        vidaJugador-=ataqueEnemigo.damage
        mensajeEnemigo.textContent="Ha infligido "+ataqueEnemigo.damage+ " de daño a "+ personajeJugador.nombre
        mensajeJugador.textContent="Ha infligido "+ataqueJugador.damage+ " de daño a "+ personajeEnemigo.nombre
        resultadoFinal.textContent="Ambos reciben daño"
        actualizarVida()
    }
    else if(ataqueJugador!=null && proteccionEnemigo!=null){
        if(proteccionEnemigo.fortaleza==ataqueJugador.nombre){
            damageTotalJugador=ataqueJugador.damage-(proteccionEnemigo.reduccionDaño+proteccionEnemigo.reduccionExtra)
            vidaEnemigo-=damageTotalJugador
        }else{
            damageTotalJugador=ataqueJugador.damage-proteccionEnemigo.reduccionDaño
            vidaEnemigo-=damageTotalJugador
        }
        actualizarVida()
        mensajeJugador.textContent="Ha infligido "+damageTotalJugador+ " de daño a "+ personajeEnemigo.nombre
        mensajeEnemigo.textContent="Ha reducido el daño "
    }
    else if(proteccionJugador!=null && ataqueEnemigo!=null){
        if(proteccionJugador.fortaleza==ataqueEnemigo.nombre){
            damageTotalEnemigo=ataqueEnemigo.damage-(proteccionJugador.reduccionDaño+proteccionJugador.reduccionExtra)
            vidaJugador-=damageTotalEnemigo
        }else{
            damageTotalEnemigo=ataqueEnemigo.damage-proteccionJugador.reduccionDaño
            vidaJugador-=damageTotalEnemigo
        }
        actualizarVida()
        mensajeEnemigo.textContent="Ha infligido "+damageTotalEnemigo+ " de daño a "+ personajeJugador.nombre
        mensajeJugador.textContent="Ha reducido el daño "
    }else if(proteccionEnemigo!=null && proteccionEnemigo!=null){
        mensajeJugador.textContent="Ha utilizado Hechizo de defensa"
        mensajeEnemigo.textContent="Ha utilizado Hechizo de defensa"
        resultadoFinal.textContent="Ambos utilizaron Hechizo de defensa"
    }
}


function actualizarVida(){
    vidasEnemigo.innerHTML="vida "+vidaEnemigo
    vidasJugador.innerHTML="vida "+vidaJugador
    actualizarVidaBarra(vidaJugador,vidaEnemigo)
}


function actualizarVidaBarra(vidaJugadorx,vida_enemigoy) {
    barraVida.value = vidaJugadorx;
    spanVida.textContent = vidaJugadorx + '%';
    barraVidaEnemigo.value= vida_enemigoy;
    spanVidasEnemigo.textContent=vida_enemigoy+ '%';
  }


function Ganador(){
    if(vidaJugador>vidaEnemigo){
        alert("Has Ganado")
    }else{
        alert("Has Perdido")
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