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
      // adds street view to the infowindow
      addStreetView(placeObject.marker, markerInfoWindow);

      // adds place-related wikipedia articles to the infowindow
      addWikiArticles(placeObject.marker);

      // opens the infowindow on markers location on map
      markerInfoWindow.open(map, placeObject.marker);

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
      return placeObject.inList() ? placeObject.marker.setMap(map) : placeObject.marker.setMap(null);
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
        var match = (placeTitle.search(enteredText.toLowerCase()) != -1);
        placeObject.inList(match);
      } else {
        placeObject.inList(true);
      }
    });
  }, self);

  var placesHtmlElement = $('#places-list')[0];

  // open the places list when the navigation icon is clicked in mobile view
  this.showPlacesList = function () {
    placesHtmlElement.classList.toggle('open');
  };

  // remove the places list when the navigation icon is clicked in mobile view
  this.hidePlacesList = function () {
    placesHtmlElement.classList.remove('open');
  };

  // changes marker animation to bounce if clicked
  var changeMarkerAnimation = function(marker) {
    if (marker.getAnimation() == null) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  };

  // adds street view to the infowindow
  // inspired from udacity lessons and quizzes
  var addStreetView = function(marker, markerInfoWindow) {

    // empty the infowindow to create a new one for another place marker
    toggleInfoWindow(marker, markerInfoWindow);

    // initialize the content of infowindow
    var infoWindowContent = '<div class="info-window"><h4 id="marker-title">' +
    marker.title + '</h4><div id="panorama"></div>' +
    '<ul id="wiki"><h4><a class="link" href="http://www.wikipedia.org">Wikipedia articles:</a></h4></ul></div>'

    markerInfoWindow.setContent(infoWindowContent);

    // creates a StreetViewService object
    var streetViewService = new google.maps.StreetViewService();

    // processes the results of the streetViewService
    // and handles the case if no steetview found
    var streetView = function(result, status) {
      if (status != google.maps.StreetViewStatus.OK) {
        // no streetview found
        $('#panorama').text('No StreetView found!');
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

        // create the StreetViewPanorama object with the given options
        // and add it to the infowindow
        var panorama = new google.maps.StreetViewPanorama(
          $('#panorama')[0], panoramaConfig);
      }
    };

    // get the closest StreetViewPanorama in a radius of 45 meters
    // of the markers position
    streetViewService.getPanoramaByLocation(marker.position, 45, streetView);
  };

  // adds place-related wikipedia articles to the infowindow
  // inspired from my own implementation of udacity lessons and quizzes
  var addWikiArticles = function(marker) {
    // create the webservice url to search for wikipedia articles relevant to a place title
    var url = 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=' +
        marker.title +
        '&prop=info&inprop=url';

    // set a timeout for getting a response from wikipedia api
    // and handles the case if no response is received within 10 seconds
    var wikiApiReqTimeout = setTimeout(function(){
      $('#wiki').text('');
      $('#wiki').append('<h4><a>Wikipedia articles about ' +
        marker.title.toUpperCase() +
        ' could not be loaded!</a></h4>');
    }, 10000);

    // initiate an asynchronous wikipedia API request and
    // gets response in json format
    $.ajax({
      url: url,
      data: {format: 'json'},
      dataType: 'jsonp',
      success: function (result) {
        // initialize an array to push all the retreived articles
        var wiki_articles = [];

        // for each wikipedia article returned, create an html list item
        // having the article's title and refering to the article url
        $.each( result.query.pages, function(flag, wiki_article) {
          wiki_articles.push( '<li class="wiki-article"> <a class="link" href="' +
            wiki_article.fullurl +'">'+ wiki_article.title +'</a></li>' );
        });

        // join all the list items in wiki_articles array and append them
        // in the existing wiki ul html element
        $(wiki_articles.join('<br>')).appendTo($('#wiki'));

        // make the dynamically created infowindow links clickable
        $('.link').on('click', function(){
          window.open(this.href, '_blank');
        });

        // clear the previously created timeout so as not to
        // view the wikipedia connection error message
        clearTimeout(wikiApiReqTimeout);
      }
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