//load xml file
function loadXML(sXml, loadHandler)
{
	var xmlDoc;
	
	// code for IE
	if (window.ActiveXObject)
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.load(sXml);
		loadHandler(xmlDoc);
	}
	// code for Mozilla, etc.
	else if (document.implementation && document.implementation.createDocument)
	{
		xmlDoc = document.implementation.createDocument("","",null);
		xmlDoc.load(sXml);
		xmlDoc.onload = function() { loadHandler(xmlDoc); }
	}
	else
	{
		alert('Your browser does not support this xml loader.');
	}
}