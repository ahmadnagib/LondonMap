var map;

/*
The style to be used in creating a new Google Map
Created on my own with the help of the great Google Map
APIs styling wizard https://mapstyle.withgoogle.com/
*/
var mapStyles = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#c0c0c0'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#808080'
      },
      {
        weight: 3.5
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry',
    stylers: [
      {
        color: '#919191'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#34cb65'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#408080'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#808080'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#c0c0c0'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#707070'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dd6098'
      }
    ]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#d12c72'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0a91f3'
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fdab00'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#1fbe63'
      }
    ]
  },
  {
    featureType: 'transit.station.airport',
    elementType: 'geometry',
    stylers: [
      {
        color: '#bb2248'
      }
    ]
  },
  {
    featureType: 'transit.station.bus',
    elementType: 'geometry',
    stylers: [
      {
        color: '#319aac'
      }
    ]
  },
  {
    featureType: 'transit.station.rail',
    elementType: 'geometry',
    stylers: [
      {
        color: '#11c2cc'
      },
      {
        weight: 8
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0a92d3'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text',
    stylers: [
      {
        color: '#060cd7'
      }
    ]
  }
];

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

  // activates the knockout bindings
  // and defines the view model object to be used
  ko.applyBindings(new ViewModel());
};
