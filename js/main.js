document.addEventListener('DOMContentLoaded', function(){














































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