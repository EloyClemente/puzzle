document.addEventListener('DOMContentLoaded', function(){


const container_origen  = document.getElementById('container_origen')
const container_destino = document.getElementById('container_destino')

var piezas              = document.getElementById('container_origen').getElementsByTagName('img')
var casillas_destino    = document.getElementById('container_destino').getElementsByTagName('div')

var pulsado










function limpiar_puzzle()
{
	container_origen.innerHTML  = ""
	container_destino.innerHTML = ""
}







// CREACIÓN DE REJILLAS
function crear_rejillas(numero_de_casillas)
{
	limpiar_puzzle()

	for(let i=0; i < numero_de_casillas; i++)
	{
		const capa_casilla_origen    = document.createElement('div')
		const capa_casilla_destino   = document.createElement('div')

		capa_casilla_origen.id       = "origen"  + (i + 1) // Sumo 1 para que el 1er ID sea 1 en lugar de 0.
		capa_casilla_destino.id      = "destino" + (i + 1)



				estilo_casillas(capa_casilla_origen, capa_casilla_destino, numero_de_casillas)

				container_origen.appendChild(capa_casilla_origen)
				container_destino.appendChild(capa_casilla_destino)
	}
}
crear_rejillas("16") // 16 por defecto






// ESTILO DE LA REJILLA
function estilo_casillas(capa_casilla_origen, capa_casilla_destino, numero_de_casillas)
{
	switch(numero_de_casillas)
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
	const lista  = ["bermeer", "chapelle"]
	


	if(random < 0.5)
	{
		indice_lista = 0
	}
	else
	{
		indice_lista = 1
	}

	var nombre_puzzle = lista[indice_lista]

	insertar_puzzle( nombre_puzzle, "16" )
}
buscar_puzzle_aleatorio()
//*************************************************************************





// INSERTAR PUZZLE
function insertar_puzzle( nombre_puzzle, numero_de_casillas)
{
	for(let i=0; i < numero_de_casillas; i++)
	{
		let casilla_ID    = "origen" + (i + 1)  // Para que no comience por 0
		let casilla       = document.getElementById(casilla_ID)


		casilla.innerHTML = '<img id="' + (i + 1) + '" src="img/' +  nombre_puzzle + '/' + numero_de_casillas + '/' + (i + 1) + '.jpg" >'
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
		selector_puzzle[i].addEventListener('click', enviar_puzzle)
	}
} evento_desplegable()








// ASIGNAR EVENTO A LOS RADIO BUTTONS
function identificar_radio_buttons()
{
	let radio_buttons = document.getElementsByClassName('radio');

	for(let i=0; i < 3; i++)
	{
		radio_buttons[i].addEventListener('change', obtener_data_radio_buttons);
	}
} identificar_radio_buttons();









// ENVIAR POR LISTA
function enviar_puzzle(event)
{
	nombre_puzzle          = this.dataset.name; // Identificar el puzzle de la lista con el atributo data
	let numero_de_casillas = container_origen.getElementsByTagName('div').length // Contar casillas

	insertar_puzzle( nombre_puzzle, numero_de_casillas )
}









// DATA DE LOS RADIO BUTTONS
function obtener_data_radio_buttons(event)
{
	let numero_de_casillas = this.dataset.piezas; // Obtener el nº de casillas asignado al atributo data

	crear_rejillas( numero_de_casillas )
	insertar_puzzle( nombre_puzzle, numero_de_casillas )
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
		piezas[i].addEventListener('mouseover' ,  poner_borde)
		piezas[i].addEventListener('mouseleave',  quitar_borde)

		piezas[i].addEventListener('mousedown' ,  drag_start)
	}
}
asignar_eventos_a_piezas()






function identificar_pieza()
{
	return event.target
}



function url_pieza()
{
	return event.target.getAttribute('src')
}






function drag_start()
{
	// event.preventDefault()

	var pieza = event.target

	// pieza_ID      = event.target.id
	// pieza_url     = event.target.getAttribute('src')

	console.log(pieza)

	var posicion_pieza_x = pieza.getBoundingClientRect().left
	var posicion_pieza_y = pieza.getBoundingClientRect().top



		window.addEventListener('mousemove', mover)

		function mover()
		{
			event.preventDefault()

			pieza.style.left = (event.clientX - posicion_pieza_x) - pieza.offsetWidth  / 2 + 'px'
			pieza.style.top  = (event.clientY - posicion_pieza_y) - pieza.offsetHeight / 2 + 'px'

			pieza.style.zIndex = 100
		}




		window.addEventListener('mouseup', soltar)

		function soltar()
		{
			window.removeEventListener('mousemove', mover)

			pieza.style.left   = "0px"
			pieza.style.top    = "0px"
			pieza.style.zIndex = 0
			
			// document.getElementById("origen" + pieza_ID).innerHTML = "" 
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
	if(pulsado == true)
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
				console.log(atributo_origen)

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
						console.log(lista_origen[0])
						document.getElementById(lista_origen[0]).appendChild(identificar_pieza())
					}
				})
			}
			else
			{

			}
		} // for(var i=0; i < piezas.length; i++)


		for(var i=0; i < casillas_destino.length; i++)
		{
			var casilla_destino = document.getElementById('destino' + (i + 1))

			if( event.clientX > casilla_destino.getBoundingClientRect().left &&
			    event.clientX < casilla_destino.getBoundingClientRect().right &&
			    event.clientY > casilla_destino.getBoundingClientRect().top &&
			    event.clientY < casilla_destino.getBoundingClientRect().bottom)
			{

				casilla_destino.style.backgroundColor = "red"

				var atributo_destino = casilla_destino.getAttribute('id')
				console.log(atributo_destino)
				

				var lista_destino = []
				lista_destino.push(atributo_destino)



				window.addEventListener('mouseup', function(event){ // IMPORTANTE PONER AQUÍ EVENT, PARA QUE EL EVENT.TARGET DEJE DE SER UNA IMAGEN...

					if(event.target.nodeName == 'IMG') // ...Y AL CLICAR EN LA REJILLA NO NOS DE FALLO
					{
						console.log(event.target)
						document.getElementById(lista_destino[0]).appendChild(identificar_pieza())
					}
				})
			}
			else
			{
				casilla_destino.style.backgroundColor = "transparent"
			}
		} // for(var i=0; i < piezas.length; i++)
	} // if(pulsado == true)
}) // window.addEventListener('mousemove)



















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