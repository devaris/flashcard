/*

XML2Object function coded by Mark Hicken (nekcih@yahoo.com)
@description return an object with the content of the XML translated to a Javascript object

NOTE: A node name with "-" or "." will be replaced with "_" for Javascript compatibility. 
EXAMPLE: <FIRST-NAME> or <FIRST.NAME> will become FIRST_NAME
Most other special characters in tag names will break this translator.

NOTE: If a node has an id or name property then it will automatically be accessible via a hash key or via an array index.
EXAMPLE: <name id="name 1">Jon</name> could be accessed using name['name 1'] or name[0]

If a node has more than 1 child with the same name, an array is created with the children contents
The object created will have this structure:
obj {
	nodeName (might be an array) : {
		attributes : an object containing the node attributes
		name : an string of the node name 
		value : an object containing the node contents
		node : the object from which this node was built
}

EXAMPLE USAGE
myXML = XML2Object(XMLRootNode);


*/

function XML2Object(oRootNode) { // pass in the root node of your xml object
	_xml = new Object();
	_xNodeArray = new Array();
	_jsXNodeArray = new Array();
	
	if(typeof(trace) == "undefined") { trace = function(s) { } } // error catch in case debug functions are missing
	
	function traverseXML(oNode, path) {
		if(typeof(path) == "undefined") { 
			path = "_xml"; 
		}

		if (oNode.hasChildNodes()) { // work child nodes
			var iNodeCount = 0;
			while (iNodeCount < oNode.childNodes.length) { // work this node
				var oCurNode = oNode.childNodes[iNodeCount];
				var sNodeName = fixName(oCurNode.nodeName);
				var sNodeName2 = oCurNode.nodeName.replace(/#/g, "");
				var iNodeNameCount = oCurNode.parentNode.getElementsByTagName(sNodeName2).length;
				
				if(iNodeNameCount > 1) { // handle multiple instances of tagName
					if(eval("typeof("+path+"."+sNodeName+")") == "undefined") { // make sure we didn't already build this tag array before continuing
						nodeArray = buildXNodeArray(oCurNode, sNodeName2, 0); // build array of elements with this tag name
						trace(path+"."+sNodeName+" (array) ("+nodeArray[2]+")");

						eval(path+"."+sNodeName+" = new Array();"); // make it an array first
						for(var i=0; i<nodeArray[2]; i++) { // attach each element of the js object to our JSXML object
							eval(path+"."+sNodeName+"["+i+"] = nodeArray[0]["+i+"];"); 
						}
						
						for(var i=0; i<nodeArray[2]; i++) { // traverse each element of the array
							traverseXML(nodeArray[1][i], path+"."+sNodeName+"["+i+"]");
						}
					}
				}
				else { // single instance of tagName
					eval(path+"."+sNodeName+" = nodeToObject(oCurNode, sNodeName);");
					trace(path+"."+sNodeName);
					traverseXML(oCurNode, path+"."+sNodeName);
				}
	
				iNodeCount++;
			}
		}
		
		// returns a JS object and an XML node for each element with the specified tagName
		function buildXNodeArray(oTopNode, sNodeName, iCurNode) {
			var iNodeNameCount = oTopNode.parentNode.getElementsByTagName(sNodeName).length;
			
			_jsXNodeArray = new Array();
			_xNodeArray = new Array();
			
			while(iCurNode < iNodeNameCount) {
				var oCurNode = oTopNode.parentNode.getElementsByTagName(sNodeName)[iCurNode]; // grab current node object
				var oJsNode = nodeToObject(oCurNode, oCurNode.nodeName);

				// try to make the node accessible by its id or name attribute using a hash key
				if(typeof(oJsNode.attributes.id) != "undefined") {
					_jsXNodeArray[oJsNode.attributes.id.toString()] = oJsNode; // make sure it's a string
				}
				else if(typeof(oJsNode.attributes.name) != "undefined") {
					_jsXNodeArray[oJsNode.attributes.name.toString()] = oJsNode; // make sure it's a string
				}
				
				_jsXNodeArray[iCurNode] = oJsNode;
				_xNodeArray[iCurNode] = oCurNode;
				
				iCurNode++;
			}
			
			return [_jsXNodeArray, _xNodeArray, iCurNode]; 
		}
		
		// returns a JSXMLNode
		function nodeToObject(node, nodeName) {
			var _oFromNode = new Object();
			_oFromNode.name = fixName(nodeName);
		
			// add the node inner value	
			if (node.hasChildNodes()) {
				_oFromNode.value = "";
				
				// add all text node values to the value property
				for(var i=0; i<node.childNodes.length; i++) { 
					if(node.childNodes[i].nodeType == 3) {
						_oFromNode.value = node.childNodes[i].nodeValue;
					}
				}
				
				_oFromNode.value = trim(_oFromNode.value);
			}

			// add attributes hash
			var hasAttributes = (node.attributes != null);
			if(hasAttributes) {
				_oFromNode.attributes = new Array();
				for(var i=0; i<node.attributes.length; i++) {
					var sAttribName = node.attributes[i].name;
					var sAttribValue = node.attributes[i].value;
					eval("_oFromNode.attributes['"+sAttribName+"'] = sAttribValue"); // make it accessible using a hash key
					eval("_oFromNode.attributes["+i+"] = sAttribValue"); // make it accessible using an index
					
					if(sAttribName.toLowerCase() == "id") { _oFromNode.id = sAttribValue; }
					if(sAttribName.toLowerCase() == "name") { _oFromNode.name = sAttribValue; }
				}
			}
		
			// add a reference to the actual xmlDom node
			_oFromNode.node = node;
		
			return _oFromNode;
		}
		
		// fixes bad tokens such as # and -
		function fixName(s) {
			return s.replace(/#/g, "").replace(/-/g, "_").replace(/\./g, "_");
		}

		function trim(s) {
			return s.replace(/^\s+/, '').replace(/\s+$/, '');
		}
	}
	
	traverseXML(oRootNode);
	return _xml; // JSXML object
}