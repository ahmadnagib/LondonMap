var map;

var mapView = function () {
  /*
  Creates a new Google Map using the styling above
  The map type control is disabled
  */

  var mapElement = $('#map')[0];

  var mapCenter = new google.maps.LatLng(51.527751, -0.102482);

  map = new google.maps.Map(mapElement, {
    styles: mapStyles,
    center: mapCenter,
    zoom: 10,
    mapTypeControl: false
  });

  // defines an infowindow with maximum width of 260
  // to be populated later when a marker icon is clicked
  markerInfoWindow = new google.maps.InfoWindow({
    maxWidth: 260,
  });

  // Default map marker icon
  // icon art from https://icons8.com/icon/12383/mind-map
  defaultIcon = {
    url: 'img/default.png'
  };

  // Highlighted marker icon when mouse is over the marker
  // icon art from https://icons8.com/icon/45604/map-pokemon
  highlightedIcon = {
    url: 'img/highlighted.png'
  };

  // Sets the viewport to include given bounds
  bounds = new google.maps.LatLngBounds();
  map.fitBounds(bounds);

  // assures that the map markers fit the browser window in case it is resized
  // inspired from udacity reviwer
  google.maps.event.addDomListener(window, 'resize', function() {
    map.fitBounds(bounds);
  });

  // activates the knockout bindings
  // and defines the view model object to be used
  ko.applyBindings(new ViewModel());
};
