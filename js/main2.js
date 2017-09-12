document.addEventListener('DOMContentLoaded', function(){


const container_origen  = document.getElementById('container_origen')
const container_destino = document.getElementById('container_destino')

var numero_de_casillas
var puzzle_actual








function limpiar_puzzle()
{
	container_origen.innerHTML = ""
}






// CREACIÓN DE RETÍCULA
function crear_reticula(numero_de_casillas)
{
	limpiar_puzzle()


	for(let i=0; i < numero_de_casillas; i++)
	{
		const capa_casilla = document.createElement('div')
		capa_casilla.id    = i + 1 // Sumo 1 para que el 1er ID sea 1 en lugar de 0.


				estilo_casillas(capa_casilla, numero_de_casillas)
				container_origen.appendChild(capa_casilla) // Insertar casillas
	}
}
crear_reticula("16")





// ESTILO DE LA RETÍCULA
function estilo_casillas(capa_casilla, numero_de_casillas)
{
	switch(numero_de_casillas)
	{
		case '9': 
		capa_casilla.classList.add('casillas-9')
		break

		case '16':
		capa_casilla.classList.add('casillas-16')
		break

		case '25':
		capa_casilla.classList.add('casillas-25')
		break
	}
}
//***********************************************************





// INSERTAR PUZZLE
function insertar_puzzle( numero_de_casillas, puzzle, dificultad )
{
	for(let i=0; i < numero_de_casillas; i++)
	{
		let casilla_ID    = i + 1  // Para que no comience por 0
		let casilla       = document.getElementById(casilla_ID)


		casilla.innerHTML = "<img src='img/" +  puzzle + "/" + dificultad + "/" + (i+1) + ".jpg'>"
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

	insertar_puzzle( "16", lista[indice_lista], "medium")
}
buscar_puzzle_aleatorio()
//*************************************************************************







// ASIGNAR EVENTO A LOS RADIO BUTTONS
function identificar_radio_buttons()
{
	let radio_buttons = document.getElementsByClassName('radio');

	for(let i=0; i < radio_buttons.length; i++)
	{
		radio_buttons[i].addEventListener('change', obtener_data_radio_buttons);
		radio_buttons[i].addEventListener('change', obtener_dificultad); // Para localizar la carpeta
	}
} identificar_radio_buttons();




// Obtiene las casillas del radio button
function obtener_data_radio_buttons(event)
{
	cantidad_casillas = this.dataset.piezas;
}



// Para la ruta de la imagen
function obtener_dificultad(event) // "small", "medium", "big"
{
	dificultad = this.dataset.dificultad;
}









// ASIGNAR EVENTO A LA LISTA DE PUZZLES
function evento_desplegable()
{
	let selector_puzzle = document.getElementsByClassName('li-lista')

	for(let i=0; i < selector_puzzle.length; i++)
	{
		selector_puzzle[i].addEventListener('click', enviar_puzzle)
	}
} evento_desplegable()





// ENVIAR PUZZLE
function enviar_puzzle(event)
{
	var nombre_puzzle      = this.dataset.name; // Identificar el puzzle
	var numero_de_casillas = container_origen.getElementsByClassName('casillas-16').length // Contar casillas

	insertar_puzzle( numero_de_casillas, nombre_puzzle, "medium" )
}

































// Quizá no haga falta
// function archivar_puzzle_actual(carpeta_puzzle)
// {
// 	puzzle_actual = carpeta_puzzle
// }










// ASIGNAR EVENTOS A LOS RADIO BUTTONS
function identificar_radio_buttons()
{
	const radio_buttons = document.getElementsByClassName('radio')

	for(let i=0; i < 3; i++)
	{
		radio_buttons[i].addEventListener('change', obtener_data_radio_buttons)
		// radio_buttons[i].addEventListener('change', obtener_dificultad) // Para localizar la carpeta

		// LLAMAR AQUÍ A LA FUNCIÓN QUE RESTAURA EL PUZZLE SELECCIONADO !!!!!!!!!!!!!!!!
	}
} identificar_radio_buttons()






// OBTIENE EL Nº DE CASILLAS ASIGNADO AL RADIO BUTTON
function obtener_data_radio_buttons(event)
{
	numero_de_casillas = this.dataset.piezas

	crear_reticula(numero_de_casillas)
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