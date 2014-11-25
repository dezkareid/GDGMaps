calli = function () {
	console.log("Hola");
}
var DMaps = (function (name, latitude, longitude, options, callback) {
  var self = this;
	var callback;
  var container;
  var latitude;
  var longitude;
	var map;
	var mapOptions;
	
    var api = function() {
      
      for (var i in arguments) {
        switch (typeof arguments[i]){
          case 'string' :
            self.container = arguments[i];
            break;
          case 'number' : 
            if (typeof self.latitude === 'undefined'){
              self.latitude = arguments[i];
            } else { 
              self.longitude = arguments[i];
            }
            break;
          case 'object' :
            self.mapOptions = arguments[i];
          case 'function':
            self.callBack = arguments[i];
          default:
            break;
        }
      }

      if (typeof self.latitude === 'undefined'){
        self.latitude = 25.670708;
        self.longitude = -100.308172;
      }

       if (typeof self.container === 'undefined'){
        container = 'map-canvas';
      }

      if (typeof window.initialize === 'undefined'){
    		window.initialize = self.initialize;
    	}
    	
    	loadMap();
      
    }
    
    
    initialize =  function  () {
      if(typeof self.mapOptions === 'undefined'){
        self.mapOptions = {
          center: new google.maps.LatLng(self.latitude, self.longitude),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
      }else{
        configureMap(self.mapOptions);
      }

  		self.map = new google.maps.Map(
        document.getElementById(container),
  		  self.mapOptions
      );

    	if (typeof self.callBack === 'function'){
        self.callBack();
      }

    }


    function configureMap (options) {

      
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

var instance = new DMaps(20.821805, -101.147430,calli);
