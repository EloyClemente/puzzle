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




// VARIABLES PARA VER LA SOLUCIÓN
var capa_solucion  = document.getElementById('capa_solucion')
var boton_solucion = document.getElementById('mostrar_solucion')
var boton_rejilla  = document.getElementById('mostrar_rejilla')
//**************************************************************


// PARA LOS CUSTOM RADIO BUTTONS
var custom_radio = document.getElementsByClassName('custom-radio')
//**************************************************************







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






// ASIGNAR MINIATURAS A LA LISTA DE PUZZLES
// ASIGNAR EVENTO CLICK A LA LISTA DE PUZZLES
function evento_desplegable()
{
	let selector_puzzle = document.getElementsByClassName('li-lista')

	for(let i=0; i < selector_puzzle.length; i++)
	{
		selector_puzzle[i].addEventListener('mouseenter', miniaturas_mostrar)
		selector_puzzle[i].addEventListener('mouseleave', miniaturas_ocultar)
		selector_puzzle[i].addEventListener('click', enviar_por_lista)
	}
} evento_desplegable()






// MOSTRAR MINIATURAS
function miniaturas_mostrar(event)
{
	let li = event.target

	capa_miniatura = document.createElement('div')

	capa_miniatura.classList.add('miniaturas-mostrar')

	li.appendChild(capa_miniatura)


	let imagen = li.dataset.name

	capa_miniatura.style.backgroundImage = "url(img/miniaturas/" + imagen + "-200.jpg)"

	event.stopPropagation()
}



function miniaturas_ocultar(event)
{
	capa_miniatura.parentNode.removeChild(capa_miniatura)
}





// FORMATO RADIO 16
function formatear_radio_16()
{
	var radio_16 = document.getElementById("radio-16")
	radio_16.checked = true; // Activar radio 16
	// formato para el label
	radio_16.parentNode.lastElementChild.style.color = "#009688"
	radio_16.parentNode.lastElementChild.style.fontWeight = "bold"

	custom_radio[0].nextElementSibling.style.color      = "#999"
	custom_radio[0].nextElementSibling.style.fontWeight = "lighter"
	custom_radio[2].nextElementSibling.style.color      = "#999"
	custom_radio[2].nextElementSibling.style.fontWeight = "lighter"
}
formatear_radio_16()




// ASIGNAR EVENTO CLICK A LOS CUSTOM RADIO BUTTOMS Y SELECCIONAR RADIO BUTTOM
var circulo

function custom_radio_buttons()
{
	sombra_custom() // Poner sombra y borde
	border_custom()


	circulo = document.createElement('div')
	circulo.classList.add('circulo')
	custom_radio[1].appendChild(circulo) // Introducimos cículo en el custom radio button 16



	for(let i=0; i < 3; i++)
	{
		// ASIGNAR EVENTO CLICK A LOS CUSTOM RADIO BUTTONS
		custom_radio[i].addEventListener('click', function(event){

				circulo_custom()
				
				this.appendChild(circulo) // Pero lo introducimos en el que ha sido clicado
				this.previousElementSibling.checked = true // Activamos el radio button correspondiente

				sombra_custom()
				formato_label(event)
				enviar_por_radio()
		})
	}
}
custom_radio_buttons()
// Al clicar el custom radio button, este identifica su hermano anterior,
// que es el radio button adyacente, y lo pone en modo checked.
// Inmediatamente llamamos a la función enviar_por_radio(), la cual a su 
// vez llama a crear_rejillas(), pasando como parámetro la función radio_checked().
// Esta lo que hace es identificar cual de los radio buttons hemos seleccionado
// previamente, y obtiene de él el nº de piezas a través de su atributo data-piezas.



// GESTIONAR CÍRCULO
function circulo_custom()
{
	for(let i=0; i < 3; i++)
	{
		custom_radio[i].innerHTML = "" // Eliminamos el cículo de todos los custom radio
	}
}


// GESTIONAR SOMBRA DE LOS CUSTOM RADIO
function sombra_custom()
{
	for(let i=0; i < 3; i++)
	{
		custom_radio[i].classList.add('custom-radio-sombra')

		if(custom_radio[i].previousElementSibling.checked == true)
		{
			custom_radio[i].classList.remove('custom-radio-sombra')
		}
	}
}


// GESTIONAR BORDE DE LOS CUSTOM RADIO
function border_custom()
{
	for(let i=0; i < 3; i++)
	{
		custom_radio[i].classList.add('custom-radio-border')
	}
}






// DAR FORMATO AL LABEL
function formato_label(event)
{
	 var e = event || window.event;
	 var custom_radio_button = e.target;


	let radio = document.getElementsByClassName('radio')


	for(let i=0; i < 3; i++)
	{
		radio[i].parentNode.lastElementChild.style.color      = "gray"
		radio[i].parentNode.lastElementChild.style.fontWeight = "lighter"
	}

	custom_radio_button.nextElementSibling.style.color      = "#009688"
	custom_radio_button.nextElementSibling.style.fontWeight = "bold"
}






// ENVIAR POR RADIO BUTTON
function enviar_por_radio()
{
	crear_rejillas( radio_checked() )
	insertar_puzzle( nombre_puzzle )
}





// REVISAR CHECKED DE LOS RADIO BUTTONS Y OBTENER EL Nº DE PIEZAS DESDE EL ATRIBUTO DATA-PIEZAS
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
		piezas[i].addEventListener('touchstart' ,  poner_borde)
		piezas[i].addEventListener('mouseleave',  quitar_borde)
		piezas[i].addEventListener('touchend',  quitar_borde)

		piezas[i].addEventListener('mousedown' ,  mouse_down)
	}
}
asignar_eventos_a_piezas()






// ARRASTRAR PIEZAS
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
			pieza.style.left      = (event.clientX - posicion_pieza_x) - pieza.offsetWidth  / 2 + 'px'
			pieza.style.top       = (event.clientY - posicion_pieza_y) - pieza.offsetHeight / 2 + 'px'

			pieza.style.boxShadow = "0 5px 15px #333"
			pieza.style.zIndex    = 100
			arrastrar_pieza       = "yes" // Da permiso para activar las casillas
		}




		window.addEventListener('mouseup', soltar)

		function soltar()
		{
			window.removeEventListener('mousemove', mover)

			pieza.style.left      = "0px"
			pieza.style.top       = "0px"
			pieza.style.boxShadow = "none"
			pieza.style.zIndex    = 0
			arrastrar_pieza       = "no" // Deshabilita el permiso

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
	}	

			if(resultado == "574632198" || 
			   resultado == "57463219151114161210138" || 
			   resultado == "12101177222194155316131121149252482018236")
			{
				cont = 0 // Reseteamos las variables que usaremos en la animación
				animacion_de_botones("correcto")
			}
			else
			{
				cont = 0
				animacion_de_botones("incorrecto")
			}
}





//*****************************************************************************
//*****************************************************************************
//*****************************************************************************
//*****************************************************************************




// ANIMACIONES PARA LOS BOTONES REJILLA Y SOLUCIÓN
function animacion_de_botones(respuesta_suricata)
{
	if(respuesta_suricata == "correcto" || respuesta_suricata == "incorrecto")
	{
		fadeOut(boton_solucion, 20)
	}

	if(window.matchMedia("(min-width: 480px)").matches)
	{
		setTimeout(function(){
			boton_rejilla.style.transition = "all, .5s"
			boton_rejilla.style.transform = "translate(0, -30px)"
		}, 1000)
	}


	setTimeout(function(){
			entrada(respuesta_suricata)
	}, 1000)
	
	//************************************************************************
}
animacion_de_botones("presentacion")








// ENTRADA
function entrada(respuesta_suricata)
{
	// ANIMACIÓN DE LA CAPA
	var capa_caminar = document.getElementById('caminar')

	var position_capa = header.offsetWidth // Hay que tomar como referencia el contenedor padre (el header)
	var sprite_position_x = 0
	var cont = 0



	var iniciar = setInterval(function()
	{
		// Mover capa *********************************
		capa_caminar.style.left = position_capa + "px"
		position_capa           = position_capa - 1.4 // Velocidad de la capa
		//*********************************************



		// Mover sprite ****************************************************************************
		if(cont % 3 == 0) // Para que el sprite se mueva sólo en los desplazamientos de capa impares
		{
			capa_caminar.style.backgroundPosition = sprite_position_x + "px" + " 0px"
			sprite_position_x = sprite_position_x - 200
		}
		cont = cont + 0.5
		//******************************************************************************************
		
		


		// Detener capa
		if(capa_caminar.offsetLeft <= (header.offsetWidth / 2) - 100) // Detener en el 50% del header
		{
			flexion(respuesta_suricata)

			setTimeout(function(){ // Para evitar el parpadeo
				caminar.style.visibility = "hidden"
			}, 10)
			
			clearInterval(iniciar)
		}

	}, 10)
}









// FLEXIÓN
function flexion(respuesta_suricata)
{
	var capa_flexion = document.getElementById('flexion')
	capa_flexion.style.left = ((header.offsetWidth / 2) - 100) + "px"

	capa_flexion.style.visibility = "visible"

	var sprite_position_x  = 0 // Esto hace falta
	var iteraciones = 0




	var mensaje_presentacion = "Completa el puzzle" + "<br/>" + "y te diré si es correcto"
	var mensaje_correcto     = "¡BRAVO!" + "<br/>" + "¡Has completado el puzzle!"
	var mensaje_incorrecto   = "No es correcto..." + "<br/>" + "Inténtalo de nuevo"




	var iniciar = setInterval(function(){

		capa_flexion.style.backgroundPosition = sprite_position_x + "px" + " 0px"
		sprite_position_x = sprite_position_x - 200


		iteraciones       = iteraciones + 1


		if(iteraciones == 16) // -3000
		{
			switch(respuesta_suricata)
			{
				case "presentacion":
				presentacion();
				mensaje(mensaje_presentacion, 1000, 4500) // Mensaje, delay y duración
				break;

				case "correcto":
				correcto();
				mensaje(mensaje_correcto, 700, 6000)
				break;

				case "incorrecto":
				incorrecto();
				mensaje(mensaje_incorrecto, 1500, 2500)
				break;
			}


			setTimeout(function(){
				capa_flexion.style.visibility = "hidden" 
			}, 100)

			// capa_flexion.style.backgroundPosition = "-2600px 0px" // Nos saltamos un par de frames para un mejor resultado
			clearInterval(iniciar)
		}
	}, 90)
}







// PRESENTACIÓN
function presentacion()
{
	var capa_presentacion = document.getElementById('presentacion')
	capa_presentacion.style.left = ((header.offsetWidth / 2) - 100) + "px"
	capa_presentacion.style.visibility = "visible"


	var sprite_position_x = 0
	var iteraciones = 0

	

	// Mover sprite
	var iniciar = setInterval(function(){

		capa_presentacion.style.backgroundPosition = sprite_position_x + "px" + " 0px"
		sprite_position_x = sprite_position_x - 200

	
		iteraciones = iteraciones + 1


		if(iteraciones == 90)
		{
			agacharse()

			setTimeout(function(){ // Para evitar el parpadeo
				capa_presentacion.style.visibility = "hidden"
			}, 90)

			capa_presentacion.style.backgroundPosition = "0px 0px"
			clearInterval(iniciar)
		}
	}, 90)
}






// CORRECTO
function correcto()
{
	var capa_correcto = document.getElementById('correcto')
	capa_correcto.style.left =  ((header.offsetWidth / 2) - 100) + "px"
	capa_correcto.style.visibility = "visible"

	var sprite_position_x = 0
	var iteraciones = 0


	titulo_estroboscopico() // Para el título estroboscópico
	fiesta_radio_buttons()


	var iniciar = setInterval(function(){

		capa_correcto.style.backgroundPosition = sprite_position_x + "px" + " 0px"
		sprite_position_x = sprite_position_x - 200


		iteraciones = iteraciones + 1


		// Detener animación
		if(iteraciones == 174)
		{
			agacharse()

			setTimeout(function(){ // Para evitar el parpadeo
				capa_correcto.style.visibility = "hidden"
			}, 10)

			capa_correcto.style.backgroundPosition = "0px 0px"
			clearInterval(iniciar)
		}
	}, 60)
}





function incorrecto()
{
	var capa_incorrecto = document.getElementById('incorrecto')
	capa_incorrecto.style.left =  ((header.offsetWidth / 2) - 100) + "px"
	capa_incorrecto.style.visibility = "visible"

	capa_incorrecto.style.left = header.offsetWidth / 2


	var sprite_position_x = 0
	var iteraciones = 0


	// Mover sprite
	var iniciar = setInterval(function(){

		capa_incorrecto.style.backgroundPosition = sprite_position_x + "px" + " 0px"
		sprite_position_x = sprite_position_x - 200


		iteraciones = iteraciones + 1


		if(iteraciones == 51)
		{
			agacharse()

			setTimeout(function(){ // Para evitar el parpadeo
				capa_incorrecto.style.visibility = "hidden"
			}, 10)

			capa_incorrecto.style.backgroundPosition = "0px 0px"
			clearInterval(iniciar)
		}
	}, 100)
}






function agacharse()
{
	var sprite_position_x    = -3000 // Nos saltamos un par de frames para un mejor resultado

	var capa_flexion = document.getElementById('flexion')
	capa_flexion.style.left =  ((header.offsetWidth / 2) - 100) + "px"
	capa_flexion.style.visibility = "visible"

	
	var iteraciones = 0
	
	
	// capa_flexion.style.backgroundPosition = "-3400px 0px"  // Preparar su posición antes de hacerlo visible
	

	var iniciar = setInterval(function(){

		capa_flexion.style.backgroundPosition = sprite_position_x + "px" + " 0px"

		sprite_position_x = sprite_position_x + 200
		iteraciones       = iteraciones + 1


		if(iteraciones == 17)
		{
			salida()

			setTimeout(function(){ // Para evitar el parpadeo
				capa_flexion.style.visibility = "hidden"
			}, 10)

			capa_flexion.style.backgroundPosition = "0px 0px"
			clearInterval(iniciar)
		}
	}, 90)
}








function salida()
{
	var cont = 0
	var capa_caminar = document.getElementById('caminar')
	caminar.style.visibility = "visible"

	var sprite_position_x = 0


	var position_capa = (header.offsetWidth / 2) - 100

	

	var iniciar = setInterval(function(){

		// Mover la capa ******************************
		capa_caminar.style.left = position_capa + "px"
		position_capa           = position_capa - 1.4 // Velocidad de la capa
		//*********************************************



		// Mover sprite ****************************************************************************
		if(cont % 3 == 0) // Para que el sprite se mueva sólo en los desplazamientos de capa impares
		{
			capa_caminar.style.backgroundPosition = sprite_position_x + "px" + " 0px"
			sprite_position_x = sprite_position_x - 200
		}
		cont = cont + 0.5
		//******************************************************************************************



		// Detener
		if(caminar.getBoundingClientRect().left < header.getBoundingClientRect().left - 200)
		{
			clearInterval(iniciar)

			cont = 0

			boton_rejilla.style.transform = "translate(0, 0)"
			fadeIn(boton_solucion, 20)
			
		}

	}, 10)
}








// MENSAJE
function mensaje(mensaje, delay_mensaje, duracion_mensaje)
{
	var capa_mensaje  = document.createElement('div')
	var texto         = document.createElement('p')
	texto.innerHTML   = mensaje
	

	capa_mensaje.classList.add('mensaje')
	capa_mensaje.style.left = (header.offsetWidth / 2) - 120 + "px"


	capa_mensaje.appendChild(texto)
	header.appendChild(capa_mensaje)


	setTimeout(function(){ // Retrasamos el lanzamiento del mensaje

		capa_mensaje.style.height = "80px"
		capa_mensaje.style.color  = "#fff"

				setTimeout(function(){ // Controlamos su duración
					capa_mensaje.style.height = "0px"
					capa_mensaje.style.color  = "transparent"
				}, duracion_mensaje)

	}, delay_mensaje)
	

	
	

	setTimeout(function(){
		capa_mensaje.parentNode.removeChild(capa_mensaje)
	}, 15000)
}
















// VER SOLUCIÓN
capa_solucion.style.left = (header.offsetWidth - 410) + "px"
capa_solucion.style.backgroundImage = "none"
boton_solucion.value     = "Mostrar solución"


// Por si se redimensiona la página
window.addEventListener('resize', posicion_solucion)
function posicion_solucion()
{
	capa_solucion.style.left = (header.offsetWidth - 410) + "px"
}



function asignar_puzzle_a_solucion(event)
{
	capa_solucion.style.left = (header.offsetWidth - 410) + "px"


	if(event.target.nodeName == 'INPUT')
	{
		if(capa_solucion.style.backgroundImage == "none")
		{
			capa_solucion.style.display = "block"
			fadeIn(capa_solucion, 10)
			
			capa_solucion.style.backgroundImage = "url(img/miniaturas/" + nombre_puzzle + "-200.jpg)"
			boton_solucion.value = "Ocultar solución"

		}
		else
		{
			fadeOut(capa_solucion, 10)
			boton_solucion.value = "Mostrar solución"
		}
	}
	else
	{
		return
	}
}
window.addEventListener('load', asignar_puzzle_a_solucion) // Al llamarla memoriza la variable nombre_puzzle
boton_solucion.addEventListener('click', asignar_puzzle_a_solucion) // Al volver a llamarla ya conoce la variable




// FADE IN
function fadeIn(elemento, intervalos){

	var opacidad   = 0;

	var iniciar = setInterval(function(){
	
				  opacidad =  opacidad + 0.01;

				  elemento.style.opacity = opacidad;

				  if(opacidad >= 1)
				  {
					clearInterval(iniciar);
				  }
	}, intervalos);
}



// FADE OUT
function fadeOut(elemento, intervalos){

	var opacidad   = 1;

	var iniciar = setInterval(function(){
	
				  opacidad =  opacidad - 0.01;

				  elemento.style.opacity = opacidad;

				  if(opacidad <= 0)
				  {
					clearInterval(iniciar);
					capa_solucion.style.backgroundImage = "none"
					capa_solucion.style.display = "none"
				  }
	}, intervalos);
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
})






// TÍTULO ESTROBOSCÓPICO
function titulo_estroboscopico()
{
	var titulo = document.getElementById('titulo')


	var parpadeo = setInterval(function(){
		titulo.classList.toggle('h1-2')
	}, 100)


	setTimeout(function(){
		clearInterval(parpadeo)

		if(titulo.classList.contains('h1-2'))
		{
			titulo.classList.remove('h1-2')
		}
	}, 9700)
}




// FIESTA RADIO BUTTONS
function fiesta_radio_buttons()
{
	var i = 0
	var intervalos = 0
	


	
	for(let i=0; i < 3; i++) // Quitamos el formato de los custom radio buttons
	{
		custom_radio[i].style.transition = "all, .5s"
		custom_radio[i].classList.add('fiesta-buttons-2')
		custom_radio[i].classList.add('fiesta-buttons-3')
		custom_radio[i].classList.remove('custom-radio-border')
		custom_radio[i].innerHTML = ""
		custom_radio[i].nextElementSibling.style.visibility = "hidden"
	}



	var iniciar = setInterval(function(){


		i == 3 ? i = 0 : false

		console.log(i)

		
		custom_radio[i].classList.add('fiesta-buttons-1') // Encender luz
		


		setTimeout(function(){ // Apagar luz
			custom_radio[i].classList.remove('fiesta-buttons-1')
			i = i + 1
		}, 390)



		intervalos = intervalos + 1

		if(intervalos == 24)
		{
			clearInterval(iniciar)

			for(let i=0; i < 3; i++)
			{
				custom_radio[i].classList.remove('fiesta-buttons-1')

				setTimeout(function(){
					custom_radio[i].classList.remove('fiesta-buttons-2')

						setTimeout(function(){
							formatear_radio_16()
							custom_radio_buttons()
							custom_radio[i].classList.remove('fiesta-buttons-3')
							custom_radio[i].nextElementSibling.style.visibility = "visible"
						}, 1000)
				}, 1000)
			}
		}				
	}, 400)
}
// fiesta_radio_buttons()













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





// document.getElementById('probar').addEventListener('click', function(){

// 	correcto()
// })


});