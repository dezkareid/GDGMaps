calli = function () {
	console.log("Hola");
}
var GDGMaps = (function (latitude, longitude, options, callback) {
	
  var self = this;
	var callBack = undefined;
	var map;
	var mapOptions = undefined;
	
    var api = function() {
      switch (arguments.length){
        case 1 :
          validateOneArgument(arguments);
          break;
        case 2 : 
          validateTwoArguments(arguments);
          break;
        case 3 :
          validateThreeArguments(arguments);
          break;
        case 4 :
          validateFourArguments(arguments);
          break;
        default:
          break;
      }

     

      if (typeof window.initialize == 'undefined'){
    		window.initialize = self.initialize;
    	}
    	
    	loadMap();
      
    }
    
    
    initialize =  function  () {
      if(typeof self.mapOptions === 'undefined'){
        self.mapOptions = {
          center: new google.maps.LatLng(25.6707040, -100.3081316),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
      }

  		self.map = new google.maps.Map(
        document.getElementById('map-canvas'),
  		  self.mapOptions
      );

    	if (typeof self.callBack === 'function'){
        self.callBack();
      }

    }

    function validateOneArgument () {
      switch (typeof arguments[0]){
        case 'function' : 
          self.callBack = arguments[0];
          break;
        case 'object' :
          self.mapOptions = arguments[0];
          break;
        default:
          break;
      }
    }

    function validateTwoArguments () {
      if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number'){
        mapOptions['center'] = new google.maps.LatLng(arguments[0], larguments[1]);
      } else{
        setMapConfiguration(arguments);
      }
    }

    function validateThreeArguments () {
      if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number'){
        mapOptions['center'] = new google.maps.LatLng(arguments[0], arguments[1]);
        validateOneArgument(arguments[2]);
      }else{
        if (typeof arguments[1] === 'number' && typeof arguments[2] === 'number'){
          mapOptions['center'] = new google.maps.LatLng(arguments[1], arguments[2]);
          validateOneArgument(arguments[0]);
        }
      }
    }

    function validateFourArguments () {
      if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number'){
        mapOptions['center'] = new google.maps.LatLng(arguments[0], arguments[1]);
        setMapConfiguration(arguments[2],arguments[3]);
      }else{
        if (typeof arguments[2] === 'number' && typeof arguments[3] === 'number'){
          mapOptions['center'] = new google.maps.LatLng(arguments[2], arguments[3]);
          setMapConfiguration(arguments[0],arguments[1]);
        }
      }
    }

    function setMapConfiguration () {
      if (typeof arguments[0] === 'object' && typeof arguments[1] === 'function' ){
            self.mapOptions = arguments[0];
            self.callBack = arguments[1];
      }else{
        if (typeof arguments[0] === 'function' && typeof arguments[1] === 'object' ) {
          self.callBack = arguments[0];
          self.mapOptions = arguments[1];
        }
      }  
    }

    function loadMap () {
    	var script = document.createElement('script');
  		script.type = 'text/javascript';
  		script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp';
      if (self.callBack !== 'undefined'){
        script.src += '&callback=initialize';
      }
      
  		document.body.appendChild(script);
    }
    
   

    return api;
})();

var instance = new GDGMaps();
