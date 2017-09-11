document.addEventListener('DOMContentLoaded', function(){


var puzzle_1 = document.getElementById('puzzle_1');





function identificar_radio()
{
	var radio = document.getElementsByClassName('radio');

	for(var i=0; i<radio.length; i++)
	{
		radio[i].addEventListener('change', obtener_data);
	}
} identificar_radio();






function obtener_data(event)
{
	var numero = this;
	var piezas = numero.dataset.piezas;

	crear_capas(piezas);
}





function limpiar_puzzle()
{
	puzzle_1.innerHTML = "";
}





function crear_capas(piezas)
{
	limpiar_puzzle();


	for(var i=0; i<piezas ; i++)
	{
		var capa = document.createElement('div');
		capa.id = i + 1; // Sumo 1 para que el 1er ID sea 1 en lugar de 0.

		estilo_capas(capa, piezas);
		insertar_capas(capa);
	}
}






function estilo_capas(capa, piezas)
{
	switch(piezas)
	{
		case '9': 
		capa.classList.add('piezas-9');
		break;

		case '16':
		capa.classList.add('piezas-16');
		break;

		case '25':
		capa.classList.add('piezas-25');
		break;
	}
}






function insertar_capas(capa)
{
	puzzle_1.appendChild(capa);
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