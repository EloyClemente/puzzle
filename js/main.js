document.addEventListener('DOMContentLoaded', function(){


var container_origen  = document.getElementById('container_origen');
var container_destino = document.getElementById('container_destino');
var dificultad;




function limpiar_puzzle()
{
	container_origen.innerHTML = "";
}





function identificar_radio_buttons()
{
	var radio_buttons = document.getElementsByClassName('radio');

	for(var i=0; i<radio_buttons.length; i++)
	{
		radio_buttons[i].addEventListener('change', obtener_data_radio_buttons);
		radio_buttons[i].addEventListener('change', obtener_dificultad);
	}
} identificar_radio_buttons();






function obtener_data_radio_buttons(event)
{
	var cantidad_casillas = this.dataset.piezas;

	crear_capas(cantidad_casillas);
}





function crear_capas(cantidad_casillas)
{
	limpiar_puzzle();


	for(var i=0; i<cantidad_casillas ; i++)
	{
		var capa_casilla = document.createElement('div');
		capa_casilla.id  = i + 1; // Sumo 1 para que el 1er ID sea 1 en lugar de 0.

		estilo_casillas(capa_casilla, cantidad_casillas);
		insertar_casillas(capa_casilla);
	}
}






function estilo_casillas(capa_casilla, cantidad_casillas)
{
	switch(cantidad_casillas)
	{
		case '9': 
		capa_casilla.classList.add('piezas-9');
		break;

		case '16':
		capa_casilla.classList.add('piezas-16');
		break;

		case '25':
		capa_casilla.classList.add('piezas-25');
		break;
	}
}





function insertar_casillas(capa_casilla)
{
	container_origen.appendChild(capa_casilla);
}


//***************************************************************




function evento_desplegable()
{
	var selector_puzzle = document.getElementsByClassName('li-lista');

	for(var i=0; i<selector_puzzle.length; i++)
	{
		selector_puzzle[i].addEventListener('click', obtener_puzzle);
	}
} evento_desplegable();





function obtener_puzzle(event)
{
	var nombre_puzzle = this.dataset.name;

	localizar_casillas(nombre_puzzle);
}





function obtener_dificultad(event) // "small", "medium", "big"
{
	dificultad = this.dataset.dificultad;
}






function localizar_casillas(nombre_puzzle)
{
	for(var i=0; i<9; i++)
	{
		var casilla_ID = i + 1; // Sumo 1 para que coincida con el ID de la casilla
		var casilla    = document.getElementById(casilla_ID);

		insertar_imagen(casilla, nombre_puzzle, i);
	}
}




function insertar_imagen(casilla, nombre_puzzle, i)
{
	casilla.innerHTML = "<img src='img/" +  nombre_puzzle + "/" + dificultad + "/" + (i+1) +".jpg'>"; // Sumo 1 para que coincida con el nombre de la imagen
}



































function outline()
{
	var allElements = document.getElementsByTagName('*');

	for(var i=0; i < allElements.length; i++)
	{
		var elem = allElements[i];

		elem.classList.toggle('outline');
	}
}
document.getElementById('outline').addEventListener('click',outline);

});