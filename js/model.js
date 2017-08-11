// The initial places that will be presented on map and list view by default
// lat and lng were got by the help of Google Maps API Geocoder Tool
var places = [
  {
    title: 'City, University of London',
    location: {
      lat: 51.52804,
      lng: -0.101594
    }
  },
  {
    title: 'King Square Gardens',
    location: {
      lat: 51.527616,
      lng: -0.098568
    }
  },
  {
    title: 'Islington Museum',
    location: {
      lat: 51.526379,
      lng: -0.104535
    }
  },
  {
    title: 'London Dance Academy',
    location: {
      lat: 51.525584,
      lng: -0.096533
    }
  },
  {
    title: 'CitySport',
    location: {
      lat: 51.524692,
      lng: -0.099203
    }
  },
  {
    title: 'St James C of E Church',
    location: {
      lat: 51.523484,
      lng: -0.105738
    }
  },
  {
    title: 'St Peter\'s Italian Church',
    location: {
      lat: 51.522312,
      lng: -0.109181
    }
  },
  {
    title: 'St Marks Church',
    location: {
      lat: 51.530044,
      lng: -0.108956
    }
  },
  {
    title: 'Myddelton Square Gardens',
    location: {
      lat: 51.530236,
      lng: -0.108133
    }
  },
  {
    title: 'Museum of London',
    location: {
      lat: 51.517618,
      lng: -0.096778
    }
  }
];

// the place object to be created for each place in the list
var Place = function (place) {
  this.title = place.title;

  this.location = place.location;

  // the flag that would be used to filter the places list
  // all the places are inList by default
  this.inList = ko.observable(true);

  // the marker object created for each place in the list
  this.marker = new google.maps.Marker({
    map: map,
    position: this.location,
    title: this.title,
    icon: defaultIcon,
    animation: google.maps.Animation.DROP
  });
};
