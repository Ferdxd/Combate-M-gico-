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
let ataqueJugador
let ataqueEnemigo
let proteccionJugador
let proteccionEnemigo


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
                    ataqueJugador=ataque
                    lanzarAtaque()
                    reaccionAleatoriaEnemigo()
                    actualizarVida()
                    boton.style.background='white'
                    boton.disabled=true
                }      
            })
            defensasJugador.forEach((defensa)=>{
                if(e.target.textContent==defensa.nombre){
                proteccionJugador=defensa
                ataqueJugador=null
                activarDefensaJugador()
                actualizarVida()
                boton.style.background='white'
                boton.disabled=true
                }
                    })
        })
    })
    
}

function actualizarVida(){
    vidasEnemigo.innerHTML="vida "+vidaEnemigo
    vidasJugador.innerHTML="vida "+vidaJugador
}

function lanzarAtaque(){
    console.log(personajeJugador.nombre+ " Lanza "+ataqueJugador.nombre+" contra:"+personajeEnemigo.nombre+" e inflige "+ataqueJugador.damage+ " de daño")
    vidaEnemigo-=ataqueJugador.damage
   // console.log("vida "+vidaEnemigo)
}

function activarDefensaJugador(){
    let reduccionFinal
    let dañoFinal
    ataqueEnemigo=null
    proteccionEnemigo=null
    console.log(personajeJugador.nombre+" Ha Utilizado Hechizo De Defensa "+proteccionJugador.nombre)
    reaccionAleatoriaEnemigo()
    if(proteccionEnemigo==null){
        if(ataqueEnemigo!=null){
            if(ataqueEnemigo.nombre==proteccionJugador.nombre){
                reduccionFinal=(proteccionJugador.reduccionDaño+proteccionJugador.reduccionExtra)
                vidaJugador+=reduccionFinal
                dañoFinal=(ataqueEnemigo.damage-reduccionFinal)
                console.log(proteccionJugador.nombre+" Es Fuerte Contra "+ataqueEnemigo.nombre+ " Por lo tanto se reduce el daño se reduce a "+dañoFinal)
            }else{
                reduccionFinal=proteccionJugador.reduccionDaño
                vidaJugador+=reduccionFinal
                dañoFinal=(ataqueEnemigo.damage-reduccionFinal)  
                console.log(proteccionJugador.nombre+ " Reduce el daño de "+ataqueEnemigo.nombre+" a "+ dañoFinal)
            }
        }
      
    }else{
        console.log("ambos lanzaron hechizos de proteccion")
    }
   
}

function reaccionAleatoriaEnemigo(){
      let tipoAtaque=aleatorio(1,2)
      tipoAtaque=2
      if(tipoAtaque==1){
        lanzarAtaqueEnemigo()
      }else{
        activarDefensaEnemigo()
      }
}
function lanzarAtaqueEnemigo(){
        if(ataquesEnemigo.length!=0){
            let ataqueAleatorio = aleatorio(0,ataquesEnemigo.length-1)

            if(ataqueJugador!=null){
               
                ataqueEnemigo=ataquesEnemigo[ataqueAleatorio]
                console.log(personajeEnemigo.nombre+" Lanza "+ataqueEnemigo.nombre+ " contra:"+ personajeJugador.nombre+" e inflige "+ataqueEnemigo.damage+ " de daño")
                vidaJugador-=ataqueEnemigo.damage
               // actualizarVida()
                console.log(ataquesEnemigo.splice(ataqueAleatorio,1))
                console.log(ataquesEnemigo)
                
            }else{
                console.log(ataquesEnemigo.splice(ataqueAleatorio,1))
            }
           
          
        }else{
            activarDefensaEnemigo()
        }  
        
}

function activarDefensaEnemigo(){
    if(defensasEnemigo.length!=0){
        let defensaAleatoria=aleatorio(0,defensasEnemigo.length-1);
        if(ataqueJugador!=null){
            proteccionEnemigo=defensasEnemigo[defensaAleatoria]
            let dañoFinal
            let reduccionFinal
            console.log(personajeEnemigo.nombre+" Utiliza Hechizo De Defensa: "+proteccionEnemigo.nombre)
            if(ataqueJugador.nombre==proteccionEnemigo.fortaleza){
                reduccionFinal=(proteccionEnemigo.reduccionDaño+proteccionEnemigo.reduccionExtra)
                vidaEnemigo+=reduccionFinal
                dañoFinal=(ataqueJugador.damage-reduccionFinal)
                console.log(proteccionEnemigo.nombre+ " Es Fuerte Contra "+ataqueJugador.nombre+" Por lo tanto el daño se reduce a "+ dañoFinal)
            }else{
                reduccionFinal=proteccionEnemigo.reduccionDaño
                vidaEnemigo+=reduccionFinal
                dañoFinal=(ataqueJugador.damage-reduccionFinal)
                console.log(proteccionEnemigo.nombre+ " Reduce el daño de "+ataqueJugador.nombre+" a "+ dañoFinal)
            }
            defensasEnemigo.splice(defensaAleatoria,1)
        }else{
            console.log("2 hechizos de defensa no se hacen ningun danio")
            defensasEnemigo.splice(defensaAleatoria,1)
        }
      
    }else{
        lanzarAtaqueEnemigo()
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