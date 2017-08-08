# LondonMap

LondonMap is a responsive web application that helps people discover places around [City, University of London](https://en.wikipedia.org/wiki/City,_University_of_London). A live version of the application can be found at [londonmap.tk](http://www.londonmap.tk)

![screenshot](https://user-images.githubusercontent.com/13169976/29096432-3beb4610-7c95-11e7-8382-fbf32ee4e546.png)

This project is part of Udacity's Full Stack Web Developer Nanodegree Program. [Knockout JavaScript framework](http://www.knockoutjs.com) is used as an implementation of the Model-View-ViewModel pattern. [Google Maps APIs](https://developers.google.com/maps/) are used to get and view information about several places on map. Additionally, [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) is used to get articles relevant to these places.

# Documentation

The information included in this documentation is as follows:

- [Tested Browsers](#tested-browsers)
- [Tested Devices](#tested-devices)
- [Quick Start](#quick-start)
- [Create your own XMap](#create-your-own-xmap)
- [What is included](#what-is-included)
- [References](#references)
- [License](#license)


## Tested Browsers

LondonMap was tested on Chrome 61.0.3163.31 beta (64-bit) and Opera 46.0.2597.57 (64-bit).

Kindly report any browser incompatibilities by sending [me](mailto:ahmadnagib@fci-cu.edu.eg) an email.

## Tested Devices

This web application was tested on Google Nexus 6p, Nexus 5, HUAWEI MediaPad M3, iPad, Samsung Galaxy S Duos 2 and Toshiba Satellite L855-B511.

Kindly report any device incompatibilities by sending [me](mailto:ahmadnagib@fci-cu.edu.eg) an email.

## Quick start

1. The [project's files](https://github.com/ahmadnagib/LondonMap) should be downloaded and extracted together in one folder.
2. It is recommended to add this folder as a website on a local host server. Internet Information Services (IIS) Manager on Windows can be used to do so for instance. This will simulate the application's behaviour in a more realistic way. 
3. The default LondonMap application can also be viewed by simply openning the `index.html` file using any web browser.
4. To check the responsiveness of the page, it is recommended to use DevTools of the Google Chrome Web Browser.

## Create your own XMap

+ The application can simply be switched to another neighbourhood by editing the places array found in the `model.js` file. The longitude and latitude of a certain place can be found with the help of the [Google Maps API Geocoder Tool](https://google-developers.appspot.com/maps/documentation/utils/geocoder/).

```
const places = [
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
```


+ Additionally, The style to be used in creating the Google Map can be changed by editing the `mapStyles` object found in the `mapview.js` file. The one already there was created on my own with the help of the great [Google Maps APIs Styling Wizard](https://mapstyle.withgoogle.com/).

```
const mapStyles = [
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
```

+ You would probably need to set a new `mapCenter` for the `map` object and that's all. By that time you will have a totally new application for a new neighbourhood of interest.

```
var mapCenter = new google.maps.LatLng(51.527751, -0.102482);
```

+ All the used icons where downloaded from the great [icons8 website](https://icons8.com). In case you want to change the used icons you will have to change the url of `defaultIcon` and the `highlightedIcon` in the `mapview.js` file.

```
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
```

+ Additionally, you will probably have to replace the `src` in the `img` tag found in the `index.html` file. This will facilitate the customization of the Navigation Menu Icon.

```
<img src="img/nav_icon.png" alt="Navigation Menu Icon downloaded from https://icons8.com/icon/45663/pointer/">
```

## What is included

Within the download you will find the following files:

```
LondonMap-master/
├── img/
    ├── default.png
    ├── highlighted.png
    ├── nav_icon.png
├── js/
    ├── lib
        ├── jquery.min.js
        ├── knockout-3.4.2.js
    ├── mapview.js
    ├── model.js
    ├── viewmodel.js
├── styles/
    ├── main.css
├── index.html
├── LICENSE
├── README.md
```

## References

+ [Google Maps API Geocoder Tool](https://google-developers.appspot.com/maps/documentation/utils/geocoder/)
+ [Street View Service](https://developers.google.com/maps/documentation/javascript/streetview)
+ [Knockout Observables](http://knockoutjs.com/documentation/observables.html)
+ [Knockout Observables](http://knockoutjs.com/documentation/observables.html)
+ [Knockout Computed Observables](http://knockoutjs.com/documentation/computedObservables.html)
+ [Knockout Observable Arrays](http://knockoutjs.com/documentation/observableArrays.html)
+ [Understanding MVVM - A Guide For JavaScript Developers](https://addyosmani.com/blog/understanding-mvvm-a-guide-for-javascript-developers/)
+ [Google Maps APIs Styling Wizard](https://mapstyle.withgoogle.com)

## License

LondonMap is Copyright © 2017 Ahmad Nagib. It is free software, and may be redistributed under the terms specified in the [LICENSE](/LICENSE) file.
