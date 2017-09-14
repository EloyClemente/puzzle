document.addEventListener('DOMContentLoaded', function(){


const container_origen  = document.getElementById('container_origen')
const container_destino = document.getElementById('container_destino')
var piezas              = document.getElementById('container_origen').getElementsByTagName('img')
var casillas_destino    = document.getElementById('container_destino').getElementsByTagName('div')

var numero_de_casillas
var nombre_puzzle

var posicion_pieza_x
var posicion_pieza_y

var puntero_x
var puntero_y

var pulsado





function limpiar_puzzle()
{
	container_origen.innerHTML  = ""
	container_destino.innerHTML = ""
}






// CREACIÓN DE RETÍCULAS
function crear_reticula(numero_de_casillas)
{
	limpiar_puzzle()


	for(let i=0; i < numero_de_casillas; i++)
	{
		const capa_casilla_origen  = document.createElement('div')
		const capa_casilla_destino = document.createElement('div')

		capa_casilla_origen.id     = "origen"  + (i + 1) // Sumo 1 para que el 1er ID sea 1 en lugar de 0.
		capa_casilla_destino.id    = "destino" + (i + 1)



				estilo_casillas(capa_casilla_origen, capa_casilla_destino, numero_de_casillas)

				container_origen.appendChild(capa_casilla_origen)
				container_destino.appendChild(capa_casilla_destino)
	}
}
crear_reticula("16")





// ESTILO DE LA RETÍCULA
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





// INSERTAR PUZZLE
function insertar_puzzle( nombre_puzzle, numero_de_casillas)
{
	for(let i=0; i < numero_de_casillas; i++)
	{
		let casilla_ID    = "origen" + (i + 1)  // Para que no comience por 0
		let casilla       = document.getElementById(casilla_ID)


		casilla.innerHTML = '<img id="pieza' + (i + 1) + '" src="img/' +  nombre_puzzle + '/' + numero_de_casillas + '/' + (i + 1) + '.jpg" >'
	}

	asignar_eventos_a_piezas()
}
//***********************************************************









// BUSCAR PUZZLE ALEATORIO (adaptar el random al número de puzzles) !!!!
function buscar_puzzle_aleatorio() // Es llamada en la siguiente función
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

	nombre_puzzle = lista[indice_lista]

	insertar_puzzle( nombre_puzzle, "16")
}
buscar_puzzle_aleatorio()
//*************************************************************************






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
	nombre_puzzle          = this.dataset.name; // Identificar el puzzle de la lista
	let numero_de_casillas = container_origen.getElementsByTagName('div').length // Contar casillas

	insertar_puzzle( nombre_puzzle, numero_de_casillas )
}





// DATA DE LOS RADIO BUTTONS
function obtener_data_radio_buttons(event)
{
	let numero_de_casillas = this.dataset.piezas; // OBTIENE EL Nº DE CASILLAS ASIGNADO AL RADIO BUTTON

	crear_reticula(numero_de_casillas)
	insertar_puzzle( nombre_puzzle, numero_de_casillas )
}


//*******************************************************************************************************
//*******************************************************************************************************

function verificar()
{
	window.addEventListener('mousedown', function(){
		pulsado = true
	})
	window.addEventListener('mouseup', function(){
		pulsado = false
	})
}
	







window.addEventListener('mousemove', function(event){


	var ancho_casilla = container_destino.offsetWidth / 4

	var container_left = container_destino.getBoundingClientRect().left
	var container_top  = container_destino.getBoundingClientRect().top



	var casilla_1 = document.getElementById('destino1')
	var casilla_2 = document.getElementById('destino2')
	var casilla_3 = document.getElementById('destino3')
	var casilla_4 = document.getElementById('destino4')


	// LOCALIZADAS CINCO CASILLAS. SE PUEDE HACER.
	var casilla_1_x = container_left + 1
	var casilla_1_y = container_top  + 1

	var casilla_2_x = container_left + 1 + ancho_casilla
	var casilla_2_y = container_top  + 1

	var casilla_3_x = container_left + 1 + ancho_casilla * 2
	var casilla_3_y = container_top  + 1

	var casilla_4_x = container_left + 1 + ancho_casilla * 3
	var casilla_4_y = container_top  + 1

	var casilla_5_x = container_left + 1
	var casilla_5_y = container_top  + 1 + ancho_casilla






	if(event.clientX > casilla_1_x && 
	   event.clientX < casilla_2_x && 
	   event.clientY > casilla_1_y && 
	   event.clientY < casilla_5_y)
	{
		casilla_1.style.border = "2px solid red"

		if(verificar() == false)
		{
			casilla_1.innerHTML = '<img src="img/bermeer/16/5.jpg" >' // HE CONSEGUIDO SIMULAR UN DROP. SE PUEDE HACER.
		}
	}
	else
	{
		casilla_1.style.border = "none"
	}



})


















function asignar_eventos_a_piezas()
{
	for(let i=0; i < piezas.length; i++)
	{
		piezas_mouseover(piezas, i)
		piezas_mouseleave(piezas, i)

		piezas[i].addEventListener('mousedown', agarrar)
	}
}
asignar_eventos_a_piezas()


		
	




function agarrar(event)
{

	pieza                = event.target
	var posicion_pieza_x = pieza.getBoundingClientRect().left
	var posicion_pieza_y = pieza.getBoundingClientRect().top


		

			window.addEventListener('mousemove', mover)
			window.addEventListener('mouseup', soltar)


				function mover(event)
				{
					event.preventDefault()

					var mouse_x = event.clientX
					var mouse_y = event.clientY

									
					pieza.style.left = (mouse_x - posicion_pieza_x) - pieza.offsetWidth / 2 + 'px'
					pieza.style.top  = (mouse_y - posicion_pieza_y) - pieza.offsetHeight / 2 + 'px'

					pieza.style.zIndex = 100
				}		


				function soltar()
				{
					window.removeEventListener('mousemove', mover)

					pieza.style.left   = "0px"
					pieza.style.top    = "0px"
					pieza.style.zIndex = 0
				}			
				
}





















function piezas_mouseover(piezas, i)
{
	piezas[i].addEventListener('mouseover', function(){
		this.style.border = "2px solid red"
	})
}

function piezas_mouseleave(piezas, i)
{
	piezas[i].addEventListener('mouseleave', function(){
		this.style.border = "none"
	})
}














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