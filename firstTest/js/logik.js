(function ()
{
	document.getElementById("demo").innerHTML="My First JavaScript Function";
})();

function mDown(obj)
{
obj.src="bilder/green.png"; 
obj.alt="green"; 
obj.width="128";
obj.height="128";
obj.innerHTML="Release Me"
}

function mUp(obj)
{
obj.style.backgroundColor="#FFF"
obj.innerHTML="Thank You"
}

function pictureId(obj)
{

}

function pictures()
{
	picture = []
	picture.push("bilder/green.png", "bilder/weirdo", "bilder/death", "bilder/griffinFotball", "bilder/griffinHead");

	/*<img src="bilder/green.png" alt="green" width="128" height="128">

	<img src="bilder/weirdo.png" alt="weirdo" width="128" height="128">

	<img src="bilder/death.png" alt="green" width="128" height="128">

	<img src="bilder/griffinFotball.png" alt="green" width="128" height="128">

	<img src="bilder/griffinHead.png" alt="green" width="128" height="128">*/
}


