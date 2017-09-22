document.addEventListener('DOMContentLoaded', function(){


var header              = document.getElementById('header')
const container_origen  = document.getElementById('container_origen')
const container_destino = document.getElementById('container_destino')

var casillas_destino    = document.getElementById('container_destino').getElementsByTagName('div')
var casillas_actuales   = container_destino.getElementsByTagName('div')

var piezas              = document.getElementById('container_origen').getElementsByTagName('img')

var nombre_puzzle
var pulsado

var contador = 0
var cont     = 0










function limpiar_puzzle()
{
	container_origen.innerHTML  = ""
	container_destino.innerHTML = ""
}







// CREACIÓN DE REJILLAS
function crear_rejillas( numero_de_casillas )
{
	limpiar_puzzle()

	for(let i=0; i < numero_de_casillas; i++)
	{
		const capa_casilla_origen    = document.createElement('div')
		const capa_casilla_destino   = document.createElement('div')

		capa_casilla_origen.id       = "origen"  + (i + 1) // Sumo 1 para que el 1er ID sea 1 en lugar de 0.
		capa_casilla_destino.id      = "destino" + (i + 1)



				estilo_casillas( capa_casilla_origen, capa_casilla_destino, numero_de_casillas )

				container_origen.appendChild( capa_casilla_origen )
				container_destino.appendChild( capa_casilla_destino )
	}
}
crear_rejillas( "16" ) // 16 por defecto






// ESTILO DE LA REJILLA
function estilo_casillas( capa_casilla_origen, capa_casilla_destino, numero_de_casillas )
{
	capa_casilla_destino.style.transition = "all, .3s"

	switch( numero_de_casillas )
	{
		case '9': 
		capa_casilla_origen.classList.add('casillas-9')
		capa_casilla_destino.classList.add('casillas-9')
		break

		case '16':
		capa_casilla_origen.classList.add('casillas-16')
		capa_casilla_destino.classList.add('casillas-16')
		break

		case '25':
		capa_casilla_origen.classList.add('casillas-25')
		capa_casilla_destino.classList.add('casillas-25')
		break
	}
}
//***********************************************************








// BUSCAR PUZZLE ALEATORIO (adaptar el random al número de puzzles) !!!!
function buscar_puzzle_aleatorio()
{
	let indice_lista
	const random = Math.random()
	const lista  = ["bermeer", "correggio", "meninas", "chapelle"]
	


	if(random > 0 && random < 0.25)
	{
		indice_lista = 0
	}
	else if(random > 0.25 && random < 0.50)
	{
		indice_lista = 1
	}
	else if(random > 0.50 && random < 0.75)
	{
		indice_lista = 2
	}
	else
	{
		indice_lista = 3
	}

	nombre_puzzle = lista[ indice_lista ] // Variable global. Primer puzzle asignado por defecto

	insertar_puzzle( nombre_puzzle )

} buscar_puzzle_aleatorio()
//*************************************************************************






// INSERTAR PUZZLE
function insertar_puzzle( nombre_puzzle )
{
	for(let i=0; i < casillas_actuales.length; i++)
	{
		let casilla_ID    = "origen" + (i + 1)  // Para que no comience por 0
		let casilla       = document.getElementById(casilla_ID)


		casilla.innerHTML = '<img class="piezas" id="' + (i + 1) + '" src="img/' +  nombre_puzzle + '/' + casillas_actuales.length + '/' + (i + 1) + '.jpg">'
	}

	asignar_eventos_a_piezas()
}
//***********************************************************






// ASIGNAR EVENTO A LA LISTA DE PUZZLES
function evento_desplegable()
{
	let selector_puzzle = document.getElementsByClassName('li-lista')

	for(let i=0; i < selector_puzzle.length; i++)
	{
		selector_puzzle[i].addEventListener('click', enviar_por_lista)
	}
} evento_desplegable()








// ASIGNAR EVENTO A LOS RADIO BUTTONS
function identificar_radio_buttons()
{
	let radio_buttons = document.getElementsByClassName('radio');

	for(let i=0; i < 3; i++)
	{
		radio_buttons[i].addEventListener('change', enviar_por_radio);
	}
} identificar_radio_buttons();







// ENVIAR POR RADIO BUTTON
function enviar_por_radio(event)
{
	crear_rejillas( radio_checked() )
	insertar_puzzle( nombre_puzzle )
}







// REVISAR CHECKED DE LOS RADIO BUTTONS
function radio_checked()
{
	let radio = document.getElementsByClassName('radio')

	for(let i=0; i < 3; i++)
	{
		if(radio[i].checked == true) // Mantenemos el nº de casillas seleccionado por el usuario al cambiar el puzzle
		{
			return radio[i].dataset.piezas // Obtener el nº de casillas asignado al atributo data
		}
	}
}








// ENVIAR POR LISTA
function enviar_por_lista(event)
{
	nombre_puzzle = this.dataset.name; // Sobreescribimos el puzzle de la variable, al identificarlo de la lista con el atributo data

	limpiar_puzzle()
	crear_rejillas( radio_checked() )
	insertar_puzzle( nombre_puzzle, casillas_actuales.length )
}





//*******************************************************************************************************
//*******************************************************************************************************





function poner_borde()
{
	this.style.border = "2px solid red" 
}

function quitar_borde()
{
	this.style.border = "none" 
}






function asignar_eventos_a_piezas()
{
	for(let i=0; i < piezas.length; i++)
	{
		piezas[i].style.transition = "all, 0s"
		piezas[i].style.cursor     = "move"

		piezas[i].addEventListener('mouseover' ,  poner_borde)
		piezas[i].addEventListener('mouseleave',  quitar_borde)

		piezas[i].addEventListener('mousedown' ,  mouse_down)
	}
}
asignar_eventos_a_piezas()







var arrastrar_pieza

function mouse_down(event)
{
	var pieza = event.target
	event.preventDefault()

	var posicion_pieza_x = pieza.getBoundingClientRect().left
	var posicion_pieza_y = pieza.getBoundingClientRect().top

	


		window.addEventListener('mousemove', mover)
		function mover(event)
		{
			pieza.style.left   = (event.clientX - posicion_pieza_x) - pieza.offsetWidth  / 2 + 'px'
			pieza.style.top    = (event.clientY - posicion_pieza_y) - pieza.offsetHeight / 2 + 'px'

			pieza.style.zIndex = 100

			arrastrar_pieza = "yes" // Da permiso para activar las casillas
		}




		window.addEventListener('mouseup', soltar)

		function soltar()
		{
			window.removeEventListener('mousemove', mover)

			pieza.style.left   = "0px"
			pieza.style.top    = "0px"
			pieza.style.zIndex = 0

			arrastrar_pieza = "no" // Deshabilita el permiso

			contador = 0 
			// Para revisar si el puzzle está bien construído. 
			// Es necesario resetear el contador aquí para que 
			// no acumule llamadas a la función con el mousemove
		}	
}








window.addEventListener('mousedown', function(){
	pulsado = true
})
window.addEventListener('mouseup', function(){
	pulsado = false
})




window.addEventListener('mousemove', function(event)
{

	if(arrastrar_pieza == "yes") // Si arrastramos una pieza se activan las casillas. Si no, no
	{
		for(var i=0; i < casillas_destino.length; i++)
		{
			var casilla_origen  = document.getElementById('origen'  + (i + 1))

			if( event.clientX > casilla_origen.getBoundingClientRect().left &&
			    event.clientX < casilla_origen.getBoundingClientRect().right &&
			    event.clientY > casilla_origen.getBoundingClientRect().top &&
			    event.clientY < casilla_origen.getBoundingClientRect().bottom)
			{

				var atributo_origen = casilla_origen.getAttribute('id')

				var lista_origen = []
				lista_origen.push(atributo_origen)

				// NOTA: Al recorrer las casillas, el bucle registra
				// todas las capas. Pero la que nos interesa es sólo
				// la última registrada. Para ello las almacenamos
				// todas en un array, el cual es reseteado a cero
				// al comienzo de cada lectura. De este modo siempre 
				// contiene un sólo elemento: el último almacenado.



				window.addEventListener('mouseup', function(event){ // IMPORTANTE PONER AQUÍ EVENT, PARA QUE EL EVENT.TARGET DEJE DE SER UNA IMAGEN...

					if(event.target.nodeName == 'IMG') // ...Y AL CLICAR EN LA REJILLA NO NOS DE FALLO
					{
						if(lista_origen.length == 1) // Si hay casilla seleccionada introduce en ella el event.target
						{
							document.getElementById( lista_origen[0] ).appendChild(event.target)
							lista_origen = [] // Deselecciona la casilla para que no se muevan las piezas a ella al clicarlas
						}
					}
				})
				
			}

		} // for(var i=0; i < piezas.length; i++)


		for(var i=0; i < casillas_destino.length; i++)
		{
			var casilla_seleccionada = document.getElementById('destino' + (i + 1))

			if( event.clientX > casilla_seleccionada.getBoundingClientRect().left &&
			    event.clientX < casilla_seleccionada.getBoundingClientRect().right &&
			    event.clientY > casilla_seleccionada.getBoundingClientRect().top &&
			    event.clientY < casilla_seleccionada.getBoundingClientRect().bottom)
			{

				casilla_seleccionada.style.backgroundColor = "red"

				var atributo_destino = casilla_seleccionada.getAttribute('id')

				var lista_destino = []
				lista_destino.push(atributo_destino)





				window.addEventListener('mouseup', function(event){ // IMPORTANTE PONER AQUÍ EVENT, PARA QUE EL EVENT.TARGET DEJE DE SER UNA IMAGEN...

					document.getElementById( atributo_destino ).style.backgroundColor = "transparent" // Quitamos el color a la casilla. Con lista_destino[0] da error


					if(event.target.nodeName == 'IMG') // ...Y AL CLICAR EN LA REJILLA NO NOS DE FALLO
					{
						if(lista_destino.length == 1) // Si hay casilla seleccionada introduce en ella el event.target
						{
							document.getElementById( lista_destino[0] ).appendChild(event.target)
							lista_destino = [] // Deselecciona la casilla para que no se muevan las piezas a ella al clicarlas

							setTimeout(function(){
								revisar_si_lleno()
							}, 300) // Para que le de tiempo a insertar la pieza. Por extraño que parezca, esta es la solución
							
						}
					}
				}) // window.addEventListener('mouseup')

				
			}
			else
			{
				casilla_seleccionada.style.backgroundColor = "transparent"
			}
		} // for(var i=0; i < piezas.length; i++)
	} // if(pulsado == true)
}) // window.addEventListener('mousemove)








function revisar_si_lleno()
{
	if(contador == 0) // Para que llame a la función sólo una vez
	{
		var imagenes_destino = container_destino.getElementsByTagName('img')


		if(imagenes_destino.length == casillas_destino.length)
		{
			validar_resultado()
		}

		contador = 1
	}
}



var cont = 0

function validar_resultado()
{
	var resultado = ""

	for(var i=1; i < casillas_destino.length+1; i++)
	{
		var casilla         = document.getElementById('destino' + (i)) // Localizar casilla
		var lista_de_piezas = casilla.getElementsByTagName('img') // localizar su imagen


		var pieza    = lista_de_piezas[0] // Localizar su única imagen. 
							    // Ha de ser 0 porque cada casilla 
							    // tiene su propia nodelist 
							    // con un único elemento 

		var pieza_ID = pieza.getAttribute('id')

		resultado = resultado + pieza_ID
		console.log(resultado)
	}	

			if(resultado == "574632198" || 
			   resultado == "57463219151114161210138" || 
			   resultado == "12101177222194155316131121149252482018236")
			{
				suricata("correcto") 
			}
			else
			{
				suricata("incorrecto")
			}
}




function suricata(validacion)
{
	var mensaje
	var resultado = validacion
	var capa      = document.createElement('div')

	capa.classList.add('suricata')

	header.appendChild(capa)


	if(resultado == "presentacion")
	{
		
		mensaje                    = "Completa el puzzle" + "<br/>" + "y te diré si es correcto"
		animacion_capa(capa, mensaje, "presentacion")
	}
	else if(resultado == "correcto")
	{
		capa.style.backgroundImage = "url('img/suricata/correcto.gif" + "?a=" + Math.random() + "')"
		mensaje                    = "¡BRAVO!" + "<br/>" + "¡Has completado el puzzle!"
		animacion_capa(capa, mensaje, "correcto")
	}
	else
	{
		capa.style.backgroundImage = "url('img/suricata/incorrecto.gif" + "?a=" + Math.random() + "')"
		mensaje                    = "No es correcto..." + "<br/>" + "Inténtalo de nuevo"
		animacion_capa(capa, mensaje, "incorrecto")
	}
}
suricata("presentacion")





function animacion_capa(capa, mensaje, tipo_de_animacion)
{
	capa.style.left                     = "100%"
	capa.style.transition               = "all, 3.1s" // Duración de la entrada
	capa.style.transitionTimingFunction = "linear"
	
	var tipo_de_animacion
	var duracion_pausa
	var delay_mensaje
	var duracion_mensaje


	if(tipo_de_animacion == "presentacion")
	{
		duracion_pausa   = 10000 
		delay_mensaje    = 4000
		duracion_mensaje = 3000
	}
	else if(tipo_de_animacion == "correcto")
	{
		duracion_pausa   = 11600
		delay_mensaje    = 4000
		duracion_mensaje = 4000	
	}
	else
	{
		duracion_pausa   = 8100
		delay_mensaje    = 4900
		duracion_mensaje = 2500	
	}
	

		setTimeout(function(){

				capa.style.left = "40%" // Entra en escena
				capa.style.backgroundImage = "url('img/suricata/presentacion.gif" + "?a=" + Math.random() + "')"

				setTimeout(function(){
					suricata_mensaje(mensaje, duracion_mensaje)
				}, delay_mensaje) // Espera antes de lanzar el mensaje


						setTimeout(function(){
							capa.style.left = "-30%"
						}, duracion_pausa) // Duración de la pausa

		}, 2000) // Delay antes de entrar en escena
}





function suricata_mensaje(mensaje, duracion_mensaje)
{
	var capa_mensaje  = document.createElement('div')
	var texto         = document.createElement('p')
	texto.innerHTML   = mensaje
	

	capa_mensaje.classList.add('mensaje')


	capa_mensaje.appendChild(texto)
	header.appendChild(capa_mensaje)

	

	setTimeout(function(){

		capa_mensaje.style.height = "80px"
		capa_mensaje.style.color  = "#fff"

			setTimeout(function(){
				capa_mensaje.style.height = "0px"
				capa_mensaje.style.color  = "transparent"
			}, duracion_mensaje)

	}, 20) // Para que le de tiempo a cargar la hoja de estilos
	

	setTimeout(function(){
		capa_mensaje.parentNode.removeChild(capa_mensaje)
	}, 15000)
}













// MOSTRAR / OCULTAR REJILLA
var boton_rejilla = document.getElementById('mostrar_rejilla')
var click = 0

boton_rejilla.addEventListener('click', function(){

	for(let i=0; i < casillas_destino.length; i++)
	{
		casillas_destino[i].classList.toggle('rejilla')
	}

	if(click == 0)
	{
		boton_rejilla.value = "Ocultar rejilla"
		click = 1
	}
	else
	{
		boton_rejilla.value = "Mostrar rejilla"
		click = 0
	}

	console.log(click)
})




function outline()
{
	let allElements = document.getElementsByTagName('*');

	for(let i=0; i < allElements.length; i++)
	{
		let elem = allElements[i];

		elem.classList.toggle('outline');
	}
}
document.getElementById('outline').addEventListener('click',outline);

});