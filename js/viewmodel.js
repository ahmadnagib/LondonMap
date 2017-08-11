var ViewModel = function() {
  // to avoid conflict when this is used inside functions
  var that = this;

  // initialize a locations list and locations list filtering text
  // as knockout observables
  this.placesKoList = ko.observableArray([]);
  this.filteringText = ko.observable('');

  // loops the hard coded places array and fills a new placesKoList
  // according to Place class definition
  places.forEach(function(place){
    that.placesKoList.push(new Place(place));
  });

  // loops the places ko list
  ko.utils.arrayForEach(this.placesKoList(), function(placeObject) {

    // adds click event listener for each place marker
    placeObject.marker.addListener('click', function(){

      // gets content to be added to the infowindow
      addInfoWindowContent(placeObject.marker);

      // opens the infowindow on markers location on map
      markerInfoWindow.open(map, placeObject.marker);

      // set the center of the map to be the clicked marker's position
      // inspired from udacity reviewer recommendation
      map.panTo(placeObject.marker.getPosition());

      // make sure that the infowindow is fully viewed on map after
      // getting the marker to the center of the map
      map.panBy(0, -100);

      // force the infowindow to close when the map is clicked
      map.addListener('click', function(){
        markerInfoWindow.close(markerInfoWindow);
      });

      // changes marker animation to bounce if clicked
      changeMarkerAnimation(placeObject.marker);

      // stops bounce animation after 0.5 seconds from clicking the marker
      setTimeout(function() {
        placeObject.marker.setAnimation(null);
      }, 500);
    });

    // adds mouseout event listener for each place marker
    // default icon when mouse is out of the marker
    placeObject.marker.addListener('mouseout', function() {
      placeObject.marker.setIcon(defaultIcon);
    });

    // adds mouseover event listener for each place marker
    // highlighted icon when mouse is over the marker
    placeObject.marker.addListener('mouseover', function() {
      placeObject.marker.setIcon(highlightedIcon);
    });

    // shows markers on map only for places that have
    // true value for inList ko observable
    placeObject.markersOnMap = ko.computed(function() {
      return placeObject.inList() ? placeObject.marker.setVisible(true) : placeObject.marker.setVisible(false);
    }, that);

    // trigger the same markers behaviour when the enduser interacts
    // with the places list view instead of the map view
    placeObject.select = function() {
      google.maps.event.trigger(this.marker, 'click');
    };

    placeObject.highlightMarker = function() {
      google.maps.event.trigger(this.marker, 'mouseover');
    };

    placeObject.defaultMarker = function() {
      google.maps.event.trigger(this.marker, 'mouseout');
    };

    // extends the created map's bounds to include the created marker
    bounds.extend(placeObject.marker.position);
  });

  // toggles inList observable of each place in the placesKoList
  // according to the typed filtering text
  this.filterPlacesList = ko.computed( function() {
    ko.utils.arrayFilter(that.placesKoList(), function(placeObject) {
      var enteredText = that.filteringText();
      if (enteredText != null) {
        var placeTitle = placeObject.title.toLowerCase();
        var match = (placeTitle.indexOf(enteredText.toLowerCase()) != -1);
        placeObject.inList(match);
      } else {
        placeObject.inList(true);
      }
    });
  }, that);

  // places list will be not visible by default in mobile view
  this.visiblePlacesList = ko.observable(false);

  // open the places list when the navigation icon is clicked in mobile view
  this.showPlacesList = function () {
    that.visiblePlacesList(!that.visiblePlacesList());
  };

  // remove the places list when the navigation icon is clicked in mobile view
  this.hidePlacesList = function () {
    that.visiblePlacesList(false);
  };

  // changes marker animation to bounce if clicked
  var changeMarkerAnimation = function(marker) {
    if (marker.getAnimation() == null) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  };

  // adds street view to the infowindow
  // inspired from udacity lessons and quizzes
  var addStreetView = function(marker, markerInfoWindow, wikiContent) {

    // empty the infowindow to create a new one for another place marker
    toggleInfoWindow(marker, markerInfoWindow);

    // initialize the content of infowindow
    var streetViewContent = '<div class="info-window"><h4 id="marker-title">' + marker.title + '</h4><div id="panorama">';

    // creates a StreetViewService object
    var streetViewService = new google.maps.StreetViewService();

    // processes the results of the streetViewService
    // and handles the case if no steetview found
    var streetView = function(result, status) {
      if (status != google.maps.StreetViewStatus.OK) {
        // no streetview found
        streetViewContent += 'No StreetView found!</div>';
        markerInfoWindow.setContent(streetViewContent + wikiContent);
      } else {
        // success: a streetview was found near the marker's location
        var foundLocation = result.location.latLng;

        // calculate the heading for the point of view
        var povHeading = google.maps.geometry.spherical.computeHeading(
          foundLocation, marker.position);

        // configuring StreetViewPanorama
        var panoramaConfig = {
          pov: {
            heading: povHeading,
            pitch: 10
          },
          position: foundLocation
        };

        streetViewContent += '</div>';
        markerInfoWindow.setContent(streetViewContent + wikiContent);
        // create the StreetViewPanorama object with the given options
        // and add it to the infowindow
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById('panorama'), panoramaConfig);
      }
    };

    // get the closest StreetViewPanorama in a radius of 45 meters
    // of the markers position
    streetViewService.getPanoramaByLocation(marker.position, 45, streetView);
  };

  // adds place-related wikipedia articles to the infowindow
  // inspired from my own implementation of udacity lessons and quizzes
  var addInfoWindowContent = function(marker) {
    // empty the infowindow
    markerInfoWindow.setContent('');

    // create the webservice url to search for wikipedia articles relevant to a place title
    // Wikipedia API was used to fulfill this functionality
    var url = 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=' +
        marker.title +
        '&prop=info&inprop=url';

    // string to carry infowindow content
    var wikiContent = '<ul id="wiki"><h4>Wikipedia articles:<a class="link" href="https://www.mediawiki.org/wiki/API:Main_page">Powered by Wikipedia API</a></h4>';

    // initiate an asynchronous wikipedia API request
    // and gets response in json format (updated upon udacity reviewer suggestion)
    $.ajax({
        // AJAX settings
        url: url,
        data: {format: 'json'},
        dataType: 'jsonp'
    }).done(function (result) {
        // success
        // for each wikipedia article returned, create an html list item
        // having the article's title and refering to the article url
        $.each(result.query.pages, function(flag, wiki_article) {
          wikiContent += '<li class="wiki-article"> <a class="link" href="' +
            wiki_article.fullurl +'" target="_blank">'+ wiki_article.title +'</a></li><br>';
        });

        wikiContent += '</ul></div>';

        // adds street view to the infowindow
        addStreetView(marker, markerInfoWindow, wikiContent);
    }).fail(function (jqXHR, textStatus) {
        // handles error
        wikiContent += '<h4><a>Wikipedia articles about ' + marker.title.toUpperCase() +
          ' could not be loaded!</a></h4></ul></div>';
        addStreetView(marker, markerInfoWindow, wikiContent);
    });
  };

  // empty the infowindow to create a new one for another place marker
  var toggleInfoWindow = function(marker, markerInfoWindow) {
    if (markerInfoWindow.marker != marker) {
      markerInfoWindow.marker = marker;
      markerInfoWindow.setContent('');
    }
  };
};

// handles the potential Google Maps API connection error
var handleMapError = function() {
  $('#map-message').text('There was a problem connecting to Google Maps!');
};
