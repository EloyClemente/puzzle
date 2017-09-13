document.addEventListener('DOMContentLoaded', function(){


const container_origen  = document.getElementById('container_origen')
const container_destino = document.getElementById('container_destino')

var numero_de_casillas
var nombre_puzzle








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


		casilla.innerHTML = '<img id="pieza' + (i + 1) + '" src="img/' +  nombre_puzzle + '/' + numero_de_casillas + '/' + (i + 1) + '.jpg">'
	}
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



var pieza_1
var casilla_destino

function comenzar()
{

	pieza_1 = document.getElementById('pieza1')

	pieza1.addEventListener('dragstart', comenzamos_arrastrar)

	pieza1.addEventListener('touchstart', function(){
		pieza1.style.border = "1px solid red"
	})

	pieza1.addEventListener('touchmove', function(event){

		event.preventDefault()

		console.log(event)

		pieza1.style.border = '2px solid yellow'

		pieza1.style.left  = event.pageX-25 + 'px'
		pieza1.style.right = event.pageY-25 + 'px'
	})








	casilla_destino = document.getElementById('destino1')

	casilla_destino.addEventListener('dragenter', function(event){
		event.preventDefault()
	})
	casilla_destino.addEventListener('dragover', function(event){
		event.preventDefault()
	})
	casilla_destino.addEventListener('drop', soltado)
}
comenzar()





function comenzamos_arrastrar(event)
{
	var imagen = '<img id="pieza1" src="' + pieza_1.getAttribute('src') + '">'

	event.dataTransfer.setData('Text', imagen)
}


function soltado(event)
{
	event.preventDefault()

	casilla_destino.innerHTML = event.dataTransfer.getData('Text')

	

	
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