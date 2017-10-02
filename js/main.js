document.addEventListener('DOMContentLoaded', function(){


var header              = document.getElementById('header')
const container_origen  = document.getElementById('container_origen')
const container_destino = document.getElementById('container_destino')

var casillas_destino    = document.getElementById('container_destino').getElementsByTagName('div')
var casillas_actuales   = container_destino.getElementsByTagName('div')

var piezas              = document.getElementById('container_origen').getElementsByTagName('img')

var nombre_puzzle

var contador = 0


// PARA LA ANIMACIÓN DE LA DISCOTECA
var color_texto = document.getElementById('color_texto')
//******************************************************


// PARA VER LA SOLUCIÓN
var capa_solucion  = document.getElementById('capa_solucion')
var boton_solucion = document.getElementById('mostrar_solucion')
var boton_rejilla  = document.getElementById('mostrar_rejilla')
//**************************************************************


// PARA LOS CUSTOM RADIO BUTTONS
var custom_radio_button = document.getElementsByClassName('custom-radio-button')
//******************************************************************************







function limpiar_puzzle()
{
	container_origen.innerHTML  = ""
	container_destino.innerHTML = ""
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

				container_origen.appendChild(  capa_casilla_origen )
				container_destino.appendChild( capa_casilla_destino )
	}


	
	if(click == 1) // Si la opción "mostrar rejilla" está activada, mantener la clase rejilla
	{
		for(let i=0; i < casillas_destino.length; i++)
		{
			casillas_destino[i].classList.add('rejilla')
		}
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







// ASIGNAR EVENTOS A LA LISTA DE PUZZLES
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


// OCULTAR MINIATURAS
function miniaturas_ocultar(event)
{
	capa_miniatura.parentNode.removeChild(capa_miniatura)
}





// RADIO BUTTONS
//****************************************************************************

// SELECCIONAR Y FORMATEAR RADIO 16
function formatear_radio_16()
{
	custom_radio_button[1].previousElementSibling.checked = true; // Activar radio 16

	radio_button_seleccionado()
	formato_label()
}
formatear_radio_16()





// ASIGNAR EVENTO CLICK A LOS CUSTOM RADIO BUTTOMS
function asignar_evento_radio()
{
	for(let i=0; i < 3; i++)
	{
		custom_radio_button[i].addEventListener('click', actualizar_radio_buttons)
	}
}
asignar_evento_radio()




// ACTUALIZAR RADIO BUTTONS
function actualizar_radio_buttons()
{
	for(let i=0; i < 3; i++)
	{
		custom_radio_button[i].innerHTML = "" // Vaciamos todos los custom radio buttons
	}
	
	// this.appendChild(insertar_circulo()) // Y luego insertamos el círculo en el que haya sido seleccionado
	this.previousElementSibling.checked = true // Activamos el radio button correspondiente

	radio_button_seleccionado()
	formato_label()
	enviar_por_radio()
}
// Al clicar el custom radio button, este identifica su hermano anterior,
// que es el radio button adyacente, y lo pone en modo checked.
// Inmediatamente llamamos a la función enviar_por_radio(), la cual a su 
// vez llama a crear_rejillas(), pasando como parámetro la función radio_checked().
// Esta lo que hace es identificar cual de los radio buttons hemos seleccionado
// previamente, y obtiene de él el nº de piezas a través de su atributo data-piezas.



// FORMATO A RADIO BUTTON SELECCIONADO
function radio_button_seleccionado()
{
	for(var i=0; i < 3; i++) // Revisamos los radio para ver si están seleccionados
	{
		custom_radio_button[i].style.transition = "none" // Para evitar artificialidad en la sombra


		if(custom_radio_button[i].previousElementSibling.checked == true)
		{
			custom_radio_button[i].classList.add('radio-button-seleccionado')


			// PASANDO PARÁMETROS AL SETTIMEOUT ******************************
			setTimeout(insertar, 0, i) // SetTimeout acepta un 3er parámetro
			function insertar(i)
			{
				custom_radio_button[i].appendChild(insertar_circulo())
			}
			//****************************************************************
		}
		else
		{
			custom_radio_button[i].classList.remove('radio-button-seleccionado')
		}
	}
}


// CREAR CÍRCULO
function insertar_circulo()
{
	var circulo = document.createElement('div')
	circulo.classList.add('circulo')
	return circulo
}





// FORMATO AL LABEL DEL RADIO SELECCIONADO
function formato_label()
{
	for(var i=0; i < 3; i++)
	{
		if(custom_radio_button[i].previousElementSibling.checked == true)
		{
			custom_radio_button[i].previousElementSibling.parentNode.lastElementChild.classList.add('label-radio-seleccionada')
		}
		else
		{
			custom_radio_button[i].previousElementSibling.parentNode.lastElementChild.classList.remove('label-radio-seleccionada')
		}
	}
}






// ENVIAR POR RADIO BUTTON
function enviar_por_radio()
{
	crear_rejillas(radio_checked()) // Obtiene el nº de piezas
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





// ASIGNAR EVENTOS A PIEZAS
function asignar_eventos_a_piezas()
{
	for(let i=0; i < piezas.length; i++)
	{
		piezas[i].style.transition = "all, 0s"
		piezas[i].style.cursor     = "move"

		piezas[i].addEventListener('mouseover' ,  poner_borde)
		piezas[i].addEventListener('mouseleave',  quitar_borde)
		piezas[i].addEventListener('mousedown' ,  mouse_down)

		piezas[i].addEventListener('touchstart',  poner_borde) // MÓVIL
		piezas[i].addEventListener('touchend',  quitar_borde)
		piezas[i].addEventListener('touchstart',  mouse_down)
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
		window.addEventListener('touchmove', mover) // MÓVIL

		function mover(event)
		{
			// INSTRUCCIONES PARA VERSIÓN MÓVIL **************************************************************************
			var userAgent = navigator.userAgent || navigator.vendor || window.opera;

			if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) || /windows phone/i.test(userAgent))
			{
				pieza.style.left = (event.changedTouches[0].clientX - posicion_pieza_x) - pieza.offsetWidth   / 2 + 'px'
				pieza.style.top  = (event.changedTouches[0].clientY - posicion_pieza_y) - pieza.offsetHeight  / 2 + 'px'
			}
			//************************************************************************************************************


			pieza.style.left      = (event.clientX - posicion_pieza_x) - pieza.offsetWidth  / 2 + 'px'
			pieza.style.top       = (event.clientY - posicion_pieza_y) - pieza.offsetHeight / 2 + 'px'

			pieza.style.boxShadow = "0 5px 15px #333"
			pieza.style.zIndex    = 100
			arrastrar_pieza       = "yes" // Da permiso para activar las casillas
		}




		window.addEventListener('mouseup', soltar)
		window.addEventListener('touchend', soltar) // MÓVIL

		function soltar()
		{
			window.removeEventListener('mousemove', mover)
			window.removeEventListener('touchmove', mover) // MÓVIL

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










// COLOCAR PIEZAS
window.addEventListener('mousemove', colocar_piezas)
window.addEventListener('touchmove', colocar_piezas) // MÓVIL

function colocar_piezas(event)
{
	if(arrastrar_pieza == "yes") // Si arrastramos una pieza se activan las casillas. Si no, no
	{
		for(var i=0; i < casillas_destino.length; i++)
		{
			var casilla_origen  = document.getElementById('origen'  + (i + 1))


			// INSTRUCCIONES PARA VERSIÓN MÓVIL **************************************************************************
			var userAgent = navigator.userAgent || navigator.vendor || window.opera;

			if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) || /windows phone/i.test(userAgent))
			{
				if( event.changedTouches[0].clientX > casilla_origen.getBoundingClientRect().left &&
				    event.changedTouches[0].clientX < casilla_origen.getBoundingClientRect().right &&
				    event.changedTouches[0].clientY > casilla_origen.getBoundingClientRect().top &&
				    event.changedTouches[0].clientY < casilla_origen.getBoundingClientRect().bottom)
				{
					panel_origen()
				}
			}
			//************************************************************************************************************


			if( event.clientX > casilla_origen.getBoundingClientRect().left &&
			    event.clientX < casilla_origen.getBoundingClientRect().right &&
			    event.clientY > casilla_origen.getBoundingClientRect().top &&
			    event.clientY < casilla_origen.getBoundingClientRect().bottom)
			{
				panel_origen()
			} 


			function panel_origen()
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


				window.addEventListener('mouseup', soltar_origen)
				window.addEventListener('touchend', soltar_origen) // MÓVIL

				function soltar_origen(event) // IMPORTANTE PONER AQUÍ EVENT, PARA QUE EL EVENT.TARGET DEJE DE SER UNA IMAGEN...
				{
					if(event.target.nodeName == 'IMG') // ...Y AL CLICAR EN LA REJILLA NO NOS DE FALLO
					{
						if(lista_origen.length == 1) // Si hay casilla seleccionada introduce en ella el event.target
						{
							document.getElementById( lista_origen[0] ).appendChild(event.target)
							lista_origen = [] // Deselecciona la casilla para que no se muevan las piezas a ella al clicarlas
						}
					}
				} // soltar_origen(event) 
			} // panel_origen()
		} // for(var i=0; i < casillas_destino.length; i++)




		for(var i=0; i < casillas_destino.length; i++)
		{
			var casilla_seleccionada = document.getElementById('destino' + (i + 1))


			// INSTRUCCIONES PARA VERSIÓN MÓVIL **************************************************************************
			var userAgent = navigator.userAgent || navigator.vendor || window.opera;

			if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) || /windows phone/i.test(userAgent))
			{
				if( event.changedTouches[0].clientX > casilla_seleccionada.getBoundingClientRect().left &&
				    event.changedTouches[0].clientX < casilla_seleccionada.getBoundingClientRect().right &&
				    event.changedTouches[0].clientY > casilla_seleccionada.getBoundingClientRect().top &&
				    event.changedTouches[0].clientY < casilla_seleccionada.getBoundingClientRect().bottom)
				{		
					casilla_seleccionada.style.border = "1px solid red"
					panel_destino()
				}
				else
				{
					casilla_seleccionada.style.backgroundColor = "transparent"
					casilla_seleccionada.style.border = "none"
				}
			}
			//************************************************************************************************************



			if( event.clientX > casilla_seleccionada.getBoundingClientRect().left &&
			    event.clientX < casilla_seleccionada.getBoundingClientRect().right &&
			    event.clientY > casilla_seleccionada.getBoundingClientRect().top &&
			    event.clientY < casilla_seleccionada.getBoundingClientRect().bottom)
			{
				panel_destino()
			}
			else
			{
				casilla_seleccionada.style.backgroundColor = "transparent"
			}


			function panel_destino()
			{
				casilla_seleccionada.style.backgroundColor = "red"

				var atributo_destino = casilla_seleccionada.getAttribute('id')

				var lista_destino = []
				lista_destino.push(atributo_destino)



				window.addEventListener('mouseup', soltar_destino)
				window.addEventListener('touchend', soltar_destino) // MÓVIL

				function soltar_destino(event) // IMPORTANTE PONER AQUÍ EVENT, PARA QUE EL EVENT.TARGET DEJE DE SER UNA IMAGEN...
				{
					if(event.target.nodeName == 'IMG') // ...Y AL CLICAR EN LA REJILLA NO NOS DE FALLO
					{
						if(lista_destino.length == 1) // Si hay casilla seleccionada introduce en ella el event.target
						{
							document.getElementById( lista_destino[0] ).appendChild(event.target)
							document.getElementById( lista_destino[0] ).style.border = "none" // Para la versión móvil
							lista_destino = [] // Deselecciona la casilla para que no se muevan las piezas a ella al clicarlas

							setTimeout(function(){
								revisar_si_lleno()
							}, 300) // Para que le de tiempo a insertar la pieza. Por extraño que parezca, esta es la solución
						}
					}
				} // soltar_destino(event) 
			} // panel_destino()
		} // for(var i=0; i < casillas_destino.length; i++)
	} // if(arrastrar_pieza == "yes")
} // function colocar_piezas()







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
	// Para ver la animación tras cada juego
	header.style.top = "0px"
	//****************************************



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

	var sprite_position_x  = 0
	var iteraciones = 0



	var mensaje_presentacion = "Completa el puzzle" + "<br/>" + "y te diré si es correcto"
	var mensaje_correcto     = "¡BRAVO!" + "<br/>" + "¡Has completado el puzzle!"
	var mensaje_incorrecto   = "No es correcto..." + "<br/>" + "Sigue probando"




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

			clearInterval(iniciar)
		}
	}, 90)
}
// flexion("correcto")






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


	// ACTIVAR DISCOTECA
	titulo_estroboscopico() 
	formato_focos()
	focos_radio_buttons()
	fiesta_color_texto()



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






// INCORRECTO
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







// AGACHARSE
function agacharse()
{
	var sprite_position_x    = -3000 // Nos saltamos un par de frames para un mejor resultado

	var capa_flexion = document.getElementById('flexion')
	capa_flexion.style.left =  ((header.offsetWidth / 2) - 100) + "px"
	capa_flexion.style.visibility = "visible"

	
	var iteraciones = 0
	

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







// SALIDA
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
capa_solucion.style.backgroundImage = "none"
boton_solucion.value     = "Mostrar solución"


// Por si se redimensiona la página
window.addEventListener('resize', posicion_solucion)
function posicion_solucion()
{
	var container_solucion_rejilla = document.getElementById('container_solucion_rejilla')

	capa_solucion.style.left = ((header.offsetWidth / 2) - 100) + "px"

	// if(window.matchMedia("(min-width: 480px)").matches)
	// {
	// 	capa_solucion.style.left = ((header.offsetWidth / 2) - 100) + "px"
	// }
}




// ASIGNAR PUZZLE A SOLUCIÓN
function asignar_puzzle_a_solucion(event)
{
	capa_solucion.style.left = ((header.offsetWidth / 2) - 100) + "px"



	if(innerWidth < 480)
	{
		capa_solucion.style.left = ((header.offsetWidth / 2) - 100) + "px"
	}
	


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











// DISCOTECA
//*********************************************************************************************************

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




// FORMATO PARA LOS FOCOS
function formato_focos()
{
	// NOTA: 
	// Este juego de retrasos en la ejecución de las acciones,
	// tiene por objetivo mejorar el aspecto de la animación.


	var index = 0

	for(var i=0; i < 3; i++) // Quitamos el formato de los custom radio buttons
	{
		custom_radio_button[i].style.transition = "all, .4s"
		custom_radio_button[i].innerHTML = ""
		custom_radio_button[i].nextElementSibling.style.visibility = "hidden"

		custom_radio_button[i].classList.add('foco-quitar-sombra')
		custom_radio_button[i].classList.add('foco-size')



			function quitar_borde()
			{
				var z = i // Capturamos los tres valores de i

				setTimeout(function(){ // Optimizar con el tercer parámetro
					custom_radio_button[z].classList.add('custom-quitar-border')
				}, 300)
			}
			quitar_borde()




			function restaurar_formato()
			{
				var z = i // Capturamos los tres valores de i

				setTimeout(function(){

					custom_radio_button[z].classList.remove('foco-size')
					custom_radio_button[z].classList.remove('custom-quitar-border')
					custom_radio_button[z].classList.remove('foco-quitar-sombra')
					custom_radio_button[z].nextElementSibling.style.visibility = "visible"

					setTimeout(function(){
						radio_button_seleccionado()
					}, 500)
					

				}, 10000)
			}
			restaurar_formato()
	}
}




// FOCOS LUCES
function focos_radio_buttons()
{
	var i = 0
	var intervalos = 0
	


	var iniciar = setInterval(function(){

		i == 3 ? i = 0 : false


		custom_radio_button[i].classList.toggle('foco-luces')
		i = i + 1


		intervalos = intervalos + 1
		intervalos == 96 ? clearInterval(iniciar) : false	

	}, 100)
}




// FIESTA COLOR TEXTO
function fiesta_color_texto()
{
	color_texto.style.transition = "all, .4s"
	color_texto.classList.add('fiesta-color-texto')
	color_texto.innerHTML = "¡Prueba superada!"

	setTimeout(function(){
		color_texto.classList.remove('fiesta-color-texto')
		color_texto.innerHTML = "Elige el número de piezas"
	}, 10000)
}
//*********************************************************************************************************









// OCULTAR MENÚ
var boton_menu = document.getElementById('boton_menu')
boton_menu.addEventListener('click', function(){
	header.style.top = "-310px"
})

// MOSTRAR MENÚ
var icono_menu = document.getElementById('icono_menu')
icono_menu.addEventListener('click', function(){
	header.style.top = "0px"
})






window.addEventListener('resize', formato_landscape)

function formato_landscape()
{
	var container_puzzle = document.getElementById('container_puzzle')



	if(innerHeight < (header.offsetHeight + container_puzzle.offsetHeight))
	{
		header.style.position = "absolute"
		header.style.maxWidth = "1200px"
		boton_menu.style.display = "flex"
		icono_menu.style.display = "flex"
		container_puzzle.style.marginTop = "25px"
	}
	else
	{
		header.style.position = "relative"
		header.style.top = "0px"
		boton_menu.style.display = "none"
		icono_menu.style.display = "none"
		container_puzzle.style.marginTop = "2%"
	}
	
}
formato_landscape()

console.log('base puzzle: ' + container_destino.getBoundingClientRect().bottom)
console.log('viewport height: ' + innerHeight)
















function outline()
{
	let allElements = document.getElementsByTagName('*');

	for(let i=0; i < allElements.length; i++)
	{
		let elem = allElements[i];

		elem.classList.toggle('outline');
	}
}
// document.getElementById('outline').addEventListener('click',outline);




});